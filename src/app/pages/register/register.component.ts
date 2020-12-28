import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RequestClientService } from "../../services/request-client/request-client.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  profileForm: FormGroup;
  errorMessage: string = "";

  constructor(private fb: FormBuilder, private client: RequestClientService) {
    this.profileForm = this.fb.group({
      firstName: ["Saint", Validators.required],
      lastName: ["Walker", Validators.required],
      email: ["saint@walker.com", [Validators.required, Validators.email]],
      password: ["12345", Validators.required],
      confirmPassword: ["12345", Validators.required],
      role: ["user", Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.profileForm.status === "VALID") {
      this.client
        .get("/comments", {
          headers: {
            "some-random-header-1": 342343545,
            "some-random-header-2": 342343546,
            "some-random-header-3": 342343547,
            "content-type": "application/json",
          },
          params: {
            postId: 1,
            id: 4,
          },
        })
        .subscribe(
          (x: any) => {
            console.log("Observer got a next value: ", x);

            this.errorMessage = x?.body?.title;
          },
          (error) => console.log("error =-----> ", error)
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
