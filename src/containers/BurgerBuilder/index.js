import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import Burger from "../../components/Burger";
import BuildControls from "../../components/Burger/BuildControls";
import Modal from "../../components/UI/Modal";
import OrderSummary from "../../components/Burger/OrderSummary";
import axios from "../../axios/axios-orders";
import Spinner from "../../components/UI/Spinner";

import withErrorHandler from "../../hoc/withErrorHandler";

// export class BurgerBuilder extends React.Component {
//   state = {
//     purchasable: false,
//     ordering: false,
//     loading: false,
//   };

//   componentDidMount = () => {
//     this.props.onInitIngredients();
//   };

//   updatePurchaseState = (ingredients) => {
//     const quantity = Object.values(ingredients).reduce(
//       (acc, el) => (acc += el),
//       0
//     );
//     this.setState({ purchasable: quantity > 0 });
//   };

//   orderHandler = () => {
//     if (this.props.isAuthenticated) {
//       this.setState({ ordering: true });
//     } else {
//       this.props.history.push("/login");
//     }
//   };

//   orderCancelHandler = () => {
//     this.setState({ ordering: false });
//   };

//   orderContinueHandler = () => {
//     // let queryParams = [];
//     // for (let el in this.state.ingredients) {
//     //   queryParams.push(el + "=" + this.state.ingredients[el]);
//     // }
//     this.props.onPurchaseInit();
//     this.props.history.push({
//       pathname: "/checkout/",
//       // search: "?" + queryParams.join("&"),
//     });
//     // const order = {
//     //   ingredients: this.state.ingredients,
//     //   price: this.state.totalPrice,
//     //   customer: {
//     //     name: "Elena",
//     //     address: "some address",
//     //     email: "test@test.com",
//     //     deliveryMethod: "some method"
//     //   }
//     // };
//     // axios
//     //   .post("/orders.json", order)
//     //   .then(response => {
//     //     this.setState({ ordering: false, loading: false });
//     //   })
//     //   .catch(err => {
//     //     this.setState({ ordering: false, loading: false });
//     //     console.log(err);
//     //   });
//   };

//   render() {
//     let burger = this.props.error ? (
//       <p>ingredients cannot be loaded</p>
//     ) : (
//       <Spinner />
//     );
//     let orderSummary = null;

//     if (this.props.ingredients) {
//       burger = (
//         <React.Fragment>
//           <Burger ingredients={this.props.ingredients} />
//           <BuildControls
//             delIngredient={this.props.onDelIngredient}
//             addIngredient={this.props.onAddIngredient}
//             ingredients={this.props.ingredients}
//             purchasable={Object.values(this.props.ingredients).some(
//               (el) => el > 0
//             )}
//             price={this.props.totalPrice}
//             ordering={this.orderHandler}
//             isAuth={this.props.isAuthenticated}
//           />
//         </React.Fragment>
//       );
//       orderSummary = (
//         <OrderSummary
//           ingredients={this.props.ingredients}
//           totalPrice={this.props.totalPrice}
//           cancel={this.orderCancelHandler}
//           continue={this.orderContinueHandler}
//         />
//       );
//     }

//     if (this.state.loading) {
//       orderSummary = <Spinner />;
//     }

//     return (
//       <React.Fragment>
//         <Modal show={this.state.ordering} hide={this.orderCancelHandler}>
//           {orderSummary}
//         </Modal>
//         {burger}
//       </React.Fragment>
//     );
//   }
// }

const BurgerBuilder = (props) => {
  const [ordering, setOrdering] = useState(false);

  const {onInitIngredients} = props

  useEffect(() => {
    onInitIngredients();
  }, [onInitIngredients]);

  const orderHandler = () => {
    if (props.isAuthenticated) {
      setOrdering(true);
    } else {
      props.history.push("/login");
    }
  };

  const orderCancelHandler = () => {
    setOrdering(false);
  };

  const orderContinueHandler = () => {
    props.onPurchaseInit();
    props.history.push({
      pathname: "/checkout/",
    });
  };

  let burger = props.error ? <p>ingredients cannot be loaded</p> : <Spinner />;
  let orderSummary = null;

  if (props.ingredients) {
    burger = (
      <React.Fragment>
        <Burger ingredients={props.ingredients} />
        <BuildControls
          delIngredient={props.onDelIngredient}
          addIngredient={props.onAddIngredient}
          ingredients={props.ingredients}
          purchasable={Object.values(props.ingredients).some((el) => el > 0)}
          price={props.totalPrice}
          ordering={orderHandler}
          isAuth={props.isAuthenticated}
        />
      </React.Fragment>
    );
    orderSummary = (
      <OrderSummary
        ingredients={props.ingredients}
        totalPrice={props.totalPrice}
        cancel={orderCancelHandler}
        continue={orderContinueHandler}
      />
    );
  }

  if (props.loading) {
    orderSummary = <Spinner />;
  }

  return (
    <React.Fragment>
      <Modal show={ordering} hide={orderCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null,
    loading: state.burgerBuilder.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddIngredient: (ingredientType) =>
      dispatch(actions.addIngredient(ingredientType)),
    onDelIngredient: (ingredientType) =>
      dispatch(actions.delIngredient(ingredientType)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onPurchaseInit: () => dispatch(actions.purchaseInit()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
