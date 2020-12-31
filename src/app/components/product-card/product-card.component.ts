import { Component, OnInit, Input } from "@angular/core";

import type { IProductFetch, IFAIconObject } from "../../types";

@Component({
  selector: "app-product-card",
  templateUrl: "./product-card.component.html",
  styleUrls: ["./product-card.component.scss"],
})
export class ProductCardComponent implements OnInit {
  @Input() product: IProductFetch | undefined;

  faRemoveBtnIcon: IFAIconObject = {
    prefix: "far",
    iconName: "window-close",
  };

  isInCart = false;
  isFavorite = true;
  selectedColor = "";
  selectedSize = "";

  constructor() {}

  ngOnInit(): void {
    if (this.product?.colors) {
      this.selectedColor = this.product.colors[0];
    }

    if (this.product?.sizes) {
      this.selectedSize = String(this.product.sizes[0]);
    }
  }

  toggleFavorite(event: any) {
    if (event.preventDefault) {
      event.preventDefault();
      event.stopPropagation();
    }

    this.isFavorite = !this.isFavorite;
  }

  onSelectSize(size: any): void {
    this.selectedSize = size;
  }

  onSelectColor(color: any): void {
    this.selectedColor = color;
  }
}
