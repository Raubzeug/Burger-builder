import { takeEvery, all } from "redux-saga/effects";

import * as actionTypes from "../actions/actionTypes";

import {
  logoutSaga,
  checkAuthTimeoutSaga,
  authSaga,
  checkAuthStatusSaga,
} from "./auth";
import { initIngredientsSaga } from "./burgerBuilder";
import { purchaseBurgerStartSaga, fetchOrdersInitSaga } from "./order";

export function* watchAuth() {
  //all позволяет выполнять задачи одновременно. ниже нам не принципиально, так как это синхронные задачи, а если например у нас два axios запроса, то all позволит выполнить их одновременно
  yield all([
    takeEvery(actionTypes.AUTH_LOGOUT_INITIATE, logoutSaga),
    takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
    takeEvery(actionTypes.AUTH, authSaga),
    takeEvery(actionTypes.AUTH_CHECK_STATUS, checkAuthStatusSaga),
  ]);
}

export function* watchBurgerBuilder() {
  yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga);
}

export function* watchOrder() {
  yield takeEvery(actionTypes.PURCHASE_BURGER_START, purchaseBurgerStartSaga);
  yield takeEvery(actionTypes.FETCH_ORDERS_INIT_START, fetchOrdersInitSaga);
}
