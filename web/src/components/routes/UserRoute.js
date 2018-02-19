import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { getUser } from "../../actions/user";

class UserRoute extends React.Component {
  async componentDidMount() {
    const { isAuthenticated, userDataFetched } = this.props;
    if (isAuthenticated && !userDataFetched) {
      await this.props.getUser();
    }
  }

  render() {
    const { isAuthenticated, component: Component, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
        }
      />
    );
  }
}

UserRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  userDataFetched: PropTypes.bool.isRequired,
  getUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: !!state.user.token,
  userDataFetched: !!state.user.id
});

export default connect(mapStateToProps, { getUser })(UserRoute);
