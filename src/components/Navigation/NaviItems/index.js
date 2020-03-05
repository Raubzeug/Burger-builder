import React from "react";
import "./NaviItems.scss";
import NaviItem from "./NaviItem";

const naviItems = props => {
  return (
    <ul className="navi-item">
      <NaviItem link="/">Burger Builder</NaviItem>
      <NaviItem link="/orders">Orders</NaviItem>
    </ul>
  );
};

export default naviItems;
