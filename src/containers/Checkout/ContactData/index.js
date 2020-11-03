import React, { useState } from "react";
import axios from "../../../axios/axios-orders";
import { connect } from "react-redux";

import ButtonCraft from "../../../components/UI/ButtonCraft";
import Input from "../../../components/UI/Input";
import Spinner from "../../../components/UI/Spinner";
import "./ContactData.scss";
import withErrorHandler from "../../../hoc/withErrorHandler";
import { updateObject, validation } from "../../../shared/utility";

import * as actions from "../../../store/actions";

// class ContactData extends Component {
//   state = {
//     customerForm: {
//       name: {
//         elementType: "input",
//         elementConfig: {
//           type: "text",
//           name: "name",
//           placeholder: "your name",
//         },
//         value: "",
//         validationRules: {
//           required: true,
//           minLength: 3,
//           maxLength: 15,
//         },
//         valid: false,
//         touched: false,
//         label: "Name",
//       },
//       email: {
//         elementType: "input",
//         elementConfig: {
//           type: "email",
//           name: "email",
//           placeholder: "your email",
//         },
//         value: "",
//         label: "Email",
//       },
//       street: {
//         elementType: "input",
//         elementConfig: {
//           type: "text",
//           name: "street",
//           placeholder: "street",
//         },
//         value: "",
//         label: "Street",
//       },
//       house: {
//         elementType: "input",
//         elementConfig: {
//           type: "text",
//           name: "house",
//           placeholder: "house number",
//         },
//         value: "",
//         label: "House #",
//       },

//       deliveryMetod: {
//         elementType: "select",
//         elementConfig: {
//           options: [
//             { value: "fastest", displayValue: "Fastest" },
//             { value: "cheapest", displayValue: "Cheapest" },
//           ],
//         },
//         value: "fastest",
//         valid: true,
//         label: "Delivery method",
//       },
//     },
//     formIsValid: false,
//   };

//   orderHandler = (event) => {
//     event.preventDefault();

//     const customerData = {};
//     for (let el in this.state.customerForm) {
//       customerData[el] = this.state.customerForm[el].value;
//     }

//     const order = {
//       ingredients: this.props.ingredients,
//       price: this.props.totalPrice,
//       userId: this.props.userId,
//       customerData: customerData,
//     };

//     this.props.onPurchaseBurgerStart(order, this.props.token);
//   };

//   inputChangeHandler = (event, inputIdentifier) => {
//     const updatedElement = updateObject(
//       this.state.customerForm[inputIdentifier],
//       {
//         value: event.target.value,
//         valid: this.state.customerForm[inputIdentifier].validationRules
//           ? validation(
//               event.target.value,
//               this.state.customerForm[inputIdentifier].validationRules
//             )
//           : true,
//         touched: true,
//       }
//     );
//     const updatedCustomerForm = updateObject(this.state.customerForm, {
//       [inputIdentifier]: updatedElement,
//     });

//     let formIsValid = true;

//     for (let el in updatedCustomerForm) {
//       if (updatedCustomerForm[el].validationRules) {
//         formIsValid = updatedCustomerForm[el].valid && formIsValid;
//       }
//     }

//     this.setState({
//       customerForm: updatedCustomerForm,
//       formIsValid: formIsValid,
//     });
//   };

//   render() {
//     const formElements = [];
//     for (let el in this.state.customerForm) {
//       formElements.push(
//         <Input
//           key={el}
//           elementType={this.state.customerForm[el].elementType}
//           elementConfig={this.state.customerForm[el].elementConfig}
//           label={this.state.customerForm[el].label}
//           changed={(event) => this.inputChangeHandler(event, el)}
//           invalid={!this.state.customerForm[el].valid}
//           touched={this.state.customerForm[el].touched}
//           shouldValidate={this.state.customerForm[el].validationRules}
//         />
//       );
//     }

//     return this.props.loading === false ? (
//       <div className="contact_data">
//         <h4>Enter your contact data:</h4>
//         <form className="contact_data__form" onSubmit={this.orderHandler}>
//           {formElements}
//           <ButtonCraft color="light" disabled={!this.state.formIsValid}>
//             Proceed to checkout
//           </ButtonCraft>
//         </form>
//       </div>
//     ) : (
//       <Spinner />
//     );
//   }
// }

const ContactData = (props) => {
  const [customerForm, setCustomerForm] = useState({
    name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        name: "name",
        placeholder: "your name",
      },
      value: "",
      validationRules: {
        required: true,
        minLength: 3,
        maxLength: 15,
      },
      valid: false,
      touched: false,
      label: "Name",
    },
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        name: "email",
        placeholder: "your email",
      },
      value: "",
      label: "Email",
    },
    street: {
      elementType: "input",
      elementConfig: {
        type: "text",
        name: "street",
        placeholder: "street",
      },
      value: "",
      label: "Street",
    },
    house: {
      elementType: "input",
      elementConfig: {
        type: "text",
        name: "house",
        placeholder: "house number",
      },
      value: "",
      label: "House #",
    },

    deliveryMetod: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "fastest", displayValue: "Fastest" },
          { value: "cheapest", displayValue: "Cheapest" },
        ],
      },
      value: "fastest",
      valid: true,
      label: "Delivery method",
    },
  });

  const [formIsValid, setFormIsValid] = useState(false);

  const orderHandler = (event) => {
    event.preventDefault();

    const customerData = {};
    for (let el in customerForm) {
      customerData[el] = customerForm[el].value;
    }

    const order = {
      ingredients: props.ingredients,
      price: props.totalPrice,
      userId: props.userId,
      customerData: customerData,
    };

    props.onPurchaseBurgerStart(order, props.token);
  };

  const inputChangeHandler = (event, inputIdentifier) => {
    const updatedElement = updateObject(customerForm[inputIdentifier], {
      value: event.target.value,
      valid: customerForm[inputIdentifier].validationRules
        ? validation(
            event.target.value,
            customerForm[inputIdentifier].validationRules
          )
        : true,
      touched: true,
    });
    const updatedCustomerForm = updateObject(customerForm, {
      [inputIdentifier]: updatedElement,
    });

    let formIsValid = true;

    for (let el in updatedCustomerForm) {
      if (updatedCustomerForm[el].validationRules) {
        formIsValid = updatedCustomerForm[el].valid && formIsValid;
      }
    }

    setCustomerForm(updatedCustomerForm);
    setFormIsValid(formIsValid);
  };

  const formElements = [];
  for (let el in customerForm) {
    formElements.push(
      <Input
        key={el}
        elementType={customerForm[el].elementType}
        elementConfig={customerForm[el].elementConfig}
        label={customerForm[el].label}
        changed={(event) => inputChangeHandler(event, el)}
        invalid={!customerForm[el].valid}
        touched={customerForm[el].touched}
        shouldValidate={customerForm[el].validationRules}
      />
    );
  }

  return props.loading === false ? (
    <div className="contact_data">
      <h4>Enter your contact data:</h4>
      <form className="contact_data__form" onSubmit={orderHandler}>
        {formElements}
        <ButtonCraft color="light" disabled={!formIsValid}>
          Proceed to checkout
        </ButtonCraft>
      </form>
    </div>
  ) : (
    <Spinner />
  );
};

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    loading: state.order.loadingPurchase,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPurchaseBurgerStart: (orderData, token) =>
      dispatch(actions.purchaseBurgerStart(orderData, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
