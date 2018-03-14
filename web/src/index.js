import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import _ from "lodash/fp";
import "semantic-ui-css/semantic.min.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import rootReducer from "./reducers";
import rootSaga from "./sagas";

const defaultState = {};
const token = localStorage.getItem("tabletoprankJWT");
const initialState = token
  ? _.set("auth.token", token, defaultState)
  : defaultState;
const sagaMiddleware = createSagaMiddleware();
const middlewares = applyMiddleware(sagaMiddleware, thunkMiddleware);
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(middlewares)
);
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Route component={App} />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
registerServiceWorker();
