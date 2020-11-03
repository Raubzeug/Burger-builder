import React from "react";

import Burger from "../../Burger";
import Button from "../../UI/ButtonCraft";

import "./CheckoutOverview.scss";

const checkoutOverview = (props) => {
  return (
    <div className="checkout">
      <h1>Your great choice!</h1>
      <Burger ingredients={props.ingredients} />
      <Button color="dark" clicked={props.cancelCheckout}>
        CANCEL
      </Button>
      <Button color="light" clicked={props.continueCheckout}>
        CHECKOUT
      </Button>
    </div>
  );
};

export default checkoutOverview;
