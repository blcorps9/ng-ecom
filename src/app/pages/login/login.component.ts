import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Component, OnInit, OnDestroy, Inject } from "@angular/core";

import { RequestClientService } from "../../services/request-client/request-client.service";

import * as actions from "../../store/actions/user.actions";

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
      username: ["saint@walker.com", [Validators.required, Validators.email]],
      password: ["123456", Validators.required],
    });
  }

  ngOnInit(): void {
    this.unsubscribe = this.appStore.subscribe(() => {
      const { user } = this.appStore.getState();

      if (user.error) this.errorMessage = user.error.message || "";
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

  onSubmit() {
    if (this.profileForm.status === "VALID") {
      this.errorMessage = "";

      this.appStore.dispatch(actions.userLoginRequest());

      this.client
        .post("/auth/login", {
          data: this.profileForm.value,
        })
        .subscribe(
          (resp: any) => {
            this.appStore.dispatch(actions.userLoginSuccess(resp.body.data));
            this.router.navigateByUrl("/");
          },
          (error: any) => {
            this.appStore.dispatch(actions.userLoginFailure(error.error));
          }
        );
    }
  }
}
