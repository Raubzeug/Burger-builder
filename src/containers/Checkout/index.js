import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import CheckoutOverview from "../../components/Order/CheckoutOverview";
import ContactData from "./ContactData";

// class Checkout extends Component {
//   // componentDidMount = () => {
//   //   let queryStringParsed = new URLSearchParams(this.props.location.search);
//   //   let newIngredients = { ...this.state.ingredients };
//   //   for (let el of queryStringParsed.entries()) {
//   //     newIngredients[el[0]] = +el[1];
//   //   }
//   //   this.setState({ ingredients: newIngredients });
//   // };

//   continueCheckoutHandler = () => {
//     this.props.history.replace(this.props.match.path + "/contact-data");
//   };

//   cancelCheckoutHandler = () => {
//     this.props.history.goBack();
//   };

//   render() {
//     let summary = <Redirect to="/" />;
//     if (this.props.ingredients) {
//       const purchasedRedirect = this.props.purchased ? (
//         <Redirect to="/" />
//       ) : null;
//       summary = (
//         <div>
//           {purchasedRedirect}
//           <CheckoutOverview
//             ingredients={this.props.ingredients}
//             continueCheckout={this.continueCheckoutHandler}
//             cancelCheckout={this.cancelCheckoutHandler}
//           />
//           <Route
//             path={this.props.match.path + "/contact-data"}
//             // для того, чтобы передать в ContactData пропсы роутинга, можно либо сделать так ({...props}), либо при экспорте обернуть компонент withRouter. Такой вариант можно использовать без redux.
//             // render={(props) => (
//             //   <ContactData ingredients={this.props.ingredients} {...props} />
//             // )}
//             //а этот вариант с redux
//             component={ContactData}
//           />
//         </div>
//       );
//     }
//     return summary;
//   }
// }

const Checkout = (props) => {

  const continueCheckoutHandler = () => {
    props.history.replace(props.match.path + "/contact-data");
  };

  const cancelCheckoutHandler = () => {
    props.history.goBack();
  };

    let summary = <Redirect to="/" />;
    if (props.ingredients) {
      const purchasedRedirect = props.purchased ? (
        <Redirect to="/" />
      ) : null;
      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutOverview
            ingredients={props.ingredients}
            continueCheckout={continueCheckoutHandler}
            cancelCheckout={cancelCheckoutHandler}
          />
          <Route
            path={props.match.path + "/contact-data"}
            // для того, чтобы передать в ContactData пропсы роутинга, можно либо сделать так ({...props}), либо при экспорте обернуть компонент withRouter. Такой вариант можно использовать без redux.
            // render={(props) => (
            //   <ContactData ingredients={this.props.ingredients} {...props} />
            // )}
            //а этот вариант с redux
            component={ContactData}
          />
        </div>
      );
    }
    return summary;
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    purchased: state.order.purchased,
  };
};


export default connect(mapStateToProps)(Checkout);
