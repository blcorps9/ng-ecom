import * as actions from "./register.actions";

import type { IReduxAction } from "../../types/reduxTypes";

const initState = {
  data: null,
  error: null,
  isFetching: false,
};

export function register(state = initState, action: IReduxAction) {
  switch (action.type) {
    case actions.GET_COMMENTS_REQUEST:
      return { ...state, isFetching: true, data: null, error: null };
    case actions.GET_COMMENTS_SUCCESS:
      return { ...state, isFetching: false, data: action.payload };
    case actions.GET_COMMENTS_FAILURE:
      return { ...state, isFetching: false, error: action.error };
    default:
      return state;
  }
}
