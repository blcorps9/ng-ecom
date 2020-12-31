import * as actions from "../actions/user.actions";
import type { IReduxAction } from "../../types";

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
    case actions.USER_LOGIN_REQUEST:
      return { ...state, isFetching: true };
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
      return { ...state, isFetching: true };
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
      return { ...state, isFetching: true };
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
    default:
      return state;
  }
}
