import {
  USER_DATA_RETRIEVED,
  USER_CREATED,
  USER_DATA_RETRIEVAL_FAILED,
  USER_CREATION_FAILED
} from "../types";

export default (state = { data: {}, error: {} }, action = {}) => {
  switch (action.type) {
    case USER_DATA_RETRIEVED:
      return { ...state, data: action.user };
    case USER_DATA_RETRIEVAL_FAILED:
      return {
        ...state,
        error: action.error
      };
    case USER_CREATED:
      return { ...state, data: action.user };
    case USER_CREATION_FAILED:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};
