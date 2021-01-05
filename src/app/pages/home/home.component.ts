import { Component, OnInit } from "@angular/core";
import * as _ from "lodash";

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
@ReduxConnect((state: any) => ({
  products: state.home.data,
  cartItems: _.map(
    _.get(state.user, ["cart", "items"], []),
    (item: any) => item.id
  ),
  // favItems: _.map(
  //   _.get(state.user, ["favItems", "items"], []),
  //   (item: any) => item.id
  // ),
}))
export class HomeComponent implements OnInit, IReduxConnect {
  appStore: any;
  dispatch: any;
  unsubscribe: any;

  products: IProductFetch[] = [];
  cartItems: any[] = [];
  // favItems: any[] = [];

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

  isInCart(product: IProductFetch): boolean {
    return _.includes(this.cartItems, product.id);
  }

  isFavorite(product: IProductFetch): boolean {
    // TODO: It should look for fav items
    // return _.includes(this.favItems, product.id);
    return _.includes(this.cartItems, product.id);
  }
}
