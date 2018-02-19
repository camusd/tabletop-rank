import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import _ from "lodash/fp";
import axios from "axios";
import "semantic-ui-css/semantic.min.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import rootReducer from "./rootReducer";
import tokenMiddleware from "./middleware/tokenMiddleware";
import apiMiddleware from "./middleware/apiMiddleware";

const defaultState = {};
const token = localStorage.getItem("tabletoprankJWT");
const initialState = token
  ? _.set("user.token", token, defaultState)
  : defaultState;
const middlewares = applyMiddleware(
  apiMiddleware(axios),
  thunk,
  tokenMiddleware
);
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(middlewares)
);

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Route component={App} />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
registerServiceWorker();
