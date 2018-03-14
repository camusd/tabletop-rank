import { all } from "redux-saga/effects";
import { watchLogin, watchLogout } from "./auth";
import { watchGetUser, watchSignup } from "./user";

export default function* rootSaga() {
  yield all([watchLogin(), watchLogout(), watchGetUser(), watchSignup()]);
}
