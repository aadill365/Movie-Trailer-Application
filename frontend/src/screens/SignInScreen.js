import React, { useContext, useState } from "react";
import "./signInScreen.css";
import AuthContext from "../context/AuthContext";
import { useHistory } from "react-router";

function SignInScreen() {
  let { loginUser, user } = useContext(AuthContext);
  let history = useHistory();
  return (
    <div className="signupScreen">
      <form onSubmit={loginUser}>
        <h1>Sign In</h1>
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          name="email"
          id="email"
          // placeholder="Username"
          required
        />
        <label htmlFor="password">Password</label>

        <input
          type="password"
          name="password"
          id="password"
          // placeholder="Password"
          required
        />
        <button type="submit">Sign In</button>

        <h4>
          <span className="signup__gray">New to Netflix?</span>
          <span
            className="signup__link"
            onClick={() => history.push("/register")}
          >
            Sign Up now.
          </span>
        </h4>
      </form>
    </div>
  );
}

export default SignInScreen;
