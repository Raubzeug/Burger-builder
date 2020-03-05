import React from "react";
import { NavLink } from "react-router-dom";
import "./NaviItem.scss";

const naviItem = props => {
  return (
    <li className="navi-item">
      <NavLink
        className="navi-item__link"
        exact
        activeClassName="navi-item__link_current"
        to={props.link}
      >
        {props.children}
      </NavLink>
    </li>
  );
};

export default naviItem;
