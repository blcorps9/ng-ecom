import { Component } from "@angular/core";

import { BRANDS } from "../../../constants";

@Component({
  selector: "app-brands",
  template: `
    <div class="site-brands">
      <span class="brand" *ngFor="let brand of brands">{{ brand.name }}</span>
    </div>
  `,
  styleUrls: ["./brands.component.scss"],
})
export class BrandsComponent {
  brands = BRANDS;

  constructor() {}
}
