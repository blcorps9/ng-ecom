import * as _ from "lodash";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { RequestClientService } from "../../services/request-client/request-client.service";

import { IProductFetch, IProductAltImg, IDropdownOptions } from "../../types";

@Component({
  selector: "app-pdp",
  templateUrl: "./pdp.component.html",
  styleUrls: ["./pdp.component.scss"],
})
export class PdpComponent implements OnInit {
  product: IProductFetch | null = null;

  selectedQuantity: number = 1;
  selectedColor: string | void = undefined;
  selectedSize: string | void = undefined;

  productAltImg: IProductAltImg[] = [];
  dropdownOptions: IDropdownOptions[] = [];

  isFavorite = false;
  isInCart = false;

  constructor(
    private route: ActivatedRoute,
    private http: RequestClientService
  ) {
    this.route.params.subscribe((p) => {
      if (!this.product && p.id) {
        this.http.get(`/bns/product/${p.id}`).subscribe(
          (resp) => {
            this.product = resp.body.data;

            if (this.product) {
              this.productAltImg = _.range(4).map(() => {
                return {
                  name: this.product?.name,
                  src: this.product?.image,
                } as IProductAltImg;
              });

              if (this.product.colors) {
                this.selectedColor = this.product.colors[0];
              }

              if (this.product.sizes) {
                this.selectedSize = String(this.product.sizes[0]);
              }

              this.dropdownOptions = _.map(
                _.range(1, (this.product.stock || 5) + 1),
                (o) => {
                  return {
                    value: o,
                    label: String(o),
                  } as IDropdownOptions;
                }
              );
            }
          },
          (error: any) => console.error("error =-----> ", error)
        );
      }
    });
  }

  ngOnInit(): void {}

  getPriceStyle() {
    return this.product?.salePrice ? "text-decoration: line-through;" : "";
  }

  toggleFavorite(): void {
    // TODO: Make api call
    this.isFavorite = !this.isFavorite;
  }

  onSelectColor(color: string) {
    this.selectedColor = color;
  }

  onSelectSize(size: string) {
    this.selectedSize = size;
  }

  onSelectQuantity(opt: IDropdownOptions) {
    this.selectedQuantity = Number(opt.value);
  }
}
