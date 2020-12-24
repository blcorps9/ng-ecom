import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  profileForm: FormGroup;
  errorMessage: string = "";

  constructor(private fb: FormBuilder, private client: HttpClient) {
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
        .get("https://jsonplaceholder.typicode.com/todos/1")
        .subscribe((x: any) => {
          console.log("Observer got a next value: ", x);

          this.errorMessage = x?.title;
        });
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
