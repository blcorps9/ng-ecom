import * as _ from "lodash";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { RequestClientService } from "../../services/request-client/request-client.service";
import * as actions from "../../store/actions/user.actions";
import {
  ReduxConnect,
  IReduxConnect,
} from "../../decorators/redux-connect/redux-connect.decorator";

import { IProductFetch, IProductAltImg, IDropdownOptions } from "../../types";

@Component({
  selector: "app-pdp",
  templateUrl: "./pdp.component.html",
  styleUrls: ["./pdp.component.scss"],
})
@ReduxConnect((state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
})
export class PdpComponent implements OnInit, IReduxConnect {
  appStore: any;
  dispatch: any;
  unsubscribe: any;

  product: IProductFetch | null = null;

  selectedQuantity: number = 1;
  selectedColor: string | void = undefined;
  selectedSize: string | void = undefined;

  productAltImg: IProductAltImg[] = [];
  dropdownOptions: IDropdownOptions[] = [];

  isLoggedIn = false;
  isFavorite = false;
  isInCart = false;

  constructor(
    private router: Router,
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

              this.checkIsInCartAndFavorite(this.appStore?.getState());
            }
          },
          (error: any) => console.error("error =-----> ", error)
        );
      }
    });
  }

  ngOnInit(): void {
    this.checkIsInCartAndFavorite(this.appStore.getState());

    this.appStore.subscribe(() => {
      this.checkIsInCartAndFavorite(this.appStore.getState());
    });
  }

  getPriceStyle() {
    return this.product?.salePrice ? "text-decoration: line-through;" : "";
  }

  checkIsInCartAndFavorite(state: any) {
    const cartItems = _.map(
      _.get(state.user, ["cart", "items"], []),
      (item: any) => item.id
    );

    const favItems = _.map(
      _.get(state.user, ["favList", "items"], []),
      (item: any) => item.id
    );

    this.isFavorite = favItems.includes(this.product?.id);
    this.isInCart = cartItems.includes(this.product?.id);
  }

  navigateToLogin() {
    this.router.navigate(["/login"], {
      queryParams: {
        reqUrl: this.router.url,
      },
    });
  }

  toggleFavorite(): void {
    if (this.isLoggedIn && this.product) {
      if (this.isFavorite) {
        this.dispatch(actions.removeFromFavRequest());
        this.http
          .del(`/users/shopping-list/remove/${this.product.id}`)
          .subscribe(
            (resp: any) => {
              this.dispatch(actions.removeFromFavSuccess(resp.body.data));
            },
            (error: any) => {
              this.dispatch(actions.removeFromFavFailure(error));
            }
          );
      } else {
        const item: any = {
          id: this.product.id,
        };

        if (this.selectedColor) item.color = this.selectedColor;
        if (this.selectedSize) item.size = this.selectedSize;

        this.dispatch(actions.addToFavRequest());
        this.http.post("/users/shopping-list/add", { data: item }).subscribe(
          (resp: any) => {
            this.dispatch(actions.addToFavSuccess(resp.body.data));
          },
          (error: any) => {
            this.dispatch(actions.addToFavFailure(error));
          }
        );
      }
    } else {
      this.navigateToLogin();
    }
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

  onAddToCart(event: any) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (this.isLoggedIn) {
      const item: any = {
        id: this.product?.id,
        price: this.product?.price,
        quantity: this.selectedQuantity,
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
      this.navigateToLogin();
    }
  }

  onRemoveFromCart(event: any) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

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
