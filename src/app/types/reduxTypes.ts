import { Observable } from "rxjs";

export type IReduxAction = {
  type: string;
  payload?: any;
  error?: any;
};

export type IUnsubscribe = {
  (): void;
};

export type IAppStore = {
  dispatch: Function;
  getState: Function;
  subscribe: (observer: any) => Observable<any>;
};
