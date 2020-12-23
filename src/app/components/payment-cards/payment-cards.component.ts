import { Component } from "@angular/core";

import { PAYMENT_CARDS } from "../../../constants";

@Component({
  selector: "app-payment-cards",
  templateUrl: "./payment-cards.component.html",
  styleUrls: ["./payment-cards.component.scss"],
})
export class PaymentCardsComponent {
  cards = PAYMENT_CARDS;

  constructor() {}
}
