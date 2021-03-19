import React, { useEffect, useState } from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import burgerLogo from "../../assets/images/burger-logo.png";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./Auth.css";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { updateObject, checkValidity } from "../../shared/utility";

const auth=(props)=>  {

    const [controls,setControls]=useState({
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Email",
        },
        value: "",
        validation: {
          required: true,
          isEmail: false,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Your Password",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    })
    const [isSignup,setIsSignup]=useState(true)

useEffect(()=>{
  if (!props.buildingBurger && props.authRedirectPath !== "/") {
    props.setAuthRedirectPath();
  }
})
   
  

  const inputChangedHandler = (event, controlName) => {
    const updateControls = updateObject(controls, {
      [controlName]: updateObject(controls[controlName], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
         controls[controlName].validation
        ),
        touched: true,
      }),
    });

    setControls(updateControls );
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onAuth(
      controls.email.value,
      controls.password.value,
      isSignup
    );
  };
  const switchAuthModeHandler = () => {
   return setIsSignup(!isSignup)
  };


    const formElementsArray = [];
    for (let key in controls) {
      formElementsArray.push({
        id: key,
        config: controls[key],
      });
    }
    let form = formElementsArray.map((formElement) => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        changed={(event) => inputChangedHandler(event, formElement.id)}
      />
    ));

    if (props.loading) {
      form = <Spinner />;
    }
    let errorMessage = null;
    if (props.error) {
      errorMessage = <p>{props.error.message}</p>;
    }
    let redirectAuth = null;
    if (props.isAuthenticated) {
      redirectAuth = <Redirect to={props.authRedirectPath} />;
    }
    return (
      <div className={classes.Auth}>
        {redirectAuth}
        {errorMessage}
        <form onSubmit={submitHandler}>
          <div className={classes.LoginLogo}>
            <img className={classes.img} src={burgerLogo} alt="MyBurger" />
          </div>
          {form}
          <Button btnType="Success">SUBMIT</Button>
        </form>
        <Button clicked={switchAuthModeHandler} btnType="Danger">
          SWITCH TO {isSignup ? "SIGNIN" : "SIGNUP"}
        </Button>
      </div>
    );
  
}
const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
    setAuthRedirectPath: () => dispatch(actions.setRedirectPath("/")),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(auth);
