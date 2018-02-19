import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import LoginForm from "../forms/LoginForm";
import { login } from "../../actions/auth";
import { getUser } from "../../actions/user";

class LoginPage extends Component {
  submit = async data => {
    await this.props.login(data);
    await this.props.getUser();
    this.props.history.push("/dashboard");
  };
  render() {
    return (
      <div>
        <h1>Login Page</h1>
        <LoginForm submit={this.submit} />
      </div>
    );
  }
}

LoginPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  login: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired
};

export default connect(null, { login, getUser })(LoginPage);
