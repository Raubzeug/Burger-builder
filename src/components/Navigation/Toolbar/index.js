import React from "react";

import "./Toolbar.scss";
import Logo from "../../Logo";
import NaviItems from "../NaviItems";
import Switcher from "./Switcher";

const toolbar = (props) => {
  return (
    <header className="toolbar">
      <div className="toolbar__switcher">
        <Switcher showSideDrawer={props.showSideDrawer} />
      </div>
      <div className="toolbar__logo">
        <Logo />
      </div>
      <div className="toolbar__navigation">
        <NaviItems isAuthenticated={props.isAuthenticated} />
      </div>
    </header>
  );
};

export default toolbar;
