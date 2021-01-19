import * as _ from "lodash";
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";

import type { IPaginationConfig } from "../../types";

@Component({
  selector: "app-pagination",
  templateUrl: "./pagination.component.html",
  styleUrls: ["./pagination.component.scss"],
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() config: IPaginationConfig | null = null;
  @Input() classes = "";

  @Output() onChange = new EventEmitter<any>();

  totalPagesRange: number[] = [];

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.config) this.totalPagesRange = _.range(this.config.totalPages);
  }

  ngOnInit(): void {
    if (this.config) this.totalPagesRange = _.range(this.config.totalPages);
  }

  getRootClasses() {
    return this.classes;
  }

  onChangeItemsPerPage(event: any) {
    this.onChange.emit({
      ...this.config,
      currentPage: 0,
      itemsPerPage: Number(event.target.value),
    });
  }

  onClickPrev() {
    this.onChange.emit({
      ...this.config,
      currentPage: (this.config?.currentPage || 0) - 1,
    });
  }

  onClickPage(event: any) {
    this.onChange.emit({
      ...this.config,
      currentPage: event,
    });
  }

  onClickNext() {
    this.onChange.emit({
      ...this.config,
      currentPage: (this.config?.currentPage || 0) + 1,
    });
  }
}
