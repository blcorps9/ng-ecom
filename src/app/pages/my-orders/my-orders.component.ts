import * as _ from "lodash";
import { Component, OnInit } from "@angular/core";

import * as actions from "../../store/actions/user.actions";
import { isPastDate, maskCardNumber } from "../../app.utils";
import { ReduxConnect } from "src/app/decorators/redux-connect/redux-connect.decorator";
import { RequestClientService } from "src/app/services/request-client/request-client.service";

import type { IOrder, IOrderItem, IPaginationConfig } from "../../types";

@Component({
  selector: "app-my-orders",
  templateUrl: "./my-orders.component.html",
  styleUrls: ["./my-orders.component.scss"],
})
@ReduxConnect((state) => ({
  cards: state.user.cards,
  addresses: state.user.addresses,
}))
export class MyOrdersComponent implements OnInit {
  dispatch: any;

  totalOrders: IOrder[] = [];
  addresses = [];
  cards = [];

  orders: IOrder[] = [];

  showItemsForOrder = "";
  itemsForOrder: any[] = [];

  paginationConfig: IPaginationConfig = {
    itemsPerPage: 3,
    currentPage: 0,
    totalPages: 1,
  };

  constructor(private http: RequestClientService) {}

  ngOnInit(): void {
    this.http.get("/orders").subscribe(
      (resp) => {
        const { itemsPerPage, currentPage } = this.paginationConfig;

        this.totalOrders = resp.body.data;
        this.paginationConfig = {
          currentPage,
          itemsPerPage,
          totalPages: Math.ceil(this.totalOrders.length / itemsPerPage),
        };

        this.orders = _.slice(
          this.totalOrders,
          itemsPerPage * currentPage,
          itemsPerPage * currentPage + itemsPerPage
        );
      },
      (err) => {
        console.log("err =-----> ", err);
      }
    );
  }

  isOrderDelivered(order: IOrder) {
    const dd = new Date(order.deliveryDate);
    const isDelivered = isPastDate(dd);

    return isDelivered;
  }

  getOrderStatusClass(order: IOrder) {
    const delivered = this.isOrderDelivered(order);

    return {
      "text-info": !delivered,
      "text-success": delivered,
    };
  }

  getDeliveryAddress(addressId: string) {
    const address: any = _.find(this.addresses, ({ id }) => id === addressId);

    if (address) {
      return _.compact([
        address.fullName,
        address.line1,
        address.line2,
        address.postalCode,
      ]).join(", ");
    }

    return "";
  }
  getPaymentMethod(cardId: string) {
    const card: any = _.find(this.cards, ({ id }) => id === cardId);

    if (card)
      return _.compact([card.holderName, maskCardNumber(card.cardNumber)]).join(
        ", "
      );

    return "";
  }

  getOrderItemsDetails(order: IOrder) {
    this.http
      .get("/bns/products", {
        params: {
          ids: _.map(order.items, "id"),
        },
      })
      .subscribe(
        (resp) => {
          this.itemsForOrder = _.map(order.items, (i) => {
            const item = _.find(resp.body.data, ({ id }) => id === i.id);

            if (item) return { ...i, name: item.name, brand: item.brand };

            return i;
          });

          this.showItemsForOrder = order.id;
        },
        (err) => {
          console.log("products#err =-----> ", err);
        }
      );
  }

  onShowAllItems(order: IOrder) {
    this.getOrderItemsDetails(order);
  }

  onAddToCart(item: IOrderItem) {
    this.dispatch(actions.addToCartRquest());
    this.http.post("/users/shopping-cart/add", { data: item }).subscribe(
      (resp: any) => {
        this.dispatch(actions.addToCartSuccess(resp.body.data));
      },
      (error: any) => {
        this.dispatch(actions.addToCartFailure(error));
      }
    );
  }

  onPaginationChange(newConfig: IPaginationConfig) {
    const { itemsPerPage, currentPage } = newConfig;

    this.paginationConfig = {
      currentPage,
      itemsPerPage,
      totalPages: Math.ceil(this.totalOrders.length / itemsPerPage),
    };

    this.orders = _.slice(
      this.totalOrders,
      itemsPerPage * currentPage,
      itemsPerPage * currentPage + itemsPerPage
    );
  }
}
