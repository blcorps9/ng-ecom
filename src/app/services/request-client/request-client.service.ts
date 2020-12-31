import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { environment } from "../../../environments/environment";
import { MakeParamsService } from "../make-params/make-params.service";
import { MakeHeadersService } from "../make-headers/make-headers.service";

import type { IHttpVerbs, IHttpOpts } from "../../types";

@Injectable({
  providedIn: "root",
})
export class RequestClientService {
  baseUrl = environment.baseUrl;

  constructor(
    private client: HttpClient,
    private makeHeader: MakeHeadersService,
    private makeParams: MakeParamsService
  ) {}

  makeRequest(method: IHttpVerbs, url: string, opts: any): Observable<any> {
    const headers = this.makeHeader.make(opts.headers);

    const options: any = {
      observe: "response",
      responseType: "json",
      headers,
    };

    if (opts.params) {
      options.params = this.makeParams.make(opts.params);
    }

    if (opts.data) {
      options.body = opts.data;
    }

    return this.client.request(method, this.baseUrl + url, options);
  }

  post(url: string, opts: IHttpOpts): Observable<any> {
    return this.makeRequest("post", url, opts);
  }

  get(url: string, opts: IHttpOpts = {}): Observable<any> {
    return this.makeRequest("get", url, opts);
  }

  put(url: string, opts: IHttpOpts = {}): Observable<any> {
    return this.makeRequest("put", url, opts);
  }

  del(url: string, opts: IHttpOpts = {}): Observable<any> {
    return this.makeRequest("delete", url, opts);
  }
}
