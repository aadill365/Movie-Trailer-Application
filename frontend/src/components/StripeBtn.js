import React, { Fragment } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import avatar from "../static/images/avatar.png";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const StripeBtn = () => {
  const publishableKey = "pk_test_ZU3mlTy0q00DATc9EyF9A8jX";
  let { user } = useContext(AuthContext);

  const onToken = (token) => {
    const body = {
      amount: 999,
      token: token,
    };
    axios
      .get("http://localhost:8000/api/users/")
      .then((response) => {
        console.log(body);
        alert("Payment Success");
        // alert(token);
      })
      .catch((error) => {
        console.log("Payment Error: ", error);
        alert("Payment Error");
      });
  };
  return (
    <StripeCheckout
      label="Go Premium" //Component button text
      name="Netflix Clone" //Modal Header
      description="Upgrade to Netflix Clone premium account today."
      panelLabel="Go Premium" //Submit button in modal
      amount={100 * 100} //Amount in cents $9.99
      currency="INR"
      token={onToken}
      stripeKey={publishableKey}
      image={avatar} //Pop-in header image
      billingAddress={false}
      email={user.email}
    >
      <button className="premium">Go Premium</button>
    </StripeCheckout>
  );
};
export default StripeBtn;
