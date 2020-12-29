export const GET_COMMENTS_REQUEST = "GET_COMMENTS_REQUEST";
export const GET_COMMENTS_SUCCESS = "GET_COMMENTS_SUCCESS";
export const GET_COMMENTS_FAILURE = "GET_COMMENTS_FAILURE";

export function getCommentsRequest() {
  return { type: GET_COMMENTS_REQUEST };
}
export function getCommentsSuccess(payload: any) {
  return { type: GET_COMMENTS_SUCCESS, payload };
}
export function getCommentsFailure(error: any) {
  return { type: GET_COMMENTS_FAILURE, error };
}
