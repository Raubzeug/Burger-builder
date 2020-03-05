import React from "react";

import "./Burger.scss";
import BurgerIngredient from "./BurgerIngredient";

const burger = props => {
  let transformedIngredients = Object.entries(props.ingredients)
    .map(([el, quant]) =>
      [...Array(quant)].map((_, i) => (
        <BurgerIngredient key={el + i} type={el} />
      ))
    )
    .reduce((acc, el) => {
      return [...acc, ...el];
    }, []);
  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Start to add ingredients!</p>;
  }

  return (
    <div className="burger">
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
