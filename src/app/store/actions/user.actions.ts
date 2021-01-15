export const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAILURE = "USER_LOGIN_FAILURE";

export const USER_LOGOUT_REQUEST = "USER_LOGOUT_REQUEST";
export const USER_LOGOUT_SUCCESS = "USER_LOGOUT_SUCCESS";
export const USER_LOGOUT_FAILURE = "USER_LOGOUT_FAILURE";

export const USER_REGISTER_REQUEST = "USER_REGISTER_REQUEST";
export const USER_REGISTER_SUCCESS = "USER_REGISTER_SUCCESS";
export const USER_REGISTER_FAILURE = "USER_REGISTER_FAILURE";

export const GET_DASHBOARD_REQUEST = "GET_DASHBOARD_REQUEST";
export const GET_DASHBOARD_SUCCESS = "GET_DASHBOARD_SUCCESS";
export const GET_DASHBOARD_FAILURE = "GET_DASHBOARD_FAILURE";

export const ADD_TO_CART_REQUEST = "ADD_TO_CART_REQUEST";
export const ADD_TO_CART_SUCCESS = "ADD_TO_CART_SUCCESS";
export const ADD_TO_CART_FAILURE = "ADD_TO_CART_FAILURE";

export const REMOVE_FROM_CART_REQUEST = "REMOVE_FROM_CART_REQUEST";
export const REMOVE_FROM_CART_SUCCESS = "REMOVE_FROM_CART_SUCCESS";
export const REMOVE_FROM_CART_FAILURE = "REMOVE_FROM_CART_FAILURE";

export const ADD_ITEM_TO_FAV_LIST_REQUEST = "ADD_ITEM_TO_FAV_LIST_REQUEST";
export const ADD_ITEM_TO_FAV_LIST_SUCCESS = "ADD_ITEM_TO_FAV_LIST_SUCCESS";
export const ADD_ITEM_TO_FAV_LIST_FAILURE = "ADD_ITEM_TO_FAV_LIST_FAILURE";

export const REMOVE_ITEM_FROM_FAV_LIST_REQUEST =
  "REMOVE_ITEM_FROM_FAV_LIST_REQUEST";
export const REMOVE_ITEM_FROM_FAV_LIST_SUCCESS =
  "REMOVE_ITEM_FROM_FAV_LIST_SUCCESS";
export const REMOVE_ITEM_FROM_FAV_LIST_FAILURE =
  "REMOVE_ITEM_FROM_FAV_LIST_FAILURE";

export const SAVE_ADDRESS_REQUEST = "SAVE_ADDRESS_REQUEST";
export const SAVE_ADDRESS_SUCCESS = "SAVE_ADDRESS_SUCCESS";
export const SAVE_ADDRESS_FAILURE = "SAVE_ADDRESS_FAILURE";

export const UPDATE_ADDRESS_REQUEST = "UPDATE_ADDRESS_REQUEST";
export const UPDATE_ADDRESS_SUCCESS = "UPDATE_ADDRESS_SUCCESS";
export const UPDATE_ADDRESS_FAILURE = "UPDATE_ADDRESS_FAILURE";

export const DELETE_ADDRESS_REQUEST = "DELETE_ADDRESS_REQUEST";
export const DELETE_ADDRESS_SUCCESS = "DELETE_ADDRESS_SUCCESS";
export const DELETE_ADDRESS_FAILURE = "DELETE_ADDRESS_FAILURE";

export const SAVE_CHECKOUT_DATA = "SAVE_CHECKOUT_DATA";

export const SAVE_CARDS_REQUEST = "SAVE_CARDS_REQUEST";
export const SAVE_CARDS_SUCCESS = "SAVE_CARDS_SUCCESS";
export const SAVE_CARDS_FAILURE = "SAVE_CARDS_FAILURE";

export const DELETE_CARD_REQUEST = "DELETE_CARD_REQUEST";
export const DELETE_CARD_SUCCESS = "DELETE_CARD_SUCCESS";
export const DELETE_CARD_FAILURE = "DELETE_CARD_FAILURE";

export const UPDATE_CARD_REQUEST = "UPDATE_CARD_REQUEST";
export const UPDATE_CARD_SUCCESS = "UPDATE_CARD_SUCCESS";
export const UPDATE_CARD_FAILURE = "UPDATE_CARD_FAILURE";

export const PLACE_ORDER_REQUEST = "PLACE_ORDER_REQUEST";
export const PLACE_ORDER_SUCCESS = "PLACE_ORDER_SUCCESS";
export const PLACE_ORDER_FAILURE = "PLACE_ORDER_FAILURE";

export function userLoginRequest() {
  return { type: USER_LOGIN_REQUEST };
}
export function userLoginSuccess(payload: any) {
  return { type: USER_LOGIN_SUCCESS, payload };
}
export function userLoginFailure(error: any) {
  return { type: USER_LOGIN_FAILURE, error };
}

