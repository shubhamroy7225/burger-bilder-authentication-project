// import axios from "axios";
import * as actionTypes from "./actionTypes";
export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};
export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
  };
};
export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  // localStorage.removeItem("token");
  // localStorage.removeItem("expirationDate");
  // localStorage.removeItem("userId");
  return {
    // type: actionTypes.AUTH_LOGOUT,
    type: actionTypes.AUTH_INITIATE_LOGOUT,
  };
};
export const logoutSucceed = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  }
};

export const checkAuthTimeout = (expirationTime) => {
  // return (dispatch) => {
  //   setTimeout(() => {
  //     dispatch(logout());
  //   }, expirationTime * 1000);
  // };
  return{
    type:actionTypes.AUTH_CHECK_TIMEOUT,
    expirationTime:expirationTime*1000
  }
};
export const auth = (email, password, isSignup) => {
  return {
    type:actionTypes.AUTH_USER,
    email:email,
    password:password,
    isSignup:isSignup
  }
  // return (dispatch) => {
  //   dispatch(authStart());
  //   const authData = {
  //     email: email,
  //     password: password,
  //     returnSecureToken: true,
  //   };
  //   let url =
  //     "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAmGyTa7Hwr9TwE8TJR3oBSN9Rd65_3Ib0";
  //   if (!isSignup) {
  //     url =
  //       "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAmGyTa7Hwr9TwE8TJR3oBSN9Rd65_3Ib0";
  //   }
  //   axios
  //     .post(url, authData)
  //     .then((res) => {
  //       const expirationDate = new Date(
  //         new Date().getTime() + res.data.expiresIn * 1000
  //       );
  //       localStorage.setItem("token", res.data.idToken);
  //       localStorage.setItem("expirationDate", expirationDate);
  //       localStorage.setItem("userId", res.data.localId);
  //       dispatch(authSuccess(res.data.idToken, res.data.localId));
  //       dispatch(checkAuthTimeout(res.data.expiresIn));
  //     })
  //     .catch((error) => {
  //       dispatch(authFail(error.response.data.error));
  //     });
  // };
};
export const setRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
  };
};
export const authCheckState = () => {
  return{
    type:actionTypes.AUTH_CHECK_INITIATE_STATE
  }
  // return (dispatch) => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     dispatch(logout());
  //   } else {
  //     const expirationDate = new Date(localStorage.getItem("expirationDate"));
  //     if (expirationDate <= new Date()) {
  //       dispatch(logout());
  //     } else {
  //       const userId = localStorage.getItem("userId");
  //       dispatch(authSuccess(token, userId));
  //       dispatch(
  //         checkAuthTimeout(
  //           (expirationDate.getTime() - new Date().getTime()) / 1000
  //         )
  //       );
  //     }
  //   }
  // };
};
