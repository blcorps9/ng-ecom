import {
  Component,
  Input,
  EventEmitter,
  Output,
  OnChanges,
  SimpleChanges,
} from "@angular/core";

import type { ISwatch } from "../../types";

@Component({
  selector: "app-swatches",
  templateUrl: "./swatches.component.html",
  styleUrls: ["./swatches.component.scss"],
})
export class SwatchesComponent implements OnChanges {
  @Input() type: string = "";
  @Input() current: string = "";
  @Input() heading: string = "";
  @Input() swatches: Array<string | number> = [];

  @Output() onSelect = new EventEmitter<string>();

  xSwatches: ISwatch[] = [];

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.xSwatches = this.swatches.map((s) => {
      return {
        value: s,
        label: this.type === "color" ? "" : s,
        isSelected: String(s) === this.current,
        style: this.type === "color" ? `background-color: ${s}` : "",
      } as ISwatch;
    });
  }

  swatchClass(s: ISwatch) {
    const classes = ["swatch", this.type];

    if (s.isSelected) classes.push("selected");

    return classes.join(" ");
  }

  onClick(event: any, swatch: ISwatch) {
    event.preventDefault();
    event.stopPropagation();

    this.onSelect.emit(swatch.value);
  }
}
