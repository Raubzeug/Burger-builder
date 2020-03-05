import React from "react";
import "./Logo.scss";
import Logopic from "../../assets/images/logo.png";

const logo = props => {
  return <img className="logo" src={Logopic} alt="Foxy" />;
};

export default logo;
