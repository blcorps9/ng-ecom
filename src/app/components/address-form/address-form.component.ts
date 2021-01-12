import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-address-form",
  templateUrl: "./address-form.component.html",
  styleUrls: ["./address-form.component.scss"],
})
export class AddressFormComponent implements OnInit {
  addressForm: FormGroup;
  states = [{ value: "KN", label: "Karnataka" }];

  @Output() onSubmit = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {
    this.addressForm = this.fb.group({
      firstName: "Saint",
      lastName: "Walker",
      contactNo: "9123456789",
      line1: "1234 Main St",
      line2: "Near UB City",
      street: "M G Road",
      city: "Bangalore",
      state: "KN",
      postalCode: "560001",
      isDefault: false,
    });
  }

  ngOnInit(): void {}

  _onSubmit() {
    this.onSubmit.emit(this.addressForm.value);
  }
}
