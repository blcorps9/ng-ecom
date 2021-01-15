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
  cart: state.user.cart,
  cards: state.user.cards,
  checkoutData: state.user.checkoutData,
}))
export class PaymentComponent implements OnInit {
  dispatch: any;

  cart: any;
  cards: any;
  checkoutData: any;
  cardToBeEdited: any;

  showForm = false;
  editCardId = "";

  constructor(private router: Router, private http: RequestClientService) {}

  ngOnInit(): void {
    // Make sure you have the delivery address for payment and delivery
    if (_.isEmpty(this.checkoutData)) this.router.navigateByUrl("/delivery");
  }

  toggleCardForm() {
    this.showForm = !this.showForm;
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

  onSubmit(card: any) {
    if (card) {
      const { firstName, lastName, cardNumber, ...payload } = card;

      payload.holderName = `${firstName} ${lastName}`;
      payload.cardNumber = cardNumber.replace(/[^0-9]/g, "");

      if (this.editCardId) {
        this.dispatch(actions.updateCardRequest());
        this.http
          .put(`/users/cards/${this.editCardId}`, { data: payload })
          .subscribe(
            (resp) => {
              this.dispatch(actions.updateCardSuccess(resp.body.data));
              this.showForm = false;
              this.editCardId = "";
            },
            (error) => {
              this.dispatch(actions.updateCardFailure(error));
            }
          );
      } else {
        this.dispatch(actions.saveCardRequest());
        this.http.post("/users/cards", { data: payload }).subscribe(
          (resp) => {
            this.showForm = false;
            this.dispatch(actions.saveCardSuccess(resp.body.data));
          },
          (error) => {
            this.dispatch(actions.saveCardFailure(error));
          }
        );
      }
    }
  }

  onClickEdit(card: any) {
    const {
      id,
      cardNumber,
      cvv,
      expiryMonth,
      expiryYear,
      holderName,
      type,
      isDefault = false,
    } = card;
    const [firstName, lastName] = holderName.split(" ");

    this.editCardId = id;
    this.showForm = true;
    this.cardToBeEdited = {
      firstName,
      lastName,
      cardNumber,
      cvv,
      expiryMonth,
      expiryYear,
      type,
      isDefault,
    };
  }

  onClickDelete(card: any) {
    if (card) {
      this.dispatch(actions.deleteCardRequest());
      this.http.del(`/users/cards/${card.id}`).subscribe(
        (resp) => {
          this.dispatch(actions.deleteCardSuccess(card.id));
        },
        (error) => {
          this.dispatch(actions.deleteCardFailure(error));
        }
      );
    }
  }

  onPayNow(card: any) {
    const { addressId: address } = this.checkoutData;
    const { id: cart } = this.cart;

    if (card) {
      this.dispatch(actions.placeOrderRequest());
      this.http
        .post("/orders", { data: { address, cart, card: card.id } })
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
  }
}
