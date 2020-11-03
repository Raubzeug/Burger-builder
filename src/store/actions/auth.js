import * as actionTypes from "./actionTypes";

export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT_INITIATE,
  };
};

export const logoutSucceed = () => {
 return {
    type: actionTypes.AUTH_LOGOUT,
  }
}

export const checkAuthTimeout = (expirationTime) => {
  return {
    type: actionTypes.AUTH_CHECK_TIMEOUT,
    expirationTime: expirationTime
  }
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    userId: userId,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const auth = (email, password, isSignUp) => {
  return {
    type: actionTypes.AUTH,
    email: email,
    password: password,
    isSignUp: isSignUp
  }
};

export const checkAuthStatus = () => {
  return {
    type: actionTypes.AUTH_CHECK_STATUS
  };
};
