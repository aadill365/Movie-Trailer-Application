import React from "react";
import { useHistory, Redirect } from "react-router";
import "./signUpScreen.css";
import "./signInScreen.css";
import "./LoginScreen.css";
import logo from "../static/images/logo.png";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

function SignupScreen() {
  let { registerUser, loginUser } = useContext(AuthContext);
  let history = useHistory();
  return (
    <div className="login">
      <div className="login__background">
        <img className="login__logo" src={logo} alt="" />
      </div>
      <div className="signupScreen down">
        <form onSubmit={registerUser}>
          <h1>Sign Up</h1>
          <label htmlFor="email">Email Address</label>
          <input type="email" name="email" id="email" required />

          <label htmlFor="username">Username</label>
          <input type="text" name="username" id="username" required />

          <label htmlFor="password">Password</label>
          <input type="password" name="password1" id="password" required />

          <label htmlFor="confirm_password">Confirm Password</label>
          <input
            type="password"
            name="password2"
            id="confirm_password"
            required
          />

          <button type="submit" className="signup__register">
            Create Account
          </button>

          <h4>
            <span className="signup__gray">Already have an Account?</span>
            <span
              className="signup__link"
              onClick={() => history.push("/login")}
            >
              {" "}
              Sign In.
            </span>
          </h4>
        </form>
      </div>
    </div>
  );
}

export default SignupScreen;
