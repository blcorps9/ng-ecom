import { ReduxConnectService } from "../../services/redux-connect/redux-connect.service";

// TODO: JS older-way of creating read-only properties.
export interface IReduxConnect {
  appStore: any;
  dispatch: any;
  unsubscribe: any;
}

export function ReduxConnect(
  fn: (state: any) => Object,
  dispatchToProps?: { [actionCreater: string]: (...args: any) => void }
) {
  return function connect(constructor: Function): any {
    const oNgOnInit = constructor.prototype.ngOnInit;
    const oNgOnDestroy = constructor.prototype.ngOnDestroy;

    constructor.prototype.ngOnInit = function (this: any) {
      this.appStore = ReduxConnectService.getService();
      this.dispatch = this.appStore.dispatch;

      if (fn) {
        const states: any = fn(this.appStore.getState());

        for (const state in states) {
          this[state] = states[state];
        }
      }

      // if (dispatchToProps) {
      //   this.props = {};

      //   for (const dispatcher in dispatchToProps) {
      //     this.props[dispatcher] = (...args: any) => {
      //       const actionCreater = dispatchToProps[dispatcher];

      //       this.dispatch(actionCreater(...args));
      //     };
      //   }
      // }

      this.unsubscribe = this.appStore.subscribe(() => {
        if (fn) {
          const states: any = fn(this.appStore.getState());

          for (const state in states) {
            this[state] = states[state];
          }
        }
      });

      if (oNgOnInit) oNgOnInit.call(this);
    };

    constructor.prototype.ngOnDestroy = function (this: any) {
      this.unsubscribe();

      if (oNgOnDestroy) oNgOnDestroy.call(this);
    };

    return constructor;
  };
}
