import _ from "lodash/fp";
import { CALL_API } from "../types";
import { tokenStored } from "../actions/auth";

export default axios => ({ getState, dispatch }) => next => action => {
  if (action.type !== CALL_API) {
    return next(action);
  }
  const { token } = getState().user;
  const { url, method, data, onSuccess, onError } = action;
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  return next(() =>
    axios({ url, method, headers, data }).then(
      response => {
        const { authorization } = response.headers;
        if (!token && authorization) {
          dispatch(tokenStored(_.last(_.split(" ", authorization))));
        }
        dispatch(onSuccess(response.data));
        return response.data;
      },
      error => {
        dispatch(onError(error.data));
        throw error;
      }
    )
  );
};
