export const ROUTE_CHANGE = "ROUTE_CHANGE";
export const SHOW_LOADER = "SHOW_LOADER";
export const HIDE_LOADER = "HIDE_LOADER";

export function onRouteChange() {
  return { type: ROUTE_CHANGE };
}

export function showLoader() {
  return { type: SHOW_LOADER };
}
export function hideLoader() {
  return { type: HIDE_LOADER };
}
