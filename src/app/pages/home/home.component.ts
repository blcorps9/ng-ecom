import { Component, OnInit } from "@angular/core";

import {
  ReduxConnect,
  IReduxConnect,
} from "../../decorators/redux-connect/redux-connect.decorator";
import { RequestClientService } from "../../services/request-client/request-client.service";
import * as actions from "./home.actions";

import type { IProductFetch } from "../../types";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
@ReduxConnect((state: any) => ({ products: state.home.data }))
export class HomeComponent implements OnInit, IReduxConnect {
  appStore: any;
  dispatch: any;
  unsubscribe: any;

  products: IProductFetch[] = [];

  constructor(private httpClient: RequestClientService) {}

  ngOnInit(): void {
    this.dispatch(actions.getProductRequest());

    this.httpClient.get("/bns/search").subscribe(
      (resp) => {
        this.dispatch(actions.getProductSuccess(resp.body.data));
      },
      (error) => {
        this.dispatch(actions.getProductFailure(error));
      }
    );
  }
}
