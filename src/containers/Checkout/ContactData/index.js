import React, { Component } from "react";
import axios from "../../../axios-orders";

import ButtonCraft from "../../../components/UI/ButtonCraft";
import Input from "../../../components/UI/Input";
import Spinner from "../../../components/UI/Spinner";
import "./ContactData.scss";

class ContactData extends Component {
  state = {
    customerForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          name: "name",
          placeholder: "your name"
        },
        value: "",
        validationRules: {
          required: true,
          minLength: 3,
          maxLength: 6
        },
        valid: false,
        touched: false,
        label: "Name"
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          name: "email",
          placeholder: "your email"
        },
        value: "",
        label: "Email"
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          name: "street",
          placeholder: "street"
        },
        value: "",
        label: "Street"
      },
      house: {
        elementType: "input",
        elementConfig: {
          type: "text",
          name: "house",
          placeholder: "house number"
        },
        value: "",
        label: "House #"
      },

      deliveryMetod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" }
          ]
        },
        value: "fastest",
        valid: true,
        label: "Delivery method"
      }
    },
    formIsValid: false,
    loading: false
  };

  validation = (value, rules) => {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  };

  orderHandler = event => {
    event.preventDefault();

    this.setState({ loading: true });

    const customerData = {};
    for (let el in this.state.customerForm) {
      customerData[el] = this.state.customerForm[el].value;
    }

    const order = {
      ingredients: this.props.ingredients,
      // price: this.state.totalPrice,
      customer: customerData
    };

    axios
      .post("/orders.json", order)
      .then(response => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch(err => {
        this.setState({ loading: false });
        console.log(err);
      });
  };

  inputChangeHandler = (event, inputIdentifier) => {
    // неглубокая копия!!!
    const updatedCustomerForm = { ...this.state.customerForm };
    const updatedElement = { ...updatedCustomerForm[inputIdentifier] };
    updatedElement.value = event.target.value;

    if (updatedElement.validationRules) {
      updatedElement.valid = this.validation(
        updatedElement.value,
        updatedElement.validationRules
      );
    }
    updatedElement.touched = true;
    updatedCustomerForm[inputIdentifier] = updatedElement;

    let formIsValid = true;

    for (let el in updatedCustomerForm) {
      if (updatedCustomerForm[el].validationRules) {
        formIsValid = updatedCustomerForm[el].valid && formIsValid;
      }
    }

    this.setState({
      customerForm: updatedCustomerForm,
      formIsValid: formIsValid
    });
  };

  render() {
    const formElements = [];
    for (let el in this.state.customerForm) {
      formElements.push(
        <Input
          key={el}
          elementType={this.state.customerForm[el].elementType}
          elementConfig={this.state.customerForm[el].elementConfig}
          label={this.state.customerForm[el].label}
          changed={event => this.inputChangeHandler(event, el)}
          invalid={!this.state.customerForm[el].valid}
          touched={this.state.customerForm[el].touched}
          shouldValidate={this.state.customerForm[el].validationRules}
        />
      );
    }

    return this.state.loading === false ? (
      <div className="contact_data">
        <h4>Enter your contact data:</h4>
        <form className="contact_data__form" onSubmit={this.orderHandler}>
          {formElements}
          <ButtonCraft color="light" disabled={!this.state.formIsValid}>
            Proceed to checkout
          </ButtonCraft>
        </form>
      </div>
    ) : (
      <Spinner />
    );
  }
}

export default ContactData;
