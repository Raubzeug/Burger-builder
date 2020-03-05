import React from "react";
import "./BuildControl.scss";
import ButtonCraft from "../../../UI/ButtonCraft";

const buildControl = props => {
  return (
    <div className="build-control">
      <div className="build-control__label">{props.label}</div>
      <ButtonCraft
        color="light"
        clicked={props.deleted}
        disabled={props.disabled}
      >
        Less
      </ButtonCraft>
      <ButtonCraft color="dark" clicked={props.added}>
        More
      </ButtonCraft>
    </div>
  );
};

export default buildControl;
