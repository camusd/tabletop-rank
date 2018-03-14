import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { userLogoutAttempted } from "../../actions/auth";
import { isAuthenticatedSelector } from "../../selectors";

const HomePage = ({ isAuthenticated, logout }) => (
  <div>
    <h1>Home Page</h1>
    {isAuthenticated ? (
      <button onClick={() => logout()}>Logout</button>
    ) : (
      <div>
        <Link to="/login" href="/login">
          Login
        </Link>{" "}
        or{" "}
        <Link to="/signup" href="/signup">
          Sign Up
        </Link>
      </div>
    )}
  </div>
);

HomePage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: isAuthenticatedSelector(state)
});

export default connect(mapStateToProps, { logout: userLogoutAttempted })(
  HomePage
);
