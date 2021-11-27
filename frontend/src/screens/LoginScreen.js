import { useState, useContext } from "react";
import "./LoginScreen.css";
import logo from "../static/images/logo.png";
import SignInScreen from "./SignInScreen";
import AuthContext from "../context/AuthContext";
import { Redirect } from "react-router-dom";

function LoginScreen() {
  const [signIn, setsignIn] = useState(false);
  const [signUp, setsignUp] = useState(false);
  let { user } = useContext(AuthContext);
  return (
    <div className="login">
      {user && <Redirect to="/" />}

      <div className="login__background">
        <img className="login__logo" src={logo} alt="" />
        {!signIn && (
          <button className="login__button" onClick={() => setsignIn(true)}>
            Sign In
          </button>
        )}
      </div>
      <div className="login__body">
        {signIn ? (
          <SignInScreen />
        ) : (
          <>
            <h1>Unlimited films, TV programmes and more.</h1>
            <h2>Watch anywhere. Cancel at anytime</h2>
            <h3>
              Ready to watch? Enter yor email to create or restart your
              membership.
            </h3>
            <div className="login__input">
              <form>
                <input type="email" placeholder="Email Address" />
                <button
                  className="login__getstarted"
                  onClick={() => setsignIn(true)}
                >
                  GET STARTED
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default LoginScreen;
