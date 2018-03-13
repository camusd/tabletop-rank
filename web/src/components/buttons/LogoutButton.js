import React from "react";
import {
  connect
} from "react-redux";
import PropTypes from "prop-types";
import {
  logout
} from "../../actions/auth";

const LogoutButton = props => ( <
  button onClick = {
    () => props.logout()
  } > Logout < /button>
);

LogoutButton.propTypes = {
  logout: PropTypes.func.isRequired
};

export default connect(null, {
  logout
})(LogoutButton);