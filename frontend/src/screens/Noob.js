import React from "react";
import "./Noob.css";
import logo from "../static/images/logo.png";

function Noob() {
  return (
    <div className="noob">
      <img src={logo} alt="" className="logo" />
      <button className="noob__btn">Sign In</button>
    </div>
  );
}

export default Noob;
