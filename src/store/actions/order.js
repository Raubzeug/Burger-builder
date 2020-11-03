import * as actionTypes from "./actionTypes";

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderID: id,
    orderData: orderData,
  };
};

export const purchaseBurgerFail = (error) => {
  return { type: actionTypes.PURCHASE_BURGER_FAIL, error: error };
};

export const purchaseBurgerInProgress = () => {
  return { type: actionTypes.PURCHASE_BURGER_IN_PROGRESS };
};

export const purchaseInit = () => {
  return { type: actionTypes.PURCHASE_INIT };
};

export const purchaseBurgerStart = (orderData, token) => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
    orderData: orderData,
    token: token,
  };
};

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders,
  };
};

export const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error,
  };
};

export const fetchOrdersInit = (token, userId) => {
  return {
    type: actionTypes.FETCH_ORDERS_INIT_START,
    token: token,
    userId: userId,
  };
};

export const fetchOrderInProgress = () => {
  return {
    type: actionTypes.FETCH_ORDERS_IN_PROGRESS,
  };
};
