import React, { useState, useEffect } from "react";
import "./Nav.css";
import logo from "../static/images/logo.png";
import avatar from "../static/images/avatar.png";
import { useHistory } from "react-router";
function Nav() {
  const [show, handleShow] = useState(false);
  const history = useHistory();
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });
    // return () => {
    //   window.removeEventListener("scroll");
    // };
  }, []);
  return (
    <div className={`nav ${show && "nav__black"}`}>
      <img
        className="nav__logo"
        src={logo}
        alt="Netflix Logo"
        onClick={() => history.push("/")}
      />
      <img
        className="nav__avatar"
        src={avatar}
        alt="Account Logo"
        onClick={() => history.push("/profile")}
      />
    </div>
  );
}

export default Nav;
