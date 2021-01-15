import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-delivery-step",
  templateUrl: "./delivery-step.component.html",
  styleUrls: ["./delivery-step.component.scss"],
})
export class DeliveryStepComponent implements OnInit {
  addressForm: FormGroup;

  @Input() disableCTA = false;
  @Output() onSubmit = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {
    this.addressForm = this.fb.group({
      firstName: "Saint",
      lastName: "Walker",
      phoneNumber: "9123456789",
      line1: "1234 Main St",
      line2: "Near UB City",
      city: "Bangalore",
      state: "KN",
      postalCode: "560001",
    });
  }

  ngOnInit(): void {}

  _onSubmit() {
    this.onSubmit.emit(this.addressForm.value);
  }
}
