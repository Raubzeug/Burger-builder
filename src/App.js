import React, { useEffect, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import "./App.scss";

import Layout from "./containers/Layout";
import BurgerBuilder from "./containers/BurgerBuilder";
import Logout from "./containers/Auth/Logout";
import * as actions from "./store/actions";

const Orders = React.lazy(() => {
  return import("./containers/Orders");
});

const Auth = React.lazy(() => {
  return import("./containers/Auth");
});

const Checkout = React.lazy(() => {
  return import("./containers/Checkout");
});

// class App extends React.Component {
//   componentDidMount() {
//     this.props.onCheckAuthStatus();
//   }

//   render() {
//     let routes = (
//       <Switch>
//         <Route path="/login" component={asyncAuth} />
//         <Route path="/" component={BurgerBuilder} />
//       </Switch>
//     );

//     if (this.props.isAuthenticated) {
//       routes = (
//         <Switch>
//           <Route path="/login" component={asyncAuth} />
//           <Route path="/logout" component={Logout} />
//           <Route path="/checkout" component={asynCheckout} />
//           <Route path="/orders" component={asyncOrders} />
//           <Route path="/" component={BurgerBuilder} />
//         </Switch>
//       );
//     }
//     return <Layout>{routes}</Layout>;
//   }
// }

const App = (props) => {
  const { onCheckAuthStatus } = props;
  useEffect(() => {
    onCheckAuthStatus();
  }, [onCheckAuthStatus]);

  let routes = (
    <Switch>
      <Route path="/login" render={(props) => <Auth {...props} />} />
      <Route path="/" component={BurgerBuilder} />
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/login" render={(props) => <Auth {...props} />} />
        <Route path="/logout" component={Logout} />
        <Route path="/checkout" render={(props) => <Checkout {...props} />} />
        <Route path="/orders" render={(props) => <Orders {...props} />} />
        <Route path="/" component={BurgerBuilder} />
      </Switch>
    );
  }
  return (
    <Layout>
      <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCheckAuthStatus: () => dispatch(actions.checkAuthStatus()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
