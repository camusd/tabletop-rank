import { USER_LOGGED_IN, TOKEN_STORED, USER_LOGGED_OUT } from "../types";

export default function user(state = {}, action = {}) {
  switch (action.type) {
    case TOKEN_STORED:
      return { ...state, token: action.token };
    case USER_LOGGED_IN:
      return { ...state, ...action.user };
    case USER_LOGGED_OUT:
      return {};
    default:
      return state;
  }
}
