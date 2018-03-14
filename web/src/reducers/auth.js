import { USER_LOGGED_IN, USER_LOGGED_OUT, USER_LOGIN_FAILED } from "../types";

export default (state = { token: "", error: {} }, action = {}) => {
  switch (action.type) {
    case USER_LOGGED_IN:
      return { ...state, token: action.token };
    case USER_LOGIN_FAILED:
      return {
        ...state,
        error: action.error
      };
    case USER_LOGGED_OUT:
      return {};
    default:
      return state;
  }
};
