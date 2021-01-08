import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Component, OnInit, OnDestroy } from "@angular/core";

import { RequestClientService } from "../../services/request-client/request-client.service";

import * as actions from "../../store/actions/user.actions";
import {
  ReduxConnect,
  IReduxConnect,
} from "../../decorators/redux-connect/redux-connect.decorator";

import type { IReturnTo } from "../../types";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
@ReduxConnect((state) => ({
  isLoggedIn: state.user.isLoggedIn,
  errorMessage: state.user.error?.message,
}))
export class LoginComponent implements IReduxConnect, OnInit, OnDestroy {
  profileForm: FormGroup;

  returnTo: IReturnTo = { reqUrl: "/", reqQueryParams: "{}" };

  errorMessage: string = "";
  isLoggedIn = false;

  unsubscribe$: any;
  unsubscribe: any;
  dispatch: any;
  appStore: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private client: RequestClientService
  ) {
    this.route.queryParams.subscribe((p) => {
      const { reqUrl = "/", reqQueryParams = "{}" } = p;

      this.returnTo = { reqUrl, reqQueryParams };
    });

    this.profileForm = this.fb.group({
      username: ["saint@walker.com", [Validators.required, Validators.email]],
      password: ["123456", Validators.required],
    });
  }

  ngOnInit() {
    this.unsubscribe$ = this.appStore.subscribe(() => {
      const { user } = this.appStore.getState();

      if (user.isLoggedIn) {
        this.navigateBack();
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribe$();
  }

  navigateBack() {
    const { reqUrl, reqQueryParams } = this.returnTo;

    this.router.navigate([reqUrl], {
      queryParams: JSON.parse(reqQueryParams),
    });
  }

  onSubmit() {
    if (this.profileForm.status === "VALID") {
      this.errorMessage = "";

      this.dispatch(actions.userLoginRequest());

      this.client
        .post("/auth/login", {
          data: this.profileForm.value,
        })
        .subscribe(
          (resp: any) => {
            this.dispatch(actions.userLoginSuccess(resp.body.data));
            this.dispatch(actions.getDashboardRequest());
            this.client.get("/users/dashboard").subscribe(
              (resp) => {
                this.dispatch(actions.getDashboardSuccess(resp.body.data));
              },
              (error) => {
                this.dispatch(actions.getDashboardFailure(error));
              }
            );

            this.navigateBack();
          },
          (error: any) => {
            this.dispatch(actions.userLoginFailure(error.error));
          }
        );
    }
  }
}
