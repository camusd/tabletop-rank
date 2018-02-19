import {
  USER_DATA_FETCHED,
  TOKEN_STORED,
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
  USER_CREATED
} from "../types";

export default (state = {}, action = {}) => {
  switch (action.type) {
    case TOKEN_STORED:
      return { ...state, token: action.token };
    case USER_LOGGED_IN:
      return { ...state, ...action.user };
    case USER_LOGGED_OUT:
      return {};
    case USER_DATA_FETCHED:
      return { ...state, ...action.user };
    case USER_CREATED:
      return { ...state, ...action.user };
    default:
      return state;
  }
};
