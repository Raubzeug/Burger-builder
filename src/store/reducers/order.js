import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  orders: [],
  loadingPurchase: false,
  purchased: false,
  loadingOrders: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return updateObject(state, {
        orders: action.orders,
        loadingOrders: false,
      });
    case actionTypes.FETCH_ORDERS_IN_PROGRESS:
      return updateObject(state, { loadingOrders: true });
    case actionTypes.FETCH_ORDERS_FAIL:
      return updateObject(state, { loadingOrders: false });
    case actionTypes.PURCHASE_INIT:
      return updateObject(state, { purchased: false });
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      const newOrder = updateObject(action.orderData, { id: action.orderID });
      return updateObject(state, {
        orders: state.orders.concat(newOrder),
        loadingPurchase: false,
        purchased: true,
      });
    case actionTypes.PURCHASE_BURGER_FAIL:
      return updateObject(state, { loadingPurchase: false });
    case actionTypes.PURCHASE_BURGER_IN_PROGRESS:
      return updateObject(state, { loadingPurchase: true });
    default:
      return state;
  }
};

export default reducer;
