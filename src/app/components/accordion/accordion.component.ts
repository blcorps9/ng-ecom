import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ILeftNav } from "src/app/types";

@Component({
  selector: "app-accordion",
  templateUrl: "./accordion.component.html",
  styleUrls: ["./accordion.component.scss"],
})
export class AccordionComponent {
  @Input() cells: ILeftNav[] = [];

  @Output() onSelection = new EventEmitter<any>();

  openKey = "";

  constructor() {}

  onClickCell(cellIndex: string) {
    this.openKey = this.openKey === cellIndex ? "" : cellIndex;
  }

  onSelect(cellIndex: number, cell: any, isRadio: boolean) {
    this.onSelection.emit({
      cellIndex,
      cell,
      isRadio,
      label: this.cells[cellIndex].header,
    });
  }

  getCellIcon(cellIndex: string) {
    return {
      prefix: "fas",
      iconName: cellIndex === this.openKey ? "chevron-up" : "chevron-down",
    };
  }
}
