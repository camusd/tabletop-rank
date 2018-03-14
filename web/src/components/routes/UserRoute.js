import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { userDataRequested } from "../../actions/user";
import {
  isAuthenticatedSelector,
  isUserDataFetchedSelector
} from "../../selectors";

class UserRoute extends React.Component {
  async componentDidMount() {
    const { isAuthenticated, isUserDataFetched } = this.props;
    if (isAuthenticated && !isUserDataFetched) {
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
  isUserDataFetched: PropTypes.bool.isRequired,
  getUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: isAuthenticatedSelector(state),
  isUserDataFetched: isUserDataFetchedSelector(state)
});

export default connect(mapStateToProps, { getUser: userDataRequested })(
  UserRoute
);
