import * as _ from "lodash";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

import { MONTHS_SHORT } from "../../app.constants";
import type { IFAIconObject } from "../../types";

@Component({
  selector: "app-card-card",
  templateUrl: "./card-card.component.html",
  styleUrls: ["./card-card.component.scss"],
})
export class CardCardComponent implements OnInit {
  faTrashIcon: IFAIconObject = { prefix: "far", iconName: "trash-alt" };
  faEditIcon: IFAIconObject = { prefix: "far", iconName: "edit" };

  @Input() card: any;

  @Output() onEdit = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<any>();
  @Output() onPayNow = new EventEmitter<any>();

  months = MONTHS_SHORT;
  hasValue = false;
  showSecurityFields = false;

  paymentForm: any = {};

  constructor() {}

  ngOnInit(): void {
    this.paymentForm = {
      cvv: "",
      expiryMonth: "",
      expiryYear: "",
      cardId: this.card.id,
    };
  }

  getSubmitBtnStyles() {
    return { cursor: this.hasValue ? "pointer" : "not-allowed" };
  }

  getValidCCYears() {
    const currentYear = new Date().getFullYear();

    return _.range(currentYear, currentYear + 10);
  }

  onMouseEnter() {
    this.showSecurityFields = true;
  }

  onMouseLeave() {
    if (!this.hasValue) this.showSecurityFields = false;
  }

  onKeyUp() {
    this.hasValue = true;
  }

  _onEdit() {
    if (this.card) this.onEdit.emit(this.card);
  }

  _onDelete() {
    if (this.card) this.onDelete.emit(this.card);
  }

  _onPayNow() {
    if (this.card) {
      const { cvv, expiryMonth, expiryYear } = this.paymentForm;

      if (cvv.length === 3 && expiryMonth && expiryYear) {
        this.onPayNow.emit(this.card);
        this.showSecurityFields = false;
      }
    }
  }
}
