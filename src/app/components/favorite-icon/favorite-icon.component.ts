import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import type { IFAIconObject } from "../../types";

@Component({
  selector: "app-favorite-icon",
  templateUrl: "./favorite-icon.component.html",
  styleUrls: ["./favorite-icon.component.scss"],
})
export class FavoriteIconComponent implements OnInit, OnChanges {
  @Input() isFavorite = false;

  faFavoriteIcon: IFAIconObject = { prefix: "far", iconName: "heart" };

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.faFavoriteIcon = {
      prefix: changes.isFavorite.currentValue ? "fas" : "far",
      iconName: "heart",
    };
  }

  ngOnInit(): void {
    this.faFavoriteIcon = {
      prefix: this.isFavorite ? "fas" : "far",
      iconName: "heart",
    };
  }
}
