import { call, put, takeEvery } from "redux-saga/effects";
import api from "../api";
import {
  userDataRetrieved,
  userDataRetrievalFailed,
  userCreated,
  userCreationFailed
} from "../actions/user";
import { USER_DATA_REQUESTED, USER_CREATION_INITIATED } from "../types";
import { userLoggedIn } from "../actions/auth";
import { loadingStarted, loadingStopped } from "../actions/ui";

export function* getUser() {
  try {
    yield put(loadingStarted());
    const user = yield call(api.user.getDetail);
    yield put(userDataRetrieved({ user }));
  } catch (error) {
    yield put(userDataRetrievalFailed({ error: error.response.data }));
  } finally {
    yield put(loadingStopped());
  }
}

export function* watchGetUser() {
  yield takeEvery(USER_DATA_REQUESTED, getUser);
}

export function* signup({ data, redirect }) {
  const { email, password } = data;
  try {
    yield put(loadingStarted());
    const user = yield call(api.user.signup, data);
    yield put(userCreated({ user }));
    const token = yield call(api.auth.login, { email, password });
    yield put(userLoggedIn({ token }));
    redirect();
  } catch (error) {
    yield put(userCreationFailed({ error: error.response.data }));
  } finally {
    yield put(loadingStopped());
  }
}

export function* watchSignup() {
  yield takeEvery(USER_CREATION_INITIATED, signup);
}
