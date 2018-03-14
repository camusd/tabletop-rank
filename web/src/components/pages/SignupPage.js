import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SignupForm from "../forms/SignupForm";
import { userCreationInitiated } from "../../actions/user";
import { userErrorSelector, loadingSelector } from "../../selectors";

const SignupPage = ({ signup, history, error, loading }) => {
  const submit = data => {
    const redirect = () => history.push("/dashboard");
    signup({ data, redirect });
  };

  return (
    <div>
      <SignupForm submit={submit} error={error} loading={loading} />
    </div>
  );
};

SignupPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  signup: PropTypes.func.isRequired,
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

SignupPage.defaultProps = {
  error: {}
};

const mapStateToProps = state => ({
  error: userErrorSelector(state),
  loading: loadingSelector(state)
});

export default connect(mapStateToProps, {
  signup: userCreationInitiated
})(SignupPage);
