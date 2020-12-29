import * as actions from "./login.actions";

import type { IReduxAction } from "../../types/reduxTypes";

const initState = {
  data: null,
  error: null,
  isFetching: false,
};

export function login(state = initState, action: IReduxAction) {
  switch (action.type) {
    case actions.LOGIN_REQUEST:
      return { ...state, isFetching: true, data: null, error: null };
    case actions.LOGIN_SUCCESS:
      return { ...state, isFetching: false, data: action.payload };
    case actions.LOGIN_FAILURE:
      return { ...state, isFetching: false, error: action.error };
    default:
      return state;
  }
}
