import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ConfirmEmailMessage from "../messages/ConfirmEmailMessage";
import LogoutButton from "../buttons/LogoutButton";
import { isConfirmedSelector } from "../../selectors";

const DashboardPage = ({ isConfirmed }) => (
  <div>
    {!isConfirmed && <ConfirmEmailMessage />}
    <LogoutButton />
  </div>
);

DashboardPage.propTypes = {
  isConfirmed: PropTypes.bool
};

DashboardPage.defaultProps = {
  isConfirmed: true
};

const mapStateToProps = state => ({
  isConfirmed: isConfirmedSelector(state)
});

export default connect(mapStateToProps)(DashboardPage);