export function userLogoutRequest() {
  return { type: USER_LOGOUT_REQUEST };
}
export function userLogoutSuccess() {
  return { type: USER_LOGOUT_SUCCESS };
}
export function userLogoutFailure(error: any) {
  return { type: USER_LOGOUT_FAILURE, error };
}

export function userRegisterRequest() {
  return { type: USER_REGISTER_REQUEST };
}
export function userRegisterSuccess(payload: any) {
  return { type: USER_REGISTER_SUCCESS, payload };
}
export function userRegisterFailure(error: any) {
  return { type: USER_REGISTER_FAILURE, error };
}

export function getDashboardRequest() {
  return { type: GET_DASHBOARD_REQUEST };
}
export function getDashboardSuccess(payload: any) {
  return { type: GET_DASHBOARD_SUCCESS, payload };
}
export function getDashboardFailure(error: any) {
  return { type: GET_DASHBOARD_FAILURE, error };
}

export function addToCartRquest() {
  return { type: ADD_TO_CART_REQUEST };
}

export function addToCartSuccess(payload: any) {
  return { type: ADD_TO_CART_SUCCESS, payload };
}
export function addToCartFailure(error: any) {
  return { type: ADD_TO_CART_FAILURE, error };
}

export function removeFromCartRquest() {
  return { type: REMOVE_FROM_CART_REQUEST };
}

export function removeFromCartSuccess(payload: any) {
  return { type: REMOVE_FROM_CART_SUCCESS, payload };
}
export function removeFromCartFailure(error: any) {
  return { type: REMOVE_FROM_CART_FAILURE, error };
}

export function addToFavRequest() {
  return { type: ADD_ITEM_TO_FAV_LIST_REQUEST };
}
export function addToFavSuccess(payload: any) {
  return { type: ADD_ITEM_TO_FAV_LIST_SUCCESS, payload };
}
export function addToFavFailure(error: any) {
  return { type: ADD_ITEM_TO_FAV_LIST_FAILURE, error };
}

export function removeFromFavRequest() {
  return { type: REMOVE_ITEM_FROM_FAV_LIST_REQUEST };
}
export function removeFromFavSuccess(payload: any) {
  return { type: REMOVE_ITEM_FROM_FAV_LIST_SUCCESS, payload };
}
export function removeFromFavFailure(error: any) {
  return { type: REMOVE_ITEM_FROM_FAV_LIST_FAILURE, error };
}

export function saveAddressRequest() {
  return { type: SAVE_ADDRESS_REQUEST };
}
export function saveAddressSuccess(payload: any) {
  return { type: SAVE_ADDRESS_SUCCESS, payload };
}
export function saveAddressFailure(error: any) {
  return { type: SAVE_ADDRESS_FAILURE, error };
}

export function updateAddressRequest() {
  return { type: UPDATE_ADDRESS_REQUEST };
}
export function updateAddressSuccess(payload: any) {
  return { type: UPDATE_ADDRESS_SUCCESS, payload };
}
export function updateAddressFailure(error: any) {
  return { type: UPDATE_ADDRESS_FAILURE, error };
}

export function deleteAddressRequest() {
  return { type: DELETE_ADDRESS_REQUEST };
}
export function deleteAddressSuccess(payload: any) {
  return { type: DELETE_ADDRESS_SUCCESS, payload };
}
export function deleteAddressFailure(error: any) {
  return { type: DELETE_ADDRESS_FAILURE, error };
}

export function saveCheckoutData(payload: any) {
  return { type: SAVE_CHECKOUT_DATA, payload };
}

export function saveCardRequest() {
  return { type: SAVE_CARDS_REQUEST };
}
export function saveCardSuccess(payload: any) {
  return { type: SAVE_CARDS_SUCCESS, payload };
}
export function saveCardFailure(error: any) {
  return { type: SAVE_CARDS_FAILURE, error };
}

export function deleteCardRequest() {
  return { type: DELETE_CARD_REQUEST };
}
export function deleteCardSuccess(payload: any) {
  return { type: DELETE_CARD_SUCCESS, payload };
}
export function deleteCardFailure(error: any) {
  return { type: DELETE_CARD_FAILURE, error };
}

export function updateCardRequest() {
  return { type: UPDATE_CARD_REQUEST };
}
export function updateCardSuccess(payload: any) {
  return { type: UPDATE_CARD_SUCCESS, payload };
}
export function updateCardFailure(error: any) {
  return { type: UPDATE_CARD_FAILURE, error };
}

export function placeOrderRequest() {
  return { type: PLACE_ORDER_REQUEST };
}
export function placeOrderSuccess(payload: any) {
  return { type: PLACE_ORDER_SUCCESS, payload };
}
export function placeOrderFailure(error: any) {
  return { type: PLACE_ORDER_FAILURE, error };
}
