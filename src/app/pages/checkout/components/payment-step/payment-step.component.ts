declare var Stripe: any;

import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import * as _ from "lodash";
import { ReduxConnect } from "src/app/decorators/redux-connect/redux-connect.decorator";
import { RequestClientService } from "src/app/services/request-client/request-client.service";
import { environment } from "../../../../../environments/environment";

import {
  showLoader,
  hideLoader,
} from "../../../../store/actions/common.actions";

// Parent#state.showForm > Child#props.showForm
// showForm false ---> true

@Component({
  selector: "app-payment-step",
  templateUrl: "./payment-step.component.html",
  styleUrls: ["./payment-step.component.scss"],
})
@ReduxConnect()
export class PaymentStepComponent implements OnInit, OnChanges {
  dispatch: any;

  @Input() cartTotal = 0.0;
  @Input() showForm = false;
  @Input() billingAddress: any;

  @Output() onSuccess = new EventEmitter<any>();
  @Output() onFailure = new EventEmitter<any>();

  enablePayNow = false;

  stripe: any;
  cardElement: any;
  stripeCardMounted = false;

  constructor(private http: RequestClientService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.showForm && !this.stripeCardMounted) {
      this.stripeCardMounted = true;
      this.dispatch(showLoader());
      const elements = this.stripe.elements();
      const options = {
        hidePostalCode: true,
        style: {
          base: {
            fontSize: "16px",
            letterSpacing: "0.025em",
            fontSmoothing: "antialiased",
            color: "var(--color-dodgerblue)",
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            "::placeholder": {
              color: "var(--color-pink)",
            },
          },
          invalid: {
            color: "var(--red)",
            iconColor: "var(--red)",
          },
        },
      };
      this.cardElement = elements.create("card", options);
      this.cardElement.mount("#card-element");
      this.cardElement.on("ready", () => {
        this.dispatch(hideLoader());
      });
      this.cardElement.on("change", (event: any) => {
        if (event.complete) {
          this.enablePayNow = true;
        }
      });
    }
  }

  ngOnInit(): void {
    this.stripe = Stripe(environment.STRIPE_KEY);
  }

  getPayNowClasses() {
    return {
      "bg-primary": this.enablePayNow,
      "bg-secondary": !this.enablePayNow,
    };
  }

  getPayNowStyles() {
    return `cursor: ${this.enablePayNow ? "pointer" : "not-allowed"};`;
  }

  async _onPayNow() {
    if (this.enablePayNow) {
      const { error, paymentMethod } = await this.stripe.createPaymentMethod({
        type: "card",
        card: this.cardElement,
        billing_details: this.billingAddress,
      });

      if (error) {
        this.onFailure.emit(error);
      } else if (paymentMethod.id) {
        this.http
          .post("/stripe/payment", {
            data: {
              amount: this.cartTotal,
              name: this.billingAddress.name,
              email: this.billingAddress.email,
              paymentMethod: paymentMethod.id,
            },
          })
          .subscribe(
            (resp) => {
              if (_.get(resp, ["body", "data", "status"]) === "succeeded") {
                this.onSuccess.emit(resp.body.data);
              } else {
                this.onFailure.emit(resp.body.data);
              }
            },
            (error) => {
              this.onFailure.emit(error);
            }
          );
      }
    }
  }
}
