import React from "react";

import "./Modal.scss";
import Backdrop from "../Backdrop";

class Modal extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    );
  }

  render() {
    let className = "modal-hidden";
    if (this.props.show) {
      className = "modal";
    }
    return (
      <React.Fragment>
        <Backdrop show={this.props.show} hide={this.props.hide} />
        <div className={className}>{this.props.children}</div>
      </React.Fragment>
    );
  }
}

export default Modal;
