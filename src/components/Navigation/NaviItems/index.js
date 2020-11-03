import React from "react";
import "./NaviItems.scss";
import NaviItem from "./NaviItem";

const naviItems = (props) => {
  return (
    <ul className="navi-item">
      <NaviItem link="/">Burger Builder</NaviItem>
      {props.isAuthenticated ? (
        <NaviItem link="/orders">Orders</NaviItem>
      ) : null}
      {props.isAuthenticated ? (
        <NaviItem link="/logout">Logout</NaviItem>
      ) : (
        <NaviItem link="/login">Login</NaviItem>
      )}
    </ul>
  );
};

export default naviItems;
