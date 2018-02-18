import { userLoggedIn } from "./auth";
import api from "../api";

export const getUser = () => dispatch =>
  api.user.getDetail().then(user => dispatch(userLoggedIn(user)));

export const signup = data => dispatch =>
  api.user.signup(data).then(user => dispatch(userLoggedIn(user)));
