import React, { useEffect } from "react";
import axios from "../../axios/axios-orders";
import { connect } from "react-redux";

import withErrorHandler from "../../hoc/withErrorHandler";
import Order from "../../components/Order";
import Spinner from "../../components/UI/Spinner";
import * as actions from "../../store/actions";

// class Orders extends Component {
//   componentDidMount = () => {
//     this.props.onFetchOrdersInit(this.props.token, this.props.userId);
//   };

//   render() {
//     let orders = [];
//     for (let order in this.props.orders) {
//       orders.push(<Order key={order} orderData={this.props.orders[order]} />);
//     }
//     if (orders.length === 0) {
//       orders = "You don't have any orders yet.";
//     }
//     const content = this.props.loading ? <Spinner /> : orders;
//     return <div>{content}</div>;
//   }
// }

const Orders = (props) => {

  const {onFetchOrdersInit, token, userId} = props
  useEffect(() => {
    onFetchOrdersInit(token, userId);
  }, [onFetchOrdersInit, token, userId]);

  let orders = [];
  for (let order in props.orders) {
    orders.push(<Order key={order} orderData={props.orders[order]} />);
  }
  if (orders.length === 0) {
    orders = "You don't have any orders yet.";
  }
  const content = props.loading ? <Spinner /> : orders;

  return <div>{content}</div>;
};

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loadingOrders,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrdersInit: (token, userId) =>
      dispatch(actions.fetchOrdersInit(token, userId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
