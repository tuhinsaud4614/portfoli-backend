import React, { useState } from "react";
import classes from "./auth.module.css";
import validator from "validator";
import { RouteComponentProps } from "react-router-dom";
import RoutePathName from "../routePathName";

interface InputValidator {
  isMail?: boolean;
  minLength?: number;
  required: boolean;
}

interface AuthForm {
  [name: string]: {
    value: string;
    validator: InputValidator;
    touched: boolean;
    isValid: boolean;
  };
}

interface AuthState {
  authForm: AuthForm;
  error: null | { message: string };
  formIsValid: boolean;
}

const Auth: React.FC<RouteComponentProps> = ({ history }) => {
  const [authState, setAuthState] = useState<AuthState>({
    authForm: {
      email: {
        value: "",
        validator: {
          isMail: true,
          required: true,
        },
        touched: false,
        isValid: false,
      },
      password: {
        value: "",
        validator: {
          minLength: 6,
          required: true,
        },
        touched: false,
        isValid: false,
      },
    },
    error: null,
    formIsValid: false,
  });

  const checkValidation = (rules: InputValidator, value: string): boolean => {
    let isValid = true;
    if (rules.required) {
      isValid = !validator.isEmpty(value) && isValid;
    }
    if (rules.isMail) {
      isValid = validator.isEmail(value) && isValid;
    }

    if (rules.minLength) {
      isValid =
        validator.isLength(value, {
          min: 6,
        }) && isValid;
    }
    return isValid;
  };

  const onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const newAuthForm: AuthForm = JSON.parse(
      JSON.stringify(authState.authForm)
    );
    newAuthForm[event.target.name].value = event.target.value.trim();
    newAuthForm[event.target.name].touched = true;
    newAuthForm[event.target.name].isValid = checkValidation(
      newAuthForm[event.target.name].validator,
      newAuthForm[event.target.name].value
    );

    let formIsValid = true;

    for (let key in newAuthForm) {
      formIsValid = newAuthForm[key].isValid && formIsValid;
    }

    setAuthState({
      ...authState,
      authForm: newAuthForm,
      formIsValid,
    });
  };

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let adminData = { email: "", password: "", returnSecureToken: true };
    adminData.email = authState.authForm.email.value;
    adminData.password = authState.authForm.password.value;
    history.push(RoutePathName.ADMIN_DASHBOARD);
    // this.props.adminAuthentication(adminData);
  };

  let errorAlertDiv = null;

  if (authState.error) {
    let msg = ["Something", "went wrong!"];
    switch (authState.error?.message) {
      case "EMAIL_NOT_FOUND":
        msg[0] = "INVALID EMAIL!";
        msg[1] = "Please Enter valid email.";
        break;
      case "INVALID_PASSWORD":
        msg[0] = "INVALID PASSWORD!";
        msg[1] = "Please Enter valid password.";
        break;
      default:
        msg = ["Something", "went wrong!"];
        break;
    }
    errorAlertDiv = (
      <div
        className={`alert alert-danger alert-dismissible fade show mx-1 col-12 ${classes.AuthFormGroup}`}
        role="alert"
      >
        <strong>{msg[0]} </strong> {msg[1]}
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    );
  }

  return (
    <div className={`${classes.Auth}`}>
      <form
        className={`needs-validation card ${classes.AuthForm}`}
        onSubmit={submitHandler}
      >
        <div className={`card-header text-center ${classes.AuthFormHeader}`}>
          ADMIN Authentication
        </div>
        <div className={`form-row card-body m-0`}>
          {/* error message */}

          {errorAlertDiv}
          {/* end error message */}
          <div className={`mb-3 col-12 ${classes.AuthFormGroup}`}>
            <label htmlFor="email">Email</label>
            <input
              className={`form-control ${
                authState.authForm.email.touched
                  ? authState.authForm.email.isValid
                    ? "is-valid"
                    : "is-invalid"
                  : ""
              }`}
              onChange={onChangeHandler}
              type="email"
              name="email"
              id="email"
              placeholder="Admin email"
              value={authState.authForm.email.value}
              required
            />
            {authState.authForm.email.touched ? (
              authState.authForm.email.isValid ? null : (
                <div className="invalid-feedback">
                  Please enter valid email address.
                </div>
              )
            ) : null}
          </div>
          <div className={`mb-3 col-12 ${classes.AuthFormGroup}`}>
            <label htmlFor="password">Password</label>
            <input
              className={`form-control ${
                authState.authForm.password.touched
                  ? authState.authForm.password.isValid
                    ? "is-valid"
                    : "is-invalid"
                  : ""
              }`}
              onChange={onChangeHandler}
              type="password"
              name="password"
              id="password"
              placeholder="Admin password"
              value={authState.authForm.password.value}
              required
            />
            {authState.authForm.password.touched ? (
              authState.authForm.password.isValid ? null : (
                <div className="invalid-feedback">
                  Please enter valid password.
                </div>
              )
            ) : null}
          </div>
        </div>
        <div className={`card-footer`}>
          {/* {this.props.adminAuth.loading ? (
            <span className={`badge float-right ${classes.Loading}`}>
              <ProgressIndicator />
            </span>
          ) : ( */}
          <button
            className={`btn float-right ${classes.AuthSubmitBtn}`}
            type="submit"
            disabled={!authState.formIsValid}
          >
            LOGIN
          </button>
          {/* // )} */}
        </div>
      </form>
    </div>
  );
};

export default Auth;
