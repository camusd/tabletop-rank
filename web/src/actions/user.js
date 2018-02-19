import {
  CALL_API,
  USER_DATA_FETCHED,
  USER_DATA_FETCH_FAILED,
  USER_CREATION_FAILED,
  USER_CREATED
} from "../types";

export const userDataFetched = user => ({
  type: USER_DATA_FETCHED,
  user
});

export const userDataFetchFailed = error => ({
  type: USER_DATA_FETCH_FAILED,
  error
});

export const userCreated = user => ({
  type: USER_CREATED,
  user
});

export const userCreationFailed = error => ({
  type: USER_CREATION_FAILED,
  error
});

export const signup = data => async dispatch =>
  dispatch({
    type: CALL_API,
    url: "/api/user",
    method: "post",
    data,
    onSuccess: userCreated,
    onError: userCreationFailed
  });

export const getUser = () => async dispatch =>
  dispatch({
    type: CALL_API,
    url: "/api/user",
    method: "get",
    onSuccess: userDataFetched,
    onError: userDataFetchFailed
  });
