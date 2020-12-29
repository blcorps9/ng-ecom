import { Router } from "@angular/router";
import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RequestClientService } from "../../services/request-client/request-client.service";

import * as actions from "./register.actions";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit, OnDestroy {
  profileForm: FormGroup;
  errorMessage: string = "";

  profile = null;
  httpMsg: string = "";

  unsubscribe: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private client: RequestClientService,
    @Inject("AppStore") private appStore: any
  ) {
    this.profileForm = this.fb.group({
      firstName: ["Saint", Validators.required],
      lastName: ["Walker", Validators.required],
      email: ["saint@walker.com", [Validators.required, Validators.email]],
      password: ["123456", Validators.required],
      confirmPassword: ["123456", Validators.required],
      role: ["user", Validators.required],
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

  ngOnInit(): void {
    this.unsubscribe = this.appStore.subscribe(() => {
      const { register } = this.appStore.getState();

      if (register.data) {
        this.profile = register.data.data || {};
        this.httpMsg = register.data.message || "";
      }

      if (register.error) this.errorMessage = register.error.message || "";
    });
  }

  onSubmit() {
    if (this.profileForm.status === "VALID") {
      this.errorMessage = "";
      this.profile = null;
      this.httpMsg = "";

      this.appStore.dispatch(actions.getCommentsRequest());

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
            this.appStore.dispatch(actions.getCommentsSuccess(resp.body.data));
            this.router.navigateByUrl("/");
          },
          (error: any) => {
            this.appStore.dispatch(actions.getCommentsFailure(error.error));
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
