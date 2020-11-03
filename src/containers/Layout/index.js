import React, {useState} from "react";
import "./Layout.scss";

import Toolbar from "../../components/Navigation/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer";

import { connect } from "react-redux";

// class Layout extends React.Component {
//   state = {
//     showSideDrawer: false,
//   };
//   sideDrawerCloseHandler = () => {
//     this.setState({ showSideDrawer: false });
//   };

//   showSideDrawerHandler = () => {
//     this.setState({ showSideDrawer: true });
//   };

//   render() {
//     return (
//       <React.Fragment>
//         <Toolbar
//           showSideDrawer={this.showSideDrawerHandler}
//           isAuthenticated={this.props.isAuthenticated}
//         />
//         <SideDrawer
//           isAuthenticated={this.props.isAuthenticated}
//           show={this.state.showSideDrawer}
//           closed={this.sideDrawerCloseHandler}
//         />
//         <main className="content">{this.props.children}</main>
//       </React.Fragment>
//     );
//   }
// }

const Layout = (props) => {
  const [showSideDrawer, updateShowSideDrawer] = useState(false)

  const sideDrawerCloseHandler = () => {
    updateShowSideDrawer(false)
  };

  const showSideDrawerHandler = () => {
    updateShowSideDrawer(true)
  };

  return (
    <React.Fragment>
      <Toolbar
        showSideDrawer={showSideDrawerHandler}
        isAuthenticated={props.isAuthenticated}
      />
      <SideDrawer
        isAuthenticated={props.isAuthenticated}
        show={showSideDrawer}
        closed={sideDrawerCloseHandler}
      />
      <main className="content">{props.children}</main>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Layout);
