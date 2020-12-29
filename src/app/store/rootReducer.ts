import { combineReducers } from "redux";

import { login } from "../pages/login/login.reducer";
import { register } from "../pages/register/register.reducer";

export function rootReducer() {
  return combineReducers({
    register,
    login,
  });
}
