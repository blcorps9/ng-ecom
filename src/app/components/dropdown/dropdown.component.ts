import { Component, EventEmitter, Input, Output } from "@angular/core";

import type { IDropdownOptions } from "../../types";

@Component({
  selector: "app-dropdown",
  templateUrl: "./dropdown.component.html",
  styleUrls: ["./dropdown.component.scss"],
})
export class DropdownComponent {
  isOpen: boolean = false;

  @Input() options: IDropdownOptions[] = [];
  @Input() styles: string = "";
  @Input() label: string = "";

  @Output() onSelect = new EventEmitter<IDropdownOptions>();

  constructor() {}

  toggleOpen() {
    this.isOpen = !this.isOpen;
  }

  onClick(event: any, o: IDropdownOptions) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    this.isOpen = false;
    this.onSelect.emit(o);
  }
}
