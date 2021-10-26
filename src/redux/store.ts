import thunk from "redux-thunk";
import reducer from "./reducer";

import { applyMiddleware, createStore } from "redux";
import { logger } from "./middleware";

import state from "./state";

export const middleware: any[] = [thunk, logger];

export const store = applyMiddleware(...middleware)(createStore)(reducer, state);

export default store;