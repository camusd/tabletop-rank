import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const HomePage = ({ user }) => (
  <div>
    <h1>Home Page</h1>
    {user.id ? (
      <span>Welcome {user.firstName}!</span>
    ) : (
      <Link to="/login" href="/login">
        Login
      </Link>
    )}
  </div>
);

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(HomePage);
