import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

import {
  ReduxConnect,
  IReduxConnect,
} from "../../decorators/redux-connect/redux-connect.decorator";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
@ReduxConnect((state) => ({
  cartCount: state.user.cartCount,
  isLoggedIn: state.user.isLoggedIn,
}))
export class HeaderComponent implements IReduxConnect {
  appStore: any;
  dispatch: any;
  unsubscribe: any;

  searchForm: FormGroup;

  cartCount = 0;
  isLoggedIn = false;

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      query: "",
    });
  }

  onSubmit() {
    if (this.searchForm?.status === "VALID") {
      console.log(" onSubmit =---- > ", this.searchForm?.value);
    }
  }
}
