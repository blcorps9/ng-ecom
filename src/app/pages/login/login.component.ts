import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Component, OnInit, OnDestroy, Inject } from "@angular/core";

import { RequestClientService } from "../../services/request-client/request-client.service";

import * as actions from "./login.actions";

import type { IAppStore } from "../../types/reduxTypes";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit, OnDestroy {
  profileForm: FormGroup;

  errorMessage: string = "";
  unsubscribe: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private client: RequestClientService,
    @Inject("AppStore") private appStore: IAppStore
  ) {
    this.profileForm = this.fb.group({
      username: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    this.unsubscribe = this.appStore.subscribe(() => {
      const { login } = this.appStore.getState();

      if (login.error) this.errorMessage = login.error.message || "";
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

  onSubmit() {
    if (this.profileForm.status === "VALID") {
      this.errorMessage = "";

      this.appStore.dispatch(actions.loginRequest());

      this.client
        .post("/auth/login", {
          data: this.profileForm.value,
        })
        .subscribe(
          (resp: any) => {
            this.appStore.dispatch(actions.loginSuccess(resp.body.data));
            this.router.navigateByUrl("/");
          },
          (error: any) => {
            this.appStore.dispatch(actions.loginFailure(error.error));
          }
        );
    }
  }
}
