import { userLoggedIn } from "./auth";
import api from "../api";

export const getUser = () => async dispatch => {
  const user = await api.user.getDetail();
  return dispatch(userLoggedIn(user));
};

export const signup = data => async dispatch => {
  const user = await api.user.signup(data);
  return dispatch(userLoggedIn(user));
};
