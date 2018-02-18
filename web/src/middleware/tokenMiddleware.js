import { getUser } from "../actions/user";

export default store => next => action => {
  const previousToken = store.getState().user.token;
  next(action);
  const nextToken = store.getState().user.token;
  if (nextToken && nextToken !== previousToken) {
    localStorage.setItem("tabletoprankJWT", nextToken);
    store.dispatch(getUser());
  }
};
