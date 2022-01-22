import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";

import main from "./modules/main";
import User from "./modules/user";
import Sale from "./modules/sale";
import Image from "./modules/image";


export const history = createBrowserHistory();

const rootReducer = combineReducers({ 
    main: main,
    user: User,
    sale:Sale,
    image:Image,

    router: connectRouter(history),
});

const middlewares = [thunk.withExtraArgument({ history: history })];


const env = process.env.NODE_ENV;

if (env === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      })
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middlewares));

let store = (initialStore) => createStore(rootReducer, enhancer);

export default store();