import * as actions from "../actions/common.actions";

import type { IReduxAction } from "../../types";

const initState = {
  spinner: false,
};

export function common(state = initState, action: IReduxAction) {
  switch (action.type) {
    case actions.SHOW_LOADER:
      return { ...state, spinner: true };
    case actions.HIDE_LOADER:
      return { ...state, spinner: false };
    default:
      return state;
  }
}
