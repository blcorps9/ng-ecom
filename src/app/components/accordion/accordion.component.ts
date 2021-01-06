import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ILeftNav, IFAIconObject } from "src/app/types";

@Component({
  selector: "app-accordion",
  templateUrl: "./accordion.component.html",
  styleUrls: ["./accordion.component.scss"],
})
export class AccordionComponent {
  @Input() cells: ILeftNav[] = [];

  @Output() onSelection = new EventEmitter<any>();

  openKey: number = -1;

  constructor() {}

  onClickCell(cellIndex: number) {
    this.openKey = this.openKey === cellIndex ? -1 : cellIndex;
  }

  onSelect(cellIndex: number, cell: any, isRadio: boolean | undefined) {
    this.onSelection.emit({
      cellIndex,
      cell,
      isRadio,
      label: this.cells[cellIndex].header,
    });
  }

  getCellIcon(cellIndex: number) {
    return {
      prefix: "fas",
      iconName: cellIndex === this.openKey ? "chevron-up" : "chevron-down",
    } as IFAIconObject;
  }
}
