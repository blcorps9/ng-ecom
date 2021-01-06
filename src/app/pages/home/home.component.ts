import { Component, OnInit } from "@angular/core";
import * as _ from "lodash";

import {
  ReduxConnect,
  IReduxConnect,
} from "../../decorators/redux-connect/redux-connect.decorator";
import { RequestClientService } from "../../services/request-client/request-client.service";
import * as actions from "./home.actions";

import type { IProductFetch, ILeftNav } from "../../types";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
@ReduxConnect((state: any) => ({
  leftNav: state.home.leftNav,
  products: state.home.products,
  cartItems: _.map(
    _.get(state.user, ["cart", "items"], []),
    (item: any) => item.id
  ),
  favItems: _.map(
    _.get(state.user, ["favList", "items"], []),
    (item: any) => item.id
  ),
}))
export class HomeComponent implements OnInit, IReduxConnect {
  appStore: any;
  dispatch: any;
  unsubscribe: any;

  products: IProductFetch[] = [];
  localProducts: IProductFetch[] = [];
  cartItems: any[] = [];
  favItems: any[] = [];
  leftNav: ILeftNav[] = [];

  orderBy: string = "A-Z";
  filters: { [key: string]: string[] } = {};

  constructor(private httpClient: RequestClientService) {}

  ngOnInit(): void {
    this.dispatch(actions.getProductRequest());
    this.httpClient.get("/bns/search").subscribe(
      (resp) => {
        const products = resp.body.data;

        const categories = _.uniq(_.map(products, "category"));
        const sizes = _.uniq(_.compact(_.flatMap(products, (i) => i.sizes)))
          .map(Number)
          .sort((a, b) => a - b)
          .map(String);
        const colors = _.uniq(
          _.compact(_.flatMap(products, (i) => i.colors))
        ).sort();

        const leftNav: ILeftNav[] = [
          { header: "Categories", body: categories },
        ];

        if (sizes.length) {
          leftNav.push({ header: "Sizes", body: sizes });
        }

        if (colors.length) {
          leftNav.push({ header: "Colors", body: colors });
        }

        leftNav.push({
          header: "Sort By",
          radioBtn: true,
          body: ["A-Z", "Z-A", "Price Low-High", "Price High-Low"],
        });

        this.dispatch(actions.setLeftNav(leftNav));
        this.dispatch(actions.getProductSuccess(products));
      },
      (error) => {
        this.dispatch(actions.getProductFailure(error));
      }
    );
  }

  getProducts() {
    return this.localProducts.length > 0 ? this.localProducts : this.products;
  }

  getSortedProducts = (products: IProductFetch[]) => {
    switch (this.orderBy) {
      case "A-Z":
        return _.orderBy(products, "name", "asc");
      case "Z-A":
        return _.orderBy(products, "name", "desc");
      case "Price Low-High":
        return _.orderBy(products, "price", "asc");
      case "Price High-Low":
        return _.orderBy(products, "price", "desc");
      default:
        return products;
    }
  };

  getFilteredProducts = (products: IProductFetch[]) => {
    const filterKeys = Object.keys(this.filters);

    const filteredProducts = products.filter((p) => {
      for (const f of filterKeys) {
        const stateFilter = _.get(this.filters, [f], []);
        const prodFilter =
          f === "Categories"
            ? [_.get(p, ["category"], "")]
            : _.get(p, [f.toLowerCase()], []);
        const common = _.intersection(stateFilter, prodFilter);

        if (common.length !== stateFilter.length) {
          return false;
        }
      }

      return true;
    });

    return filteredProducts;
  };

  isInCart(product: IProductFetch): boolean {
    return _.includes(this.cartItems, product.id);
  }

  isFavorite(product: IProductFetch): boolean {
    return _.includes(this.favItems, product.id);
  }

  onSelection(event: any) {
    if (event.label === "Sort By") {
      // || event.isRadio
      this.orderBy = event.cell;
      this.localProducts = this.getSortedProducts(this.products);
    } else {
      const { cell, label } = event;

      if (this.filters[label] && _.includes(this.filters[label], cell)) {
        this.filters = {
          ...this.filters,
          [label]: this.filters[label].filter((l) => l !== cell),
        };
      } else {
        this.filters = {
          ...this.filters,
          [label]: this.filters[label]
            ? [...this.filters[label], cell]
            : [cell],
        };
      }

      this.localProducts = this.getFilteredProducts(this.products);
    }
  }
}
