import {enableBatching} from "redux-batched-actions"
import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import logger from "redux-logger"
import reducers from "../reducers"

const middleware = [
    process.env.APP_ENV !== 'production' && process.env.APP_ENV !== 'testing' && logger,
    thunk
].filter(Boolean);

const store = createStore(enableBatching(reducers), applyMiddleware(...middleware));

export default store;
