import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SignupForm from "../forms/SignupForm";
import { signup } from "../../actions/user";
import { login } from "../../actions/auth";

class SignupPage extends Component {
  submit = async data => {
    const { email, password } = data;
    await this.props.signup(data);
    await this.props.login({ email, password });
    this.props.history.push("/dashboard");
  };

  render() {
    return (
      <div>
        <SignupForm submit={this.submit} />
      </div>
    );
  }
}

SignupPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  signup: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired
};

export default connect(null, { signup, login })(SignupPage);
