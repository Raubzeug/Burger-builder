import { put } from "redux-saga/effects";

import axios from "../../axios/axios-orders";

import * as actions from "../actions";

export function* purchaseBurgerStartSaga(action) {
  yield put(actions.purchaseBurgerInProgress());
  try {
    const response = yield axios.post(
      "/orders.json?auth=" + action.token,
      action.orderData
    );
    yield put(
      actions.purchaseBurgerSuccess(response.data.name, action.orderData)
    );
  } catch (err) {
    yield put(actions.purchaseBurgerFail(err));
  }
}

export function* fetchOrdersInitSaga(action) {
  const queryParams =
    "?auth=" +
    action.token +
    '&orderBy="userId"&equalTo="' +
    action.userId +
    '"';
  yield put(actions.fetchOrderInProgress());
  try {
    const resp = yield axios.get("/orders.json" + queryParams);
    const fetchedOrdersArr = [];
    for (let order in resp.data) {
      fetchedOrdersArr.push(resp.data[order]);
    }
    yield put(actions.fetchOrdersSuccess(fetchedOrdersArr));
  } catch (err) {
    yield put(actions.fetchOrdersFail(err));
  }
}
