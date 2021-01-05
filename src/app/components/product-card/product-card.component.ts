import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import {
  ReduxConnect,
  IReduxConnect,
} from "../../decorators/redux-connect/redux-connect.decorator";
import { RequestClientService } from "../../services/request-client/request-client.service";
import * as actions from "../../store/actions/user.actions";
import type { IProductFetch, IFAIconObject } from "../../types";

@Component({
  selector: "app-product-card",
  templateUrl: "./product-card.component.html",
  styleUrls: ["./product-card.component.scss"],
})
@ReduxConnect((state) => ({ isLoggedIn: state.user.isLoggedIn }))
export class ProductCardComponent implements OnInit, IReduxConnect {
  appStore: any;
  dispatch: any;
  unsubscribe: any;
  isLoggedIn = false;

  reqUrl: string;
  reqQueryParams: string = "{}";

  @Input() product: IProductFetch | undefined;
  @Input() isInCart = false;
  @Input() isFavorite = false;

  faRemoveBtnIcon: IFAIconObject = {
    prefix: "far",
    iconName: "window-close",
  };

  selectedColor = "";
  selectedSize = "";

  constructor(
    private router: Router,
    private http: RequestClientService,
    private route: ActivatedRoute
  ) {
    this.reqUrl = this.router.url;
    this.route.queryParams.subscribe((p) => {
      this.reqQueryParams = JSON.stringify(p);
    });
  }

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

    // this.dispatch(actions.addToCartRquest());
    // this.http.post("/users/shopping-cart/add", { data: item }).subscribe(
    //   (resp: any) => {
    //     this.dispatch(actions.addToCartSuccess(resp.body.data));
    //   },
    //   (error: any) => {
    //     this.dispatch(actions.addToCartFailure(error));
    //   }
    // );
  }

  onSelectSize(size: any): void {
    this.selectedSize = size;
  }

  onSelectColor(color: any): void {
    this.selectedColor = color;
  }

  onAddToCart(event: any) {
    event.preventDefault();
    event.stopPropagation();

    console.log("onAddToCart =-----> ", this.isLoggedIn);

    if (this.isLoggedIn) {
      const item: any = {
        quantity: 1,
        id: this.product?.id,
        price: this.product?.price,
      };

      if (this.selectedColor) item.color = this.selectedColor;
      if (this.selectedSize) item.size = this.selectedSize;

      this.dispatch(actions.addToCartRquest());
      this.http.post("/users/shopping-cart/add", { data: item }).subscribe(
        (resp: any) => {
          this.dispatch(actions.addToCartSuccess(resp.body.data));
        },
        (error: any) => {
          this.dispatch(actions.addToCartFailure(error));
        }
      );
    } else {
      this.router.navigate(["/login"], {
        queryParams: {
          reqUrl: this.reqUrl,
          reqQueryParams: this.reqQueryParams,
        },
      });
    }
  }

  onRemoveFromCart(event: any) {
    event.preventDefault();
    event.stopPropagation();

    if (this.product) {
      this.dispatch(actions.removeFromCartRquest());
      this.http.del(`/users/shopping-cart/${this.product.id}`).subscribe(
        (resp: any) => {
          this.dispatch(actions.removeFromCartSuccess(resp.body.data));
        },
        (error: any) => {
          this.dispatch(actions.removeFromCartFailure(error));
        }
      );
    }
  }
}
