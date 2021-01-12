import * as _ from "lodash";

import * as actions from "../actions/user.actions";
import type { IReduxAction } from "../../types";
import { ROUTE_CHANGE } from "../actions/common.actions";

const initState = {
  profile: {},
  cartCount: 0,
  cart: {},
  cards: [],
  orders: [],
  favList: {},
  addresses: [],

  lastOrder: {},
  checkoutData: {}, // { cardId, addressId }

  error: null,
  isFetching: false,
  isLoggedIn: false,
};

export function user(state = initState, action: IReduxAction) {
  switch (action.type) {
    case ROUTE_CHANGE:
      return {
        ...state,
        error: null,
      };
    case actions.USER_LOGIN_REQUEST:
      return { ...state, isFetching: true, error: null };
    case actions.USER_LOGIN_SUCCESS:
      return {
        ...state,
        error: null,
        isFetching: false,
        isLoggedIn: true,
        profile: action.payload,
      };
    case actions.USER_LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        isLoggedIn: false,
        error: action.error,
      };

    case actions.USER_LOGOUT_REQUEST:
      return { ...state, isFetching: true, error: null };
    case actions.USER_LOGOUT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isLoggedIn: false,
        profile: {},
        cartCount: 0,
        cart: {},
        cards: [],
        orders: [],
        favList: {},
        addresses: [],
        error: null,
      };
    case actions.USER_LOGOUT_FAILURE:
      return {
        ...state,
        isFetching: false,
        isLoggedIn: false,
        error: action.error,
      };

    case actions.USER_REGISTER_REQUEST:
      return { ...state, isFetching: true, error: null };
    case actions.USER_REGISTER_SUCCESS:
      return {
        ...state,
        error: null,
        isFetching: false,
        isLoggedIn: true,
        profile: action.payload,
      };
    case actions.USER_REGISTER_FAILURE:
      return {
        ...state,
        isFetching: false,
        isLoggedIn: false,
        error: action.error,
      };

    case actions.GET_DASHBOARD_REQUEST:
      return {
        ...state,
        error: null,
        isFetching: true,
      };
    case actions.GET_DASHBOARD_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isLoggedIn: true,
        isFetching: false,
      };
    case actions.GET_DASHBOARD_FAILURE:
      return {
        ...state,
        isLoggedIn: false,
        isFetching: false,
        // error: action.error, TODO: DONOT store the error as this is visible even w/o any user actions
      };

    case actions.ADD_TO_CART_REQUEST:
      return {
        ...state,
        error: null,
        isFetching: true,
      };
    case actions.ADD_TO_CART_FAILURE:
      return {
        ...state,
        isFetching: true,
        error: action.error,
      };
    case actions.ADD_TO_CART_SUCCESS: {
      const cartCount = action.payload.items.reduce((p: number, c: any) => {
        return p + Number(c.quantity || 0);
      }, 0);

      return {
        ...state,
        cartCount,
        isFetching: true,
        cart: action.payload,
      };
    }

    case actions.REMOVE_FROM_CART_REQUEST:
      return {
        ...state,
        error: null,
        isFetching: true,
      };
    case actions.REMOVE_FROM_CART_SUCCESS:
      const cartCount = action.payload.items.reduce((p: number, c: any) => {
        return p + Number(c.quantity || 0);
      }, 0);

      return {
        ...state,
        cartCount,
        isFetching: true,
        cart: action.payload,
      };

    case actions.REMOVE_FROM_CART_FAILURE:
      return {
        ...state,
        isFetching: true,
        error: action.error,
      };

    case actions.ADD_ITEM_TO_FAV_LIST_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case actions.ADD_ITEM_TO_FAV_LIST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
        favList: action.payload,
      };
    case actions.ADD_ITEM_TO_FAV_LIST_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };

    case actions.REMOVE_ITEM_FROM_FAV_LIST_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case actions.REMOVE_ITEM_FROM_FAV_LIST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
        favList: action.payload,
      };
    case actions.REMOVE_ITEM_FROM_FAV_LIST_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };

    case actions.SAVE_ADDRESS_REQUEST:
      return { ...state, isFetching: true };
    case actions.SAVE_ADDRESS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        addresses: [...state.addresses, action.payload],
      };
    case actions.SAVE_ADDRESS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };

    case actions.UPDATE_ADDRESS_REQUEST:
      return { ...state, isFetching: true };
    case actions.UPDATE_ADDRESS_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        addresses: _.map(state.addresses, (addr: any) => {
          if (addr.id === action.payload.id) {
            return action.payload;
          }

          return addr;
        }),
      };
    }
    case actions.UPDATE_ADDRESS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };

    case actions.DELETE_ADDRESS_REQUEST:
      return { ...state, isFetching: true };
    case actions.DELETE_ADDRESS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        addresses: _.filter(state.addresses, ({ id }) => id !== action.payload),
      };
    case actions.DELETE_ADDRESS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    default:
      return state;
  }
}
