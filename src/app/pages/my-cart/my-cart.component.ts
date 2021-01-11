import { Component, Inject, OnInit } from "@angular/core";
import * as _ from "lodash";

import { ReduxConnect } from "../../decorators/redux-connect/redux-connect.decorator";
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
@ReduxConnect((state) => ({ products: state.user?.cart?.items })) // Advance typescript
// @ReduxConnect((state) => ({
//   products: _.get(state, ["user", "cart", "items"]),
// })) // es5 + lodash
export class MyCartComponent {
  products: ICartItem[] = [];
  orderTotal = 0.0;

  constructor() {}

  ngOnInit() {
    this.orderTotal = _.reduce(
      this.products,
      (p, c) => p + c.price * c.quantity,
      0
    );
  }

  onRemove(event: any) {
    // TODO:
    // 1. Make a API call to the BE for removing the item from`cart`
    // 2. Your  orderTotal` should be wrong, so correct it

    console.log("onRemove =-----> ", event);
  }
}
