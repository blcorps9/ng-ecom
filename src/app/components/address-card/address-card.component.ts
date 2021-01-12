import { Component, EventEmitter, Input, Output, OnInit } from "@angular/core";
import * as _ from "lodash";

import { IFAIconObject } from "src/app/types";

@Component({
  selector: "app-address-card",
  templateUrl: "./address-card.component.html",
  styleUrls: ["./address-card.component.scss"],
})
export class AddressCardComponent implements OnInit {
  @Input() address: any;
  @Output() onEdit = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<any>();
  @Output() onSelect = new EventEmitter<any>();

  faTrashIcon: IFAIconObject = { prefix: "far", iconName: "trash-alt" };
  faEditIcon: IFAIconObject = { prefix: "far", iconName: "edit" };

  constructor() {}

  ngOnInit(): void {}

  getAddrLines() {
    const address = this.address;

    return _.compact([address.line1, address.line2, address.street]).join(", ");
  }

  getAddrCity() {
    const address = this.address;

    return _.compact([address.city, address.state, address.postalCode]).join(
      ", "
    );
  }

  _onEdit() {
    this.onEdit.emit(this.address);
  }

  _onDelete() {
    this.onDelete.emit(this.address);
  }

  _onSelect() {
    this.onSelect.emit(this.address);
  }
}
