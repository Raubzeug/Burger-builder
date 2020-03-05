import React from "react";

import "./Backdrop.scss";

const backdrop = props => {
  return props.show ? (
    <div className="backdrop" onClick={props.hide}></div>
  ) : null;
};

export default backdrop;
