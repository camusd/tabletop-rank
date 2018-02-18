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
    loading: false,
    errors: {}
  };

  onSubmit = e => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (_.isEmpty(errors)) {
      this.setState({ loading: true });
      this.props
        .submit(this.state.data)
        .catch(err =>
          this.setState({ errors: err.response.data, loading: false })
        );
    }
  };

  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  validate = data => {
    const errors = {};
    if (!data.firstName) {
      errors.firstName = "Field is required";
    }
    if (!data.lastName) {
      errors.lastName = "Field is requried";
    }
    if (!isEmail(data.email)) {
      errors.email = "Invalid email";
    }
    if (!data.password) {
      errors.password = "Field is required";
    }
    return errors;
  };

  render() {
    const { data, loading, errors } = this.state;
    const emailExists =
      errors.subErrors &&
      _.find(errors.subErrors, error => error.obj === "email");

    return (
      <Form onSubmit={this.onSubmit} loading={loading}>
        <Form.Field error={!!errors.firstName}>
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
          {errors.firstName && <InlineError text={errors.firstName} />}
        </Form.Field>
        <Form.Field error={!!errors.lastName}>
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
          {errors.lastName && <InlineError text={errors.lastName} />}
        </Form.Field>
        <Form.Field error={!!errors.email}>
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
          {errors.email && <InlineError text={errors.email} />}
        </Form.Field>
        <Form.Field error={!!errors.password}>
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
          {errors.password && <InlineError text={errors.password} />}
        </Form.Field>
        <Button primary>Sign Up</Button>
      </Form>
    );
  }
}

SignupForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default SignupForm;
