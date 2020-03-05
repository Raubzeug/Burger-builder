import React from "react";

import "./ButtonCraft.scss";

const buttonCraft = props => {
  let classBtn = "button-craft";
  if (props.color === "dark") {
    classBtn = "button-craft_dark";
  } else if (props.color === "light") {
    classBtn = "button-craft_light";
  }
  return (
    <button
      className={classBtn}
      onClick={props.clicked}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default buttonCraft;
