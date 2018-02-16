import { USER_LOGGED_IN, TOKEN_STORED } from "../types";

export default function user(state = {}, action = {}) {
  switch (action.type) {
    case USER_LOGGED_IN:
      return { ...state, ...action.user };
    case TOKEN_STORED:
      return { ...state, token: action.token };
    default:
      return state;
  }
}
