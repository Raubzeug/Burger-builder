import React from "react";

import "./Switcher.scss";

const switcher = props => {
  return (
    <div className="switcher" onClick={props.showSideDrawer}>
      <div className="switcher__line"></div>
      <div className="switcher__line"></div>
      <div className="switcher__line"></div>
    </div>
  );
};

export default switcher;
