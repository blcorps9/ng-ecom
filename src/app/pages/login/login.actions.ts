export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export function loginRequest() {
  return { type: LOGIN_REQUEST };
}
export function loginSuccess(payload: any) {
  return { type: LOGIN_SUCCESS, payload };
}
export function loginFailure(error: any) {
  return { type: LOGIN_FAILURE, error };
}
