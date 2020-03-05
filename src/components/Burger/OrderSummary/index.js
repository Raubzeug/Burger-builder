import React from "react";

import ButtonCraft from "../../UI/ButtonCraft";

const orderSummary = props => {
  const ingredientsSummary = Object.entries(props.ingredients).map(
    ([el, quant]) => (
      <li key={el}>
        <span style={{ textTransform: "capitalize" }}>{el}</span>: {quant}
      </li>
    )
  );
  return (
    <React.Fragment>
      <h3>Your order:</h3>
      <p>A burger with the following ingredients:</p>
      <ul style={{ padding: "20px" }}>{ingredientsSummary}</ul>
      <h4>Total price: {props.totalPrice} USD</h4>

      <p style={{ marginBottom: "20px" }}>Do you want to continue?</p>
      <ButtonCraft color="dark" clicked={props.cancel}>
        NO
      </ButtonCraft>
      <ButtonCraft color="light" clicked={props.continue}>
        YES
      </ButtonCraft>
    </React.Fragment>
  );
};

export default orderSummary;
