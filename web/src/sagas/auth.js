import { call, put, takeEvery } from "redux-saga/effects";
import api from "../api";
import { userLoggedIn, userLoginFailed, userLoggedOut } from "../actions/auth";
import { userDataRetrieved } from "../actions/user";
import { USER_LOGIN_ATTEMPTED, USER_LOGOUT_ATTEMPTED } from "../types";
import { loadingStarted, loadingStopped } from "../actions/ui";

export function* login({ credentials, redirect }) {
  try {
    yield put(loadingStarted());
    const token = yield call(api.auth.login, credentials);
    yield put(userLoggedIn({ token }));
    localStorage.setItem("tabletoprankJWT", token);
    const user = yield call(api.user.getDetail);
    yield put(userDataRetrieved({ user }));
    redirect();
  } catch (error) {
    yield put(userLoginFailed({ error: error.response.data }));
  } finally {
    yield put(loadingStopped());
  }
}

export function* watchLogin() {
  yield takeEvery(USER_LOGIN_ATTEMPTED, login);
}

export function* logout() {
  yield call(api.auth.logout);
  localStorage.removeItem("tabletoprankJWT");
  yield put(userLoggedOut());
}

export function* watchLogout() {
  yield takeEvery(USER_LOGOUT_ATTEMPTED, logout);
}
