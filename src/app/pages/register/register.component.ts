import { ActivatedRoute, Router } from "@angular/router";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RequestClientService } from "../../services/request-client/request-client.service";

import {
  ReduxConnect,
  IReduxConnect,
} from "../../decorators/redux-connect/redux-connect.decorator";
import * as actions from "../../store/actions/user.actions";
import type { IReturnTo } from "../../types";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
@ReduxConnect((state: any) => ({ products: state.home.data }))
export class RegisterComponent implements IReduxConnect {
  profileForm: FormGroup;

  returnTo: IReturnTo = { reqUrl: "/", reqQueryParams: "{}" };
  errorMessage: string = "";

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
      firstName: ["Saint", Validators.required],
      lastName: ["Walker", Validators.required],
      email: ["saint@walker.com", [Validators.required, Validators.email]],
      password: ["123456", Validators.required],
      confirmPassword: ["123456", Validators.required],
      role: ["user", Validators.required],
    });
  }

  onSubmit() {
    if (this.profileForm.status === "VALID") {
      this.errorMessage = "";

      this.dispatch(actions.userRegisterRequest());

      const {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        role,
      } = this.profileForm.value;

      this.client
        .post("/auth/register", {
          data: {
            name: `${firstName} ${lastName}`,
            email,
            password,
            confirmPassword,
            role,
          },
        })
        .subscribe(
          (resp: any) => {
            this.dispatch(actions.userRegisterSuccess(resp.body.data));
            this.dispatch(actions.getDashboardRequest());
            this.client.get("/users/dashboard").subscribe(
              (resp) => {
                this.dispatch(actions.getDashboardSuccess(resp.body.data));
              },
              (error) => {
                this.dispatch(actions.getDashboardFailure(error));
              }
            );

            const { reqUrl, reqQueryParams } = this.returnTo;

            this.router.navigate([reqUrl], {
              queryParams: JSON.parse(reqQueryParams),
            });
          },
          (error: any) => {
            this.dispatch(actions.userRegisterFailure(error.error));
          }
        );
    }
  }

  get shouldValidate(): boolean {
    return this.profileForm?.touched && this.profileForm?.status === "INVALID";
  }

  get firstNameHasError(): boolean {
    return (this.shouldValidate &&
      this.profileForm?.controls?.firstName?.errors) as boolean;
  }

  get lastNameHasError(): boolean {
    return (this.shouldValidate &&
      this.profileForm?.controls?.lastName?.errors) as boolean;
  }

  get emailHasError(): boolean {
    return (this.shouldValidate &&
      this.profileForm?.controls?.email?.errors) as boolean;
  }

  get passwordHasError(): boolean {
    return (this.shouldValidate &&
      this.profileForm?.controls?.password?.errors) as boolean;
  }

  get confirmPasswordHasError(): boolean {
    return (this.shouldValidate &&
      this.profileForm?.controls?.confirmPassword?.errors) as boolean;
  }

  get roleHasError(): boolean {
    return (this.shouldValidate &&
      this.profileForm?.controls?.role?.errors) as boolean;
  }
}
