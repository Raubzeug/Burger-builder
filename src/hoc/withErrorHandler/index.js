import React from "react";

import useHttpErrorHandler from "../../hooks/http-error-handler";

import Modal from "../../components/UI/Modal";

// const withErrorHandler = (WrappedComponent, axios) => {
//   return class extends React.Component {
//     state = {
//       error: null,
//       reqInt: axios.interceptors.request.use((req) => {
//         this.setState({ error: null });
//         return req;
//       }),
//       respInt: axios.interceptors.response.use(
//         (res) => res,
//         (error) => {
//           this.setState({ error: error });
//           return Promise.reject(error);
//         }
//       ),
//     };

//     componentWillUnmount() {
//       axios.interceptors.request.eject(this.state.reqInt);
//       axios.interceptors.response.eject(this.state.respInt);
//     }

//     errorConfirmedHandler = () => {
//       this.setState({ error: null });
//     };

//     render() {
//       return (
//         <React.Fragment>
//           <Modal show={this.state.error} hide={this.errorConfirmedHandler}>
//             {this.state.error
//               ? this.props.errorText || this.state.error.message
//               : null}
//           </Modal>
//           <WrappedComponent {...this.props} />
//         </React.Fragment>
//       );
//     }
//   };
// };

const withErrorHandler = (WrappedComponent, axios) => {
  return (props) => {
    const [error, clearError] = useHttpErrorHandler(axios);

    return (
      <React.Fragment>
        <Modal show={error} hide={clearError}>
          {error ? props.errorText || error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </React.Fragment>
    );
  };
};

export default withErrorHandler;
