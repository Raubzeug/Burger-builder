import React from "react";

import Modal from "../../components/UI/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,

        reqInt: axios.interceptors.request.use(req => {
          this.setState({ error: null });
          return req;
        }),
        respInt: axios.interceptors.response.use(
          res => res,
          error => {
            this.setState({ error: error });
          }
        )
      };
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.state.reqInt);
      axios.interceptors.response.eject(this.state.respInt);
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <React.Fragment>
          <Modal show={this.state.error} hide={this.errorConfirmedHandler}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </React.Fragment>
      );
    }
  };
};

export default withErrorHandler;
