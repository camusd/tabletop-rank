import _ from "lodash/fp";
import { USER_LOGGED_IN, TOKEN_STORED, USER_LOGGED_OUT } from "../types";
import api from "../api";

export const tokenStored = token => ({
  type: TOKEN_STORED,
  token
});

export const userLoggedIn = user => ({
  type: USER_LOGGED_IN,
  user
});

export const userLoggedOut = () => ({
  type: USER_LOGGED_OUT
});

export const login = credentials => async dispatch => {
  const response = await api.user.login(credentials);
  const { headers: { authorization } } = response;
  const token = _.last(_.split(" ", authorization));
  dispatch(tokenStored(token));
};

export const logout = () => dispatch => {
  api.user.logout();
  localStorage.removeItem("tabletoprankJWT");
  dispatch(userLoggedOut());
};
