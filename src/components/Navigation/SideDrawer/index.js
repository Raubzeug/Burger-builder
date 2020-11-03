import React from "react";
import "./SideDrawer.scss";
import Logo from "../../Logo";
import NavigationItems from "../NaviItems";
import BackDrop from "../../UI/Backdrop";

const sideDrawer = (props) => {
  let backDropClasses = ["side-drawer", "side-drawer-close"];
  if (props.show) {
    backDropClasses = ["side-drawer", "side-drawer-open"];
  }
  return (
    <React.Fragment>
      <BackDrop show={props.show} hide={props.closed} />
      <div className={backDropClasses.join(" ")}>
        <div className="side-drawer__remove" onClick={props.closed}>
          <div className="side-drawer__remove__line"></div>
        </div>
        <div className="side-drawer__logo">
          <Logo />
        </div>
        <nav onClick={props.closed}>
          <NavigationItems isAuthenticated={props.isAuthenticated} />
        </nav>
      </div>
    </React.Fragment>
  );
};

export default sideDrawer;
