import {
  USER_LOGGED_IN,
  USER_LOGIN_FAILED,
  TOKEN_STORED,
  USER_LOGGED_OUT,
  CALL_API
} from "../types";

export const tokenStored = token => ({
  type: TOKEN_STORED,
  token
});

export const userLoggedIn = () => ({
  type: USER_LOGGED_IN
});

export const userLoginFailed = error => ({
  type: USER_LOGIN_FAILED,
  error
});
export const userLoggedOut = () => ({
  type: USER_LOGGED_OUT
});

export const login = credentials => async dispatch =>
  dispatch({
    type: CALL_API,
    url: "/login",
    method: "post",
    data: credentials,
    onSuccess: userLoggedIn,
    onError: userLoginFailed
  });

export const logout = () => dispatch => {
  localStorage.removeItem("tabletoprankJWT");
  dispatch(userLoggedOut());
};
