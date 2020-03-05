import React from "react";

import Burger from "../../components/Burger";
import BuildControls from "../../components/Burger/BuildControls";
import Modal from "../../components/UI/Modal";
import OrderSummary from "../../components/Burger/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner";

import withErrorHandler from "../../hoc/withErrorHandler";

const INGREDIENT_PRICES = {
  salad: 0.2,
  bacon: 0.6,
  cheese: 0.4,
  meat: 0.8
};

class BulgerBuilder extends React.Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    ordering: false,
    loading: false,
    error: false
  };

  componentDidMount = () => {
    axios
      .get("https://burger-builder-b920e.firebaseio.com/Ingredients.json")
      .then(resp => {
        this.setState({ ingredients: resp.data });
      })
      .catch(err => this.setState({ error: true }));
  };

  updatePurchaseState = ingredients => {
    const quantity = Object.values(ingredients).reduce(
      (acc, el) => (acc += el),
      0
    );
    this.setState({ purchasable: quantity > 0 });
  };

  addIngredientHandler = type => {
    const oldAmount = this.state.ingredients[type];

    const updatedIngredients = {
      ...this.state.ingredients
    };
    const oldPrice = this.state.totalPrice;
    updatedIngredients[type] = oldAmount + 1;
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: Math.round((oldPrice + INGREDIENT_PRICES[type]) * 100) / 100
    });
    this.updatePurchaseState(updatedIngredients);
  };

  delIngredientHandler = type => {
    const oldAmount = this.state.ingredients[type];
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = oldAmount - 1 >= 0 ? oldAmount - 1 : 0;
    const oldPrice = this.state.totalPrice;
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: Math.round((oldPrice - INGREDIENT_PRICES[type]) * 100) / 100
    });
    this.updatePurchaseState(updatedIngredients);
  };

  orderHandler = () => {
    this.setState({ ordering: true });
  };

  orderCancelHandler = () => {
    this.setState({ ordering: false });
  };

  orderContinueHandler = () => {
    // this.setState({ ordering: true, loading: true });
    let queryParams = [];
    for (let el in this.state.ingredients) {
      queryParams.push(el + "=" + this.state.ingredients[el]);
    }
    this.props.history.push({
      pathname: "/checkout/",
      search: "?" + queryParams.join("&")
    });
    // const order = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.totalPrice,
    //   customer: {
    //     name: "Elena",
    //     address: "some address",
    //     email: "test@test.com",
    //     deliveryMethod: "some method"
    //   }
    // };
    // axios
    //   .post("/orders.json", order)
    //   .then(response => {
    //     this.setState({ ordering: false, loading: false });
    //   })
    //   .catch(err => {
    //     this.setState({ ordering: false, loading: false });
    //     console.log(err);
    //   });
  };

  render() {
    let burger = this.state.error ? (
      <p>ingredients cannot be loaded</p>
    ) : (
      <Spinner />
    );
    let orderSummary = null;

    if (this.state.ingredients) {
      burger = (
        <React.Fragment>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            delIngredient={this.delIngredientHandler}
            addIngredient={this.addIngredientHandler}
            ingredients={this.state.ingredients}
            purchasable={this.state.purchasable}
            price={this.state.totalPrice}
            ordering={this.orderHandler}
          />
        </React.Fragment>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          totalPrice={this.state.totalPrice}
          cancel={this.orderCancelHandler}
          continue={this.orderContinueHandler}
        />
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <React.Fragment>
        <Modal show={this.state.ordering} hide={this.orderCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </React.Fragment>
    );
  }
}

export default withErrorHandler(BulgerBuilder, axios);
