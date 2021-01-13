import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ReduxConnect } from "src/app/decorators/redux-connect/redux-connect.decorator";
import { RequestClientService } from "src/app/services/request-client/request-client.service";
import * as actions from "../../store/actions/user.actions";
import type { IAddressFields } from "../../types";

@Component({
  selector: "app-delivery",
  templateUrl: "./delivery.component.html",
  styleUrls: ["./delivery.component.scss"],
})
@ReduxConnect((state) => ({
  addresses: state.user?.addresses,
}))
export class DeliveryComponent implements OnInit {
  dispatch: any;

  addresses: IAddressFields[] = [];
  showForm = false;

  editAddressId = "";
  addressToBeEdited: IAddressFields | null = null;

  constructor(private http: RequestClientService, private router: Router) {}

  ngOnInit(): void {}

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

  toggleAddressForm() {
    this.showForm = !this.showForm;
  }

  onSaveAddress(addr: IAddressFields) {
    const { firstName, lastName, ...address }: any = addr;

    address.fullName = `${firstName} ${lastName}`;

    if (this.editAddressId) {
      this.dispatch(actions.saveAddressRequest());
      this.http
        .put(`/users/addresses/${this.editAddressId}`, { data: address })
        .subscribe(
          (resp) => {
            this.dispatch(actions.saveAddressSuccess(resp.body.data));
            this.showForm = false;
            this.editAddressId = "";
          },
          (error) => {
            this.dispatch(actions.saveAddressFailure(error));
          }
        );
    } else {
      this.dispatch(actions.saveAddressRequest());
      this.http.post("/users/addresses", { data: address }).subscribe(
        (resp) => {
          this.dispatch(actions.saveAddressSuccess(resp.body.data));
          this.showForm = false;
        },
        (error) => {
          this.dispatch(actions.saveAddressFailure(error));
        }
      );
    }
  }

  onClickEdit(addr: IAddressFields) {
    const {
      fullName,
      contactNo,
      line1,
      line2,
      street,
      city,
      state,
      postalCode,
      isDefault,
    } = addr;

    if (fullName) {
      const [firstName, lastName] = fullName.split(" ");

      this.editAddressId = addr.id || "";
      this.showForm = true;
      this.addressToBeEdited = {
        contactNo,
        line1,
        line2,
        street,
        city,
        state,
        postalCode,
        isDefault,
        firstName,
        lastName,
      };
    }
  }

  onClickDelete(addr: IAddressFields) {
    if (addr.id) {
      this.dispatch(actions.deleteAddressRequest());
      this.http.del(`/users/addresses/${addr.id}`).subscribe(
        (resp) => {
          this.dispatch(actions.deleteAddressSuccess(resp.body.data));
          this.getDashboard();
        },
        (error) => {
          this.dispatch(actions.deleteAddressFailure(error));
        }
      );
    }
  }

  // TODO: API Call - Skip
  onAddressSelect(addr: IAddressFields) {
    if (addr.id) {
      this.dispatch(actions.saveCheckoutData({ addressId: addr.id }));
      this.router.navigateByUrl("/payment");
      // TODO: Navigate to payment
    }
    console.log("onAddressSelect#addr =-----> ", addr);
  }
}
