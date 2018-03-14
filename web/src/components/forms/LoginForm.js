import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash/fp";
import { Form, Button, Message } from "semantic-ui-react";
import isEmail from "validator/lib/isEmail";
import InlineError from "../messages/InlineError";

class LoginForm extends Component {
  state = {
    data: {
      email: "",
      password: ""
    },
    formErrors: {}
  };

  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onSubmit = () => {
    const { submit } = this.props;
    const { data } = this.state;
    const formErrors = this.validate(data);
    this.setState({ formErrors });
    if (_.isEmpty(formErrors)) {
      this.setState({ loading: true });
      submit(data);
    }
  };

  validate = data => {
    const formErrors = {};
    if (!isEmail(data.email)) {
      formErrors.email = "Invalid email";
    }
    if (!data.password) {
      formErrors.password = "Password is required";
    }
    return formErrors;
  };

  render() {
    const { error, loading } = this.props;
    const { data, formErrors } = this.state;
    return (
      <Form onSubmit={this.onSubmit} loading={loading}>
        {error.message && (
          <Message negative>
            <Message.Header>Something went wrong</Message.Header>
            <p>{error.message}</p>
          </Message>
        )}
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
        <Button primary>Login</Button>
      </Form>
    );
  }
}

LoginForm.propTypes = {
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

LoginForm.defaultProps = {
  error: {}
};

export default LoginForm;
