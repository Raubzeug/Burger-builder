// put - dispatch action
import { put, call } from "redux-saga/effects";
import { delay } from "redux-saga/effects";
import * as actions from "../actions";
import axios from "axios";

// * Означает, что это функция-генератор
export function* logoutSaga(action) {
  //лучше использовать call для упрощения тестирования, чтобы не обязательно выполнять действие, а просто его замокать
  yield call([localStorage, 'removeItem'], "token")
  yield call([localStorage, 'removeItem'], "expirationDate")
  yield call([localStorage, 'removeItem'], "userId")
  // yield localStorage.removeItem("token");
  // yield localStorage.removeItem("expirationDate");
  // yield localStorage.removeItem("userId");

  yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.logout());
}

export function* authSaga(action) {
  yield put(actions.authStart());
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true,
  };
  let url =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBj-HLRsqzrXHAh6a_go-SxRQx2DJknh2Y";
  if (!action.isSignUp) {
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBj-HLRsqzrXHAh6a_go-SxRQx2DJknh2Y";
  }
  try {
    //если используем yield axios.post, то axios.post вернет не промис, а подождет разрешения промиса
    const resp = yield axios.post(url, authData);
    const expirationDate = yield new Date(
      new Date().getTime() + resp.data.expiresIn * 1000
    );

    yield localStorage.setItem("token", resp.data.idToken);
    yield localStorage.setItem("userId", resp.data.localId);
    yield localStorage.setItem("expirationDate", expirationDate);

    yield put(actions.authSuccess(resp.data.idToken, resp.data.localId));
    yield put(actions.checkAuthTimeout(resp.data.expiresIn));
  } catch (err) {
    yield put(actions.authFail(err));
  }
}

export function* checkAuthStatusSaga(action) {
  const token = yield localStorage.getItem("token");
  if (!token) {
    yield put(actions.logout());
  } else {
    // because we get a string from local storage and need to turn it to js date object
    const expirationDate = yield new Date(
      localStorage.getItem("expirationDate")
    );
    if (expirationDate > new Date()) {
      const userId = yield localStorage.getItem("userId");
      yield put(actions.authSuccess(token, userId));
      yield put(
        actions.checkAuthTimeout(
          (expirationDate.getTime() - new Date().getTime()) / 1000
        )
      );
    } else {
      yield put(actions.logout());
    }
  }
}
