import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { logout } from "../../../store/actions";

const Logout = (props) => {
  useEffect(() => {
    props.onLogout();
  });

  return (
    <div>
      {" "}
      <Redirect to="/" />
    </div>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(logout()),
  };
};
export default connect(null, mapDispatchToProps)(Logout);
