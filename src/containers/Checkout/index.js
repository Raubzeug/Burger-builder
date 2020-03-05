import React, { Component } from "react";
import { Route } from "react-router-dom";

import CheckoutOverview from "../../components/Order/CheckoutOverview";
import ContactData from "./ContactData";

class Checkout extends Component {
  state = {
    ingredients: {}
  };

  componentDidMount = () => {
    let queryStringParsed = new URLSearchParams(this.props.location.search);
    let newIngredients = { ...this.state.ingredients };
    for (let el of queryStringParsed.entries()) {
      newIngredients[el[0]] = +el[1];
    }
    this.setState({ ingredients: newIngredients });
  };

  continueCheckoutHandler = () => {
    this.props.history.replace(this.props.match.path + "/contact-data");
  };

  cancelCheckoutHandler = () => {
    this.props.history.goBack();
  };

  render() {
    return (
      <div>
        <CheckoutOverview
          ingredients={this.state.ingredients}
          continueCheckout={this.continueCheckoutHandler}
          cancelCheckout={this.cancelCheckoutHandler}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          // для того, чтобы передать в ContactData пропсы роутинга, можно либо сделать так ({...props}), либо при экспорте обернуть компонент withRouter
          render={props => (
            <ContactData ingredients={this.state.ingredients} {...props} />
          )}
        />
      </div>
    );
  }
}

export default Checkout;
