import React from "react";
import "./ProfileScreen.css";
import Nav from "../components/Nav";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import avatar from "../static/images/avatar.png";
import StripeBtn from "../components/StripeBtn";

function ProfileScreen() {
  let { user, logoutUser } = useContext(AuthContext);
  console.log(user);
  return (
    <div className="ProfileScreen">
      <Nav />
      <div className="profile_body">
        <h1>Edit Profile</h1>
        <div className="profile_info">
          <img src={avatar} alt="" />
          <div className="profile_details">
            <h2>{user.email}</h2>
            {/* <h3>{user.username}</h3> */}
            <div className="profile_plans">
              <h3>Plans</h3>
              <div className="plans">
                <p>Premium</p>
                {/* <button className="premium">$399</button> */}
                <StripeBtn />
              </div>
              <button className="profile_signout" onClick={logoutUser}>
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileScreen;
