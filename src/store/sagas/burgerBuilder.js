import { put } from "redux-saga/effects";
import * as actions from "../actions";

import axios from "../../axios/axios-orders";

export function* initIngredientsSaga(action) {
  try {
    const resp = yield axios.get("Ingredients.json");
    yield put(actions.setIngredients(resp.data));
  } catch (err) {
    yield put(actions.fetchIngredientsFailed());
  }
}
