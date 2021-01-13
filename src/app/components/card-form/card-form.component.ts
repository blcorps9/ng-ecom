import * as _ from "lodash";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";

import { MONTHS_SHORT } from "../../app.constants";

import type { IFAIconObject } from "../../types";

// TODO: Try this component with template-form

@Component({
  selector: "app-card-form",
  templateUrl: "./card-form.component.html",
  styleUrls: ["./card-form.component.scss"],
})
export class CardFormComponent implements OnInit {
  cardType = "";
  months = MONTHS_SHORT;
  cardForm: FormGroup;

  @Input() isEdit = false;
  @Input() card: any;
  @Output() onSubmit = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {
    this.cardForm = this.fb.group({
      firstName: "Saint",
      lastName: "Walker",
      cardNumber: "4111 1111 1111 1111",
      type: "visa",
      cvv: "123",
      expiryMonth: "11", // [0:Jan,,,,,11:Dec]
      expiryYear: "2022",
      isDefault: false,
    });
    this.cardType = "visa";
  }

  ngOnInit(): void {}

  getFAIconByType() {
    return { prefix: "fab", iconName: `cc-${this.cardType}` } as IFAIconObject;
  }

  getValidCCYears() {
    const currentYear = new Date().getFullYear();

    return _.range(currentYear, currentYear + 10);
  }

  _onSubmit() {
    console.log("this.cardForm =-----> ", this.cardForm);
    if (this.cardForm.status === "VALID") {
      this.onSubmit.emit(this.cardForm.value);
    }
  }
}
