import { Component, OnInit } from "@angular/core";
import { ReduxConnect } from "src/app/decorators/redux-connect/redux-connect.decorator";
import { RequestClientService } from "src/app/services/request-client/request-client.service";
import * as actions from "../../store/actions/user.actions";

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

  addresses: any[] = [];
  showForm = false;
  isEdit = false;

  addressToBeEdited: any = null;

  constructor(private http: RequestClientService) {}

  ngOnInit(): void {}

  toggleAddressForm() {
    this.showForm = !this.showForm;
  }

  onSaveAddress(addr: any) {
    const { firstName, lastName, ...address }: any = addr;

    address.fullName = `${firstName} ${lastName}`;

    this.dispatch(actions.saveAddressRequest());
    this.http.post("/users/addresses", { data: address }).subscribe(
      (resp) => {
        this.dispatch(actions.saveAddressSuccess(resp.body.data));
      },
      (error) => {
        this.dispatch(actions.saveAddressFailure(error));
      }
    );
  }

  // TODO: API Call
  onClickEdit(addr: any) {
    console.log("onClickEdit#addr =-----> ", addr);
  }

  // TODO: API Call
  onClickDelete(addr: any) {
    console.log("onClickDelete#addr =-----> ", addr);
  }

  // TODO: API Call - Skip
  onAddressSelect(addr: any) {
    console.log("onAddressSelect#addr =-----> ", addr);
  }
}
