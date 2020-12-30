import { Component, OnInit, Input } from "@angular/core";

import type { FAIconObject } from "../../types/faTypes";
import type { IProductFetch } from "../../types/productTypes";

@Component({
  selector: "app-product-card",
  templateUrl: "./product-card.component.html",
  styleUrls: ["./product-card.component.scss"],
})
export class ProductCardComponent implements OnInit {
  @Input() product: IProductFetch | undefined;

  faRemoveBtnIcon: FAIconObject = {
    prefix: "far",
    iconName: "window-close",
  };

  isInCart = false;
  showImage = true;
  isFavorite = true;

  constructor() {}

  ngOnInit(): void {}

  toggleFavorite(event: any) {
    if (event.preventDefault) {
      event.preventDefault();
      event.stopPropagation();
    }

    this.isFavorite = !this.isFavorite;

    console.log("this.isFavorite =-----> ", this.isFavorite);
  }
}
