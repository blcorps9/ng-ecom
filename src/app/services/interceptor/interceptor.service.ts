import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

import { hideLoader, showLoader } from "../../store/actions/common.actions";
import type { IAppStore } from "../../types";

@Injectable({
  providedIn: "root",
})
export class InterceptorService implements HttpInterceptor {
  private inflightRequests: HttpRequest<any>[] = [];

  private isInFlight = new BehaviorSubject(false);

  private isInFlightCached = false;

  constructor(@Inject("AppStore") private appStore: IAppStore) {
    this.isInFlight.subscribe((value) => {
      if (this.isInFlightCached !== value) {
        this.isInFlightCached = value;

        this.appStore.dispatch(value ? showLoader() : hideLoader());
      }
    });
  }

  checkInflightReq(req: HttpRequest<any>) {
    const reqIndex = this.inflightRequests.indexOf(req);

    if (reqIndex !== -1) this.inflightRequests.splice(reqIndex, 1);

    this.isInFlight.next(this.inflightRequests.length > 0);
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.isInFlight.next(true);
    this.inflightRequests.push(req);

    return Observable.create((observer: any) => {
      next.handle(req).subscribe(
        (event) => {
          if (event instanceof HttpResponse) {
            observer.next(event);
            this.checkInflightReq(req);
          }
        },
        (err) => {
          observer.error(err);
          this.checkInflightReq(req);
        },
        () => {
          observer.complete();
          this.checkInflightReq(req);
        }
      );
    });
  }
}
