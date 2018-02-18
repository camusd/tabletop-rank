import { USER_LOGGED_IN, TOKEN_STORED, USER_LOGGED_OUT } from "../types";
import { getUser } from "./user";
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

export const login = credentials => dispatch =>
  api.user
    .login(credentials)
    .then(res => {
      const token = res.headers.authorization.split(" ")[1];
      dispatch(tokenStored(token));
    })
    .then(() => dispatch(getUser()));

export const logout = () => dispatch => {
  api.user.logout();
  localStorage.removeItem("tabletoprankJWT");
  dispatch(userLoggedOut());
};
