import * as _ from "lodash";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";

import * as actions from "../../store/actions/user.actions";
import { ReduxConnect } from "src/app/decorators/redux-connect/redux-connect.decorator";
import { RequestClientService } from "src/app/services/request-client/request-client.service";

import type { ICheckoutStep } from "./checkout.types";

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.scss"],
})
@ReduxConnect((state) => {
  const cartTotal = _.reduce(
    state.user.cart?.items,
    (p, c) => {
      if (c.salePrice) {
        return p + c.salePrice * c.quantity;
      }

      return p + c.price * c.quantity;
    },
    0
  );

  return {
    cartTotal,
    cart: state.user.cart,
    profile: state.user.profile,
  };
})
export class CheckoutComponent implements OnInit {
  dispatch: any;

  cart: any;
  profile: any;

  cartTotal = 0.0;
  billingAddress: any;

  currentStep: number = 0;
  checkoutSteps: ICheckoutStep[] = [
    { id: 1, label: "Cart" },
    { id: 2, label: "Delivery" },
    { id: 3, label: "Payment" },
  ];
  constructor(private http: RequestClientService, private router: Router) {}

  ngOnInit(): void {}

  onClickNext() {
    this.currentStep = 1;
  }

  disbaleDeliveryStepCTA() {
    return this.currentStep === 1;
  }

  onSaveBillingAddress(formData: any) {
    const {
      email,
      lastName,
      firstName,
      postalCode,
      phoneNumber,
      ...rest
    } = formData;
    const { profile } = this;

    this.billingAddress = {
      address: {
        ...rest,
        country: "in",
        postal_code: postalCode,
      },
      phone: phoneNumber,
      email: profile.email,
      name: `${firstName} ${lastName}`,
    };

    this.currentStep = 2;
    // TODO: Store this address in BAckend and use the new address id in `onPaymentSuccess` payload
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

  onPaymentSuccess(payment: any) {
    this.dispatch(actions.placeOrderRequest());
    this.http
      .post("/orders", {
        data: { address: "<address-id>", cart: this.cart.id, card: payment.id },
      })
      .subscribe(
        (resp) => {
          this.dispatch(actions.placeOrderSuccess(resp.body.data));
          this.getDashboard();
          this.router.navigateByUrl("/confirmation");
        },
        (error) => {
          this.dispatch(actions.placeOrderFailure(error));
        }
      );
  }

  onPaymentFailure(event: any) {
    // Keep me
  }

  onSelectStep(step: any) {
    this.currentStep = step;
  }
}
