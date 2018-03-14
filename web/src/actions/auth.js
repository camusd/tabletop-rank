import {
  USER_LOGGED_IN,
  USER_LOGIN_FAILED,
  USER_LOGGED_OUT,
  USER_LOGIN_ATTEMPTED,
  USER_LOGOUT_ATTEMPTED
} from "../types";

export const userLoginAttempted = ({ credentials, redirect }) => ({
  type: USER_LOGIN_ATTEMPTED,
  credentials,
  redirect
});

export const userLoggedIn = ({ token }) => ({
  type: USER_LOGGED_IN,
  token
});

export const userLoginFailed = ({ error }) => ({
  type: USER_LOGIN_FAILED,
  error
});

export const userLogoutAttempted = () => ({
  type: USER_LOGOUT_ATTEMPTED
});

export const userLoggedOut = () => ({
  type: USER_LOGGED_OUT
});
