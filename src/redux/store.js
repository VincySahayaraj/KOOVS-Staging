import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
// import {persistStore} from 'redux-persist'
import rootReducer from "./rootReducer";

// to turn off logging redux remove logger from middleware
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(logger))
);
// const persistor = persistStore(store)
export { store };
