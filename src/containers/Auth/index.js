import React, { useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Redirect } from "react-router-dom";

import Input from "../../components/UI/Input";
import ButtonCraft from "../../components/UI/ButtonCraft";
import Spinner from "../../components/UI/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler";
import { updateObject, validation } from "../../shared/utility";
import * as actions from "../../store/actions";

import "./Auth.scss";

// class Auth extends Component {
//   state = {
//     authForm: {
//       email: {
//         elementType: "input",
//         elementConfig: {
//           type: "email",
//           name: "email",
//           placeholder: "Enter your email",
//         },
//         value: "",
//         validationRules: {
//           required: true,
//           isEmail: true,
//         },
//         valid: false,
//         touched: false,
//         label: "Email",
//       },
//       password: {
//         elementType: "input",
//         elementConfig: {
//           type: "password",
//           name: "password",
//           placeholder: "password",
//         },
//         value: "",
//         validationRules: {
//           required: true,
//           minLength: 6,
//         },
//         valid: false,
//         touched: false,
//         label: "Password",
//       },
//     },
//     formIsValid: false,
//     isSignUp: true,
//   };

//   inputChangeHandler = (event, inputIdentifier) => {
//     const updAuthForm = updateObject(this.state.authForm, {
//       [inputIdentifier]: updateObject(this.state.authForm[inputIdentifier], {
//         value: event.target.value,
//         touched: true,
//         valid: validation(
//           event.target.value,
//           this.state.authForm[inputIdentifier].validationRules
//         ),
//       }),
//     });

//     let formIsValid = true;

//     for (let el in updAuthForm) {
//       if (updAuthForm[el].validationRules) {
//         formIsValid = updAuthForm[el].valid && formIsValid;
//       }
//     }

//     this.setState({ authForm: updAuthForm, formIsValid: formIsValid });
//   };

//   authHandler = (event) => {
//     event.preventDefault();
//     this.props.onAuth(
//       this.state.authForm.email.value,
//       this.state.authForm.password.value,
//       this.state.isSignUp
//     );
//   };

//   authMethodChangeHandler = () => {
//     this.setState((prevState) => {
//       return { isSignUp: !prevState.isSignUp };
//     });
//   };

//   render() {
//     const formElements = [];
//     for (let el in this.state.authForm) {
//       formElements.push(
//         <Input
//           key={el}
//           elementType={this.state.authForm[el].elementType}
//           elementConfig={this.state.authForm[el].elementConfig}
//           label={this.state.authForm[el].label}
//           changed={(event) => this.inputChangeHandler(event, el)}
//           invalid={!this.state.authForm[el].valid}
//           touched={this.state.authForm[el].touched}
//           shouldValidate={this.state.authForm[el].validationRules}
//         />
//       );
//     }

//     let show = this.props.loading ? (
//       <Spinner />
//     ) : (
//       <div className="login">
//         <form className="login__form" onSubmit={this.authHandler}>
//           {formElements}
//           <ButtonCraft color="light" disabled={!this.state.formIsValid}>
//             {this.state.isSignUp ? "SIGNUP" : "SIGNIN"}
//           </ButtonCraft>
//         </form>
//         <ButtonCraft color="dark" clicked={this.authMethodChangeHandler}>
//           Switch to {this.state.isSignUp ? "SIGNIN" : "SIGNUP"}
//         </ButtonCraft>
//       </div>
//     );

//     if (this.props.isAuthenticated) {
//       show = this.props.isBuilding ? (
//         <Redirect to="/checkout" />
//       ) : (
//         <Redirect to="/" />
//       );
//     }

//     return show;
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     loading: state.auth.loading,
//     error: state.auth.error,
//     errorText: state.auth.error
//       ? state.auth.error.response.data.error.message
//       : null,
//     isAuthenticated: state.auth.token !== null,
//     isBuilding: state.burgerBuilder.building,
//   };
// };

const Auth = (props) => {
  const [authForm, setAuthForm] = useState({
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        name: "email",
        placeholder: "Enter your email",
      },
      value: "",
      validationRules: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
      label: "Email",
    },
    password: {
      elementType: "input",
      elementConfig: {
        type: "password",
        name: "password",
        placeholder: "password",
      },
      value: "",
      validationRules: {
        required: true,
        minLength: 6,
      },
      valid: false,
      touched: false,
      label: "Password",
    },
  });
  const [formIsValid, setFormIsValid] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);

  const inputChangeHandler = (event, inputIdentifier) => {
    const updAuthForm = updateObject(authForm, {
      [inputIdentifier]: updateObject(authForm[inputIdentifier], {
        value: event.target.value,
        touched: true,
        valid: validation(
          event.target.value,
          authForm[inputIdentifier].validationRules
        ),
      }),
    });

    let formIsValid = true;

    for (let el in updAuthForm) {
      if (updAuthForm[el].validationRules) {
        formIsValid = updAuthForm[el].valid && formIsValid;
      }
    }

    setAuthForm(updAuthForm);
    setFormIsValid(formIsValid);
  };

  const authHandler = (event) => {
    event.preventDefault();
    props.onAuth(authForm.email.value, authForm.password.value, isSignUp);
  };

  const authMethodChangeHandler = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
  };

  const formElements = [];
  for (let el in authForm) {
    formElements.push(
      <Input
        key={el}
        elementType={authForm[el].elementType}
        elementConfig={authForm[el].elementConfig}
        label={authForm[el].label}
        changed={(event) => inputChangeHandler(event, el)}
        invalid={!authForm[el].valid}
        touched={authForm[el].touched}
        shouldValidate={authForm[el].validationRules}
      />
    );
  }

  let show = props.loading ? (
    <Spinner />
  ) : (
    <div className="login">
      <form className="login__form" onSubmit={authHandler}>
        {formElements}
        <ButtonCraft color="light" disabled={!formIsValid}>
          {isSignUp ? "SIGNUP" : "SIGNIN"}
        </ButtonCraft>
      </form>
      <ButtonCraft color="dark" clicked={authMethodChangeHandler}>
        Switch to {isSignUp ? "SIGNIN" : "SIGNUP"}
      </ButtonCraft>
    </div>
  );

  if (props.isAuthenticated) {
    show = props.isBuilding ? <Redirect to="/checkout" /> : <Redirect to="/" />;
  }

  return show;
};

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    errorText: state.auth.error
      ? state.auth.error.response.data.error.message
      : null,
    isAuthenticated: state.auth.token !== null,
    isBuilding: state.burgerBuilder.building,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignUp) =>
      dispatch(actions.auth(email, password, isSignUp)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Auth, axios));
