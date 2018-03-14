import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { userLogoutAttempted } from "../../actions/auth";

const LogoutButton = ({ logout }) => (
  <button onClick={() => logout()}> Logout </button>
);

LogoutButton.propTypes = {
  logout: PropTypes.func.isRequired
};

export default connect(null, {
  logout: userLogoutAttempted
})(LogoutButton);
