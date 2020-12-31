import { IAppStore, IReduxAction } from "../types";

export default function logger(store: IAppStore) {
  return (next: Function) => (action: IReduxAction) => {
    const prevState = store.getState();
    next(action);
    const nextState = store.getState();

    console.groupCollapsed(`[REDUX] [Action] ${action.type}`);
    console.log("[REDUX] [PrevState] ", prevState);
    console.log("[REDUX] [Action] ", action);
    console.log("[REDUX] [NextState] ", nextState);
    console.groupEnd();
  };
}
