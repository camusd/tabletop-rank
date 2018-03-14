import { LOADING_STARTED, LOADING_STOPPED } from "../types";

export default (state = { loading: false }, action = {}) => {
  switch (action.type) {
    case LOADING_STARTED:
      return { ...state, loading: true };
    case LOADING_STOPPED:
      return { ...state, loading: false };
    default:
      return state;
  }
};
