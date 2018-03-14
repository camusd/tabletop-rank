import { combineReducers } from "redux";
import auth from "./auth";
import user from "./user";
import ui from "./ui";

export default combineReducers({
  auth,
  user,
  ui
});
