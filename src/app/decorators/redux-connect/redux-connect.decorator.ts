import { ReduxConnectService } from "../../services/redux-connect/redux-connect.service";

export interface IReduxConnect {
  appStore: any;
  dispatch: any;
  unsubscribe: any;
}

export function ReduxConnect(
  fn?: (state: any) => Object,
  dispatchToProps?: { [actionCreater: string]: (...args: any) => void }
) {
  return function connect(constructor: Function): any {
    const oNgOnInit = constructor.prototype.ngOnInit;
    const oNgOnDestroy = constructor.prototype.ngOnDestroy;

    constructor.prototype.ngOnInit = function (this: any) {
      Object.defineProperty(this, "appStore", {
        writable: false,
        enumerable: false,
        configurable: false,
        value: ReduxConnectService.getService(),
      });

      if (fn) {
        const states: any = fn(this.appStore.getState());

        for (const state in states) {
          this[state] = states[state];
        }
      }

      Object.defineProperties(this, {
        dispatch: {
          writable: false,
          enumerable: false,
          configurable: false,
          value: this.appStore.dispatch,
        },
        unsubscribe: {
          writable: false,
          enumerable: false,
          configurable: false,
          value: this.appStore.subscribe(() => {
            if (fn) {
              const states: any = fn(this.appStore.getState());

              for (const state in states) {
                this[state] = states[state];
              }
            }
          }),
        },
      });

      // if (dispatchToProps) {
      //   this.props = {};

      //   for (const dispatcher in dispatchToProps) {
      //     this.props[dispatcher] = (...args: any) => {
      //       const actionCreater = dispatchToProps[dispatcher];

      //       this.dispatch(actionCreater(...args));
      //     };
      //   }
      // }

      if (oNgOnInit) oNgOnInit.call(this);
    };

    constructor.prototype.ngOnDestroy = function (this: any) {
      this.unsubscribe();

      if (oNgOnDestroy) oNgOnDestroy.call(this);
    };

    return constructor;
  };
}
