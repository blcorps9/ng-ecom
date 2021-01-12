import { Component, Inject, OnInit } from "@angular/core";
import * as _ from "lodash";

import { RequestClientService } from "../../services/request-client/request-client.service";
import { ReduxConnect } from "../../decorators/redux-connect/redux-connect.decorator";
import * as actions from "../../store/actions/user.actions";

import type { ICartItem } from "../../types";

// @Component({
//   selector: "app-my-cart",
//   templateUrl: "./my-cart.component.html",
//   styleUrls: ["./my-cart.component.scss"],
// })
// export class MyCartComponent implements OnInit {
//   products: IProductFetch[] = [];

//   constructor(@Inject("AppStore") private appStore: any) {}

//   ngOnInit(): void {
//     this.products = this.appStore.getState().user.cart.items;

//     console.log(
//       "this.products =-----> ",
//       this.appStore.getState().user.cart.items
//     );
//   }
// }

@Component({
  selector: "app-my-cart",
  templateUrl: "./my-cart.component.html",
  styleUrls: ["./my-cart.component.scss"],
})
@ReduxConnect((state) => {
  const products = state.user?.cart?.items;
  const orderTotal = _.reduce(products, (p, c) => p + c.price * c.quantity, 0);
  const orderTotalSale = _.reduce(
    products,
    (p, c) => {
      if (c.salePrice) {
        return p + c.salePrice * c.quantity;
      }

      return p + c.price * c.quantity;
    },
    0
  );

  return {
    products,
    orderTotal,
    orderTotalSale,
    isCartEmpty: products.length === 0,
  };
}) // Advance typescript
// @ReduxConnect((state) => ({
//   products: _.get(state, ["user", "cart", "items"]),
// })) // es5 + lodash
export class MyCartComponent {
  dispatch: any;

  products: ICartItem[] = [];
  orderTotal = 0.0;
  orderTotalSale = 0.0;
  isCartEmpty = true;

  constructor(private http: RequestClientService) {}

  ngOnInit() {
    this.getDashboard();
  }

  getDashboard() {
    this.dispatch(actions.getDashboardRequest());
    this.http.get("/users/dashboard").subscribe(
      (resp) => {
        this.dispatch(actions.getDashboardSuccess(resp.body.data));
      },
      (error) => {
        this.dispatch(actions.getDashboardFailure(error));
      }
    );
  }

  onRemove(product: ICartItem) {
    // TODO:
    // 1. Make a API call to the BE for removing the item from`cart`
    // 2. Your  orderTotal` should be wrong, so correct it

    if (product) {
      this.dispatch(actions.removeFromCartRquest());
      this.http.del(`/users/shopping-cart/${product.id}`).subscribe(
        (resp: any) => {
          this.dispatch(actions.removeFromCartSuccess(resp.body.data));
          this.getDashboard();
        },
        (error: any) => {
          this.dispatch(actions.removeFromCartFailure(error));
        }
      );
    }

    console.log("onRemove =-----> ", product);
  }
}
