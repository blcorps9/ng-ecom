export const GET_PRODUCTS_REQUEST = "GET_PRODUCTS_REQUEST";
export const GET_PRODUCTS_SUCCESS = "GET_PRODUCTS_SUCCESS";
export const GET_PRODUCTS_FAILURE = "GET_PRODUCTS_FAILURE";

export function getProductRequest() {
  return { type: GET_PRODUCTS_REQUEST };
}
export function getProductSuccess(payload: any) {
  return { type: GET_PRODUCTS_SUCCESS, payload };
}
export function getProductFailure(error: any) {
  return { type: GET_PRODUCTS_FAILURE, error };
}
