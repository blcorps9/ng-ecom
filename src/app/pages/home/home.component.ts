import { Component, OnInit, Inject, OnDestroy } from "@angular/core";

import { RequestClientService } from "../../services/request-client/request-client.service";
import * as actions from "./home.actions";

import type { IAppStore, IProductFetch } from "../../types";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit, OnDestroy {
  unsubscribe: any;
  products: IProductFetch[] = [];

  constructor(
    private httpClient: RequestClientService,
    @Inject("AppStore") private appStore: IAppStore
  ) {
    this.unsubscribe = this.appStore.subscribe(() => {
      const { home } = this.appStore.getState();

      this.products = home.data;
    });
  }
  ngOnDestroy(): void {
    this.unsubscribe();
  }

  ngOnInit(): void {
    this.appStore.dispatch(actions.getProductRequest());
    this.httpClient.get("/bns/search").subscribe(
      (resp) => {
        this.appStore.dispatch(actions.getProductSuccess(resp.body.data));
      },
      (error) => {
        this.appStore.dispatch(actions.getProductFailure(error));
      }
    );
  }
}

// 1. get data -- /api/bns/search
// 1.1. Actions + Reducer - Done
// 1.2. Make API call - HTTPclientService
// 1.3. Display response
// 1.4 Store data into redux-store
// 1.5 validate all
// 2. show data - gen comp
// 2.1 ng g c pc
// 2.2 Input/Output
// 2.n
