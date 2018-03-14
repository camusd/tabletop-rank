import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import LoginForm from "../forms/LoginForm";
import { userLoginAttempted } from "../../actions/auth";
import { loadingSelector, authErrorSelector } from "../../selectors";

const LoginPage = ({ login, history, error, loading }) => {
  const submit = credentials => {
    const redirect = () => history.push("/dashboard");
    login({ credentials, redirect });
  };
  return (
    <div>
      <h1>Login Page</h1>
      <LoginForm submit={submit} error={error} loading={loading} />
    </div>
  );
};

LoginPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  login: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.shape({
    message: PropTypes.string,
    subErrors: PropTypes.arrayOf(
      PropTypes.shape({
        obj: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired
      })
    )
  })
};

LoginPage.defaultProps = {
  error: {}
};

const mapStateToProps = state => ({
  error: authErrorSelector(state),
  loading: loadingSelector(state)
});

export default connect(mapStateToProps, { login: userLoginAttempted })(
  LoginPage
);
