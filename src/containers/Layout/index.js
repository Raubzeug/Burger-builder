import React from "react";
import "./Layout.scss";

import Toolbar from "../../components/Navigation/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer";

class Layout extends React.Component {
  state = {
    showSideDrawer: false
  };
  sideDrawerCloseHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  showSideDrawerHandler = () => {
    this.setState({ showSideDrawer: true });
  };

  render() {
    return (
      <React.Fragment>
        <Toolbar showSideDrawer={this.showSideDrawerHandler} />
        <SideDrawer
          show={this.state.showSideDrawer}
          closed={this.sideDrawerCloseHandler}
        />
        <main className="content">{this.props.children}</main>
      </React.Fragment>
    );
  }
}

export default Layout;
