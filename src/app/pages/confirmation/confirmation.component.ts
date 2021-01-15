import * as _ from "lodash";
import { Router } from "@angular/router";
import { Component } from "@angular/core";

import { ReduxConnect } from "../../decorators/redux-connect/redux-connect.decorator";

import { MONTHS_SHORT } from "../../app.constants";

@Component({
  selector: "app-confirmation",
  templateUrl: "./confirmation.component.html",
  styleUrls: ["./confirmation.component.scss"],
})
@ReduxConnect((state) => {
  const { lastOrder } = state.user;
  let strDate = "";

  if (lastOrder && lastOrder.deliveryDate) {
    const date = new Date(lastOrder.deliveryDate);
    const mmm = MONTHS_SHORT[date.getMonth()];
    const dd = date.getDate();
    const yy = date.getFullYear();

    strDate = `${mmm} ${dd}, ${yy}`;
  }

  return { lastOrder, strDate };
})
export class ConfirmationComponent {
  lastOrder: any = {};
  strDate: string = "";

  constructor(private router: Router) {}

  ngOnInit() {
    if (_.isEmpty(this.lastOrder)) this.router.navigateByUrl("/");
  }

  shouldShow() {
    return !_.isEmpty(this.lastOrder) && !_.isEmpty(this.strDate);
  }
}
