import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash/fp";
import { Form, Button } from "semantic-ui-react";
import isEmail from "validator/lib/isEmail";
import InlineError from "../messages/InlineError";

class SignupForm extends Component {
  state = {
    data: {
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    },
    formErrors: {}
  };

  onSubmit = e => {
    e.preventDefault();
    const { submit } = this.props;
    const { data } = this.state;
    const formErrors = this.validate(data);
    this.setState({ formErrors });
    if (_.isEmpty(formErrors)) {
      submit(data);
    }
  };

  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  validate = data => {
    const formErrors = {};
    if (!data.firstName) {
      formErrors.firstName = "Field is required";
    }
    if (!data.lastName) {
      formErrors.lastName = "Field is requried";
    }
    if (!isEmail(data.email)) {
      formErrors.email = "Invalid email";
    }
    if (!data.password) {
      formErrors.password = "Field is required";
    }
    return formErrors;
  };

  render() {
    const { error, loading } = this.props;
    const { data, formErrors } = this.state;
    const emailExists =
      error.subErrors && _.find(err => err.obj === "email", error.subErrors);
    return (
      <Form onSubmit={this.onSubmit} loading={loading}>
        <Form.Field error={!!formErrors.firstName}>
          <label htmlFor="firstName">
            First Name
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={data.firstName}
              onChange={this.onChange}
            />
          </label>
          {formErrors.firstName && <InlineError text={formErrors.firstName} />}
        </Form.Field>
        <Form.Field error={!!formErrors.lastName}>
          <label htmlFor="lastName">
            Last Name
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={data.lastName}
              onChange={this.onChange}
            />
          </label>
          {formErrors.lastName && <InlineError text={formErrors.lastName} />}
        </Form.Field>
        <Form.Field error={!!formErrors.email}>
          <label htmlFor="email">
            Email
            <input
              type="email"
              id="email"
              name="email"
              placeholder="example@example.com"
              value={data.email}
              onChange={this.onChange}
            />
          </label>
          {emailExists && <InlineError text={emailExists.message} />}
          {formErrors.email && <InlineError text={formErrors.email} />}
        </Form.Field>
        <Form.Field error={!!formErrors.password}>
          <label htmlFor="password">
            Password
            <input
              type="password"
              id="password"
              name="password"
              value={data.password}
              onChange={this.onChange}
            />
          </label>
          {formErrors.password && <InlineError text={formErrors.password} />}
        </Form.Field>
        <Button primary>Sign Up</Button>
      </Form>
    );
  }
}

SignupForm.propTypes = {
  submit: PropTypes.func.isRequired,
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

SignupForm.defaultProps = {
  error: {}
};

export default SignupForm;
