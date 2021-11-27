import React from "react";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ children, ...rest }) {
  let { user } = useContext(AuthContext);

  return (
    <div>
      <Route {...rest}>{!user ? <Redirect to="/login" /> : children}</Route>
    </div>
  );
}

export default PrivateRoute;
