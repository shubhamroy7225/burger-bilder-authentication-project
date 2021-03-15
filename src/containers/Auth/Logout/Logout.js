import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { logout } from "../../../store/actions";

class Logout extends Component {
  componentDidMount() {
    this.props.onLogout();
  }
  render() {
    return (<div>  <Redirect to="/" /></div>)
  
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(logout()),
  };
};
export default connect(null, mapDispatchToProps)(Logout);
