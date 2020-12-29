import logger from "redux-logger";
import { createStore, applyMiddleware, compose } from "redux";

// import logger from "./logger.middleware";
import { rootReducer } from "./rootReducer";

const WINDOW: any = window;
const composeEnhancers = WINDOW.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares: any[] = [logger];

export function configureStore() {
  const store = createStore(
    rootReducer(),
    composeEnhancers(applyMiddleware(...middlewares))
  );

  return store;
}
