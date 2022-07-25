import { takeEvery, put, call } from "redux-saga/effects";

import { DO_LOGIN_REQUEST } from "../constants/constants";
import {
  doLoginInProgress,
  doLoginSuccess,
  doLoginFailed,
} from "../actions/loginActions";

import apiHandler from "../../../middlewares/apiHandler";

export function* doLogin(data) {
  console.log(data)
  try {
    yield put(doLoginInProgress());
    const result = yield call(apiHandler.login, data); // get the result from Backend
    console.log(result.data)
    yield put(doLoginSuccess(result.data.data));
    // localStorage.setItem("profile", result.data);
    localStorage.setItem("profile", JSON.stringify({ ...result?.data }));
    data.callback();
  } catch (error) {
    yield put(doLoginFailed(error.response.data));
  }
}

export default function* loginSagas() {
  yield* [takeEvery(DO_LOGIN_REQUEST, doLogin)]; // ??
}
