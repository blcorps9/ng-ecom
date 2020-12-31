import { Component } from "@angular/core";

import type { IFAIconObject } from "../../types";
import { PAYMENT_CARDS } from "../../../constants";

@Component({
  selector: "app-payment-cards",
  templateUrl: "./payment-cards.component.html",
  styleUrls: ["./payment-cards.component.scss"],
})
export class PaymentCardsComponent {
  cards: IFAIconObject[] = PAYMENT_CARDS.map(
    (c) =>
      ({
        prefix: c.icon.prefix,
        iconName: c.icon.iconName,
      } as IFAIconObject)
  );

  constructor() {}
}
