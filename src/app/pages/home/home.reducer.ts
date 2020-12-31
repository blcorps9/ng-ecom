import * as actions from "./home.actions";

import type { IReduxAction } from "../../types";
const initState = {
  data: [],
  error: null,
  isFetching: false,
};

export function home(state = initState, action: IReduxAction) {
  switch (action.type) {
    case actions.GET_PRODUCTS_REQUEST:
      return { ...state, isFetching: true };
    case actions.GET_PRODUCTS_SUCCESS:
      return { ...state, isFetching: false, data: action.payload };
    case actions.GET_PRODUCTS_FAILURE:
      return { ...state, isFetching: false, error: action.error };
    default:
      return state;
  }
}
