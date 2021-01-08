import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup } from "@angular/forms";

import { RequestClientService } from "../../services/request-client/request-client.service";
import * as actions from "../../store/actions/user.actions";
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

  constructor(
    private fb: FormBuilder,
    private http: RequestClientService,
    private router: Router
  ) {
    this.searchForm = this.fb.group({
      query: "",
    });
  }

  onSubmit() {
    if (this.searchForm?.status === "VALID") {
      console.log(" onSubmit =---- > ", this.searchForm?.value);
    }
  }

  onLogout() {
    if (this.isLoggedIn) {
      this.dispatch(actions.userLogoutRequest());
      this.http.get("/auth/logout").subscribe(
        () => {
          this.dispatch(actions.userLogoutSuccess());
          this.router.navigateByUrl("/");
        },
        (err) => {
          this.dispatch(actions.userLogoutFailure(err));
        }
      );
    }
  }
}
