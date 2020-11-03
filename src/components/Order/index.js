import React from "react";

import "./Order.scss";

const order = (props) => {
  let ingredients = [];
  for (let ingredient in props.orderData["ingredients"]) {
    if (props.orderData["ingredients"][ingredient]) {
      ingredients.push(
        <p key={Math.random()}>
          {ingredient}: {props.orderData["ingredients"][ingredient]}
        </p>
      );
    }
  }
  return (
    <div className="order">
      <p>
        <strong>Ingredients:</strong>
      </p>
      {ingredients}
      <br />
      <p>
        <strong>Price: {props.orderData["price"]}</strong>
      </p>
    </div>
  );
};

export default order;
