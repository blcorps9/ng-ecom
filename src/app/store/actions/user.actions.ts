export const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAILURE = "USER_LOGIN_FAILURE";

export const USER_LOGOUT_REQUEST = "USER_LOGOUT_REQUEST";
export const USER_LOGOUT_SUCCESS = "USER_LOGOUT_SUCCESS";
export const USER_LOGOUT_FAILURE = "USER_LOGOUT_FAILURE";

export const USER_REGISTER_REQUEST = "USER_REGISTER_REQUEST";
export const USER_REGISTER_SUCCESS = "USER_REGISTER_SUCCESS";
export const USER_REGISTER_FAILURE = "USER_REGISTER_FAILURE";

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
