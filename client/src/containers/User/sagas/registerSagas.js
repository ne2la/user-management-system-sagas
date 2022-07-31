import { takeEvery, put, call } from "redux-saga/effects";
import {
  doRegisterInProgress,
  doRegisterSuccess,
  doRegisterFailed,
} from "../actions/registerActions";
import apiHandler from "../../../middlewares/apiHandler";
import { DO_REGISTER_REQUEST } from "../constants/constants";

export function* doRegister(data) {
  
  try {

    yield put(doRegisterInProgress());
    const result = yield call(apiHandler.register, data);
    yield put(doRegisterSuccess(result.data.message));

  } catch (error) {
    yield put(doRegisterFailed(error.response.data));
  }
}
export default function* registerSagas() {
  yield* [takeEvery(DO_REGISTER_REQUEST, doRegister)];
}
