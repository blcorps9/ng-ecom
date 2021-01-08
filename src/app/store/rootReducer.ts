import { combineReducers } from "redux";

import { user } from "./reducers/user.reducer";
import { home } from "../pages/home/home.reducer";
import { common } from "./reducers/common.reducer";

export function rootReducer() {
  return combineReducers({
    user,
    home,
    common,
  });
}
