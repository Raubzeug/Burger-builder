import React from "react";

import "./BuildControls.scss";

import BuildControl from "./BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
];

const buildControls = (props) => {
  return (
    <div className="build-controls">
      <p>
        Current Price: <strong>{props.price.toFixed(2)}</strong> USD
      </p>
      {controls.map((el) => (
        <BuildControl
          key={el.label}
          label={el.label}
          disabled={!Boolean(props.ingredients[el.type])}
          deleted={() => props.delIngredient(el.type)}
          added={() => props.addIngredient(el.type)}
        />
      ))}
      <button
        className="build-controls__order-button"
        disabled={!props.purchasable}
        onClick={props.ordering}
      >
        {props.isAuth ? 'ORDER NOW' : 'LOGIN TO ORDER'}
      </button>
    </div>
  );
};


export default buildControls;