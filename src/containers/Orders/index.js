import React, { Component } from "react";
import axios from "../../axios-orders";

import withErrorHandler from "../../hoc/withErrorHandler";
import Order from "../../components/Order";

class Orders extends Component {
  state = { orders: {}, loading: true, error: false };

  componentDidMount = () => {
    axios
      .get("/orders.json")
      .then(resp => this.setState({ orders: resp.data, loading: false }))
      .catch(err => this.setState({ error: true, loading: false }));
  };

  render() {
    const orders = [];
    for (let order in this.state.orders) {
      orders.push(<Order key={order} orderData={this.state.orders[order]} />);
    }
    return <div>{orders}</div>;
  }
}

export default withErrorHandler(Orders, axios);
