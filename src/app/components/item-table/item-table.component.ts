import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import * as _ from "lodash";

import type { ICartItem } from "../../types";

@Component({
  selector: "app-item-table",
  templateUrl: "./item-table.component.html",
  styleUrls: ["./item-table.component.scss"],
})
export class ItemTableComponent implements OnInit {
  @Input() items: ICartItem[] = [];
  @Input() actionLabel: string = "";
  @Input() noAction: boolean = false;

  @Output() onAction = new EventEmitter<ICartItem>();

  tabHeader: string[] = ["#", "Name", "Brand", "Quantity", "Price"];
  hasSize = false;
  hasColor = false;

  constructor() {}

  ngOnInit(): void {
    const { items } = this;

    this.hasSize = !!_.find(items, (i) => i.size);
    this.hasColor = !!_.find(items, (i) => i.color);

    if (this.hasSize) this.tabHeader.push("Size");

    if (this.hasColor) this.tabHeader.push("Color");

    if (!this.noAction) this.tabHeader.push("Action");
  }

  onClick(event: any) {
    this.onAction.emit(event);
  }
}
