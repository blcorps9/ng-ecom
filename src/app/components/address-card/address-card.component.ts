import { Component, EventEmitter, Input, Output, OnInit } from "@angular/core";
import * as _ from "lodash";

import { IFAIconObject, IAddressFields } from "src/app/types";

@Component({
  selector: "app-address-card",
  templateUrl: "./address-card.component.html",
  styleUrls: ["./address-card.component.scss"],
})
export class AddressCardComponent implements OnInit {
  @Input() address: IAddressFields | null = null;
  @Output() onEdit = new EventEmitter<IAddressFields>();
  @Output() onDelete = new EventEmitter<IAddressFields>();
  @Output() onSelect = new EventEmitter<IAddressFields>();

  faTrashIcon: IFAIconObject = { prefix: "far", iconName: "trash-alt" };
  faEditIcon: IFAIconObject = { prefix: "far", iconName: "edit" };

  constructor() {}

  ngOnInit(): void {}

  getAddrLines() {
    if (this.address) {
      const { line1, line2, street } = this.address;

      return _.compact([line1, line2, street]).join(", ");
    }

    return "";
  }

  getAddrCity() {
    if (this.address) {
      const { city, state, postalCode } = this.address;

      return _.compact([city, state, postalCode]).join(", ");
    }

    return "";
  }

  _onEdit() {
    if (this.address) this.onEdit.emit(this.address);
  }

  _onDelete() {
    if (this.address) this.onDelete.emit(this.address);
  }

  _onSelect() {
    if (this.address) this.onSelect.emit(this.address);
  }
}
