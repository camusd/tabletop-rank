import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const HomePage = ({ isAuthenticated }) => (
  <div>
    <h1>Home Page</h1>
    {isAuthenticated ? (
      <button>Logout</button>
    ) : (
      <Link to="/login" href="/login">
        Login
      </Link>
    )}
  </div>
);

HomePage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: !!state.user.token
});

export default connect(mapStateToProps)(HomePage);
