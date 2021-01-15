import { Component, OnInit } from "@angular/core";
import { ReduxConnect } from "src/app/decorators/redux-connect/redux-connect.decorator";

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.scss"],
})
@ReduxConnect((state) => ({
  cart: state.user.cart,
  profile: state.user.profile,
}))
export class CheckoutComponent implements OnInit {
  cart: any;
  profile: any;

  billingAddress: any;

  currentStep: number = 0;
  constructor() {}

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

    console.log("this.profile =-----> ", this.profile);
    console.log("this.billingAddress =-----> ", this.billingAddress);
  }
}
