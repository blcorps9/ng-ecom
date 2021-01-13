import * as _ from "lodash";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import * as actions from "../../store/actions/user.actions";
import { ReduxConnect } from "src/app/decorators/redux-connect/redux-connect.decorator";
import { RequestClientService } from "src/app/services/request-client/request-client.service";

@Component({
  selector: "app-payment",
  templateUrl: "./payment.component.html",
  styleUrls: ["./payment.component.scss"],
})
@ReduxConnect((state) => ({
  cards: state.user.cards,
  checkoutData: state.user.checkoutData,
}))
export class PaymentComponent implements OnInit {
  dispatch: any;
  checkoutData: any;
  cards: any;
  cardToBeEdited: any;

  showForm = false;
  isEdit = false;

  constructor(private router: Router, private http: RequestClientService) {}

  ngOnInit(): void {
    // Make sure you have the delivery address for payment and delivery
    if (_.isEmpty(this.checkoutData)) this.router.navigateByUrl("/delivery");
  }

  toggleCardForm() {
    this.showForm = !this.showForm;
  }

  onSubmit(card: any) {
    if (card) {
      const { firstName, lastName, cardNumber, ...payload } = card;

      payload.holderName = `${firstName} ${lastName}`;
      payload.cardNumber = cardNumber.replace(/[^0-9]/g, "");

      this.dispatch(actions.saveCardRequest());
      this.http.post("/users/cards", { data: payload }).subscribe(
        (resp) => {
          this.dispatch(actions.saveCardSuccess(resp.body.data));
        },
        (error) => {
          this.dispatch(actions.saveCardFailure(error));
        }
      );
    }
  }

  // TODO: Make API
  onClickEdit(event: any) {
    console.log("PaymentComponent#onClickEdit =-----> ", event);
  }
  // TODO: Make API
  onClickDelete(event: any) {
    console.log("PaymentComponent#onClickDelete =-----> ", event);
  }
  // TODO: Make API
  onPayNow(event: any) {
    console.log("PaymentComponent#onPayNow =-----> ", event);
  }
}
