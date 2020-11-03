import React from "react";

import "./Modal.scss";
import Backdrop from "../Backdrop";

const Modal = (props) => {
  // shouldComponentUpdate(nextProps, nextState) {
  //   return (
  // nextProps.show !== this.props.show ||
  // nextProps.children !== this.props.children
  //   );
  // }

  let className = "modal-hidden";
  if (props.show) {
    className = "modal";
  }
  return (
    <React.Fragment>
      <Backdrop show={props.show} hide={props.hide} />
      <div className={className}>{props.children}</div>
    </React.Fragment>
  );
};

export default React.memo(
  Modal,
  (prevProps, nextProps) =>
    (nextProps.show === prevProps.show) &
    (nextProps.children === prevProps.children)
);
