import { takeEvery, put, call } from "redux-saga/effects";

import { DO_DELETE_USER_REQUEST} from "../constants/constants";

import {
    doDeleteUserInProgress,
    doDeleteUserSuccess,
    doDeleteUserFailed
} from "../actions/deleteUserAction"

import apiHandler from "../../../middlewares/apiHandler";

export function* doDeleteUser(data) {
  console.log(data)
    try {
      yield put(doDeleteUserInProgress());
      const result = yield call(apiHandler.deleteUser,data); 
      console.log(result)
      yield put(doDeleteUserSuccess(result.data.message));
      data.callback();
    
    } catch (error) {
      console.log(error)
      yield put(doDeleteUserFailed(error.response.data));
    }
}

export default function* doDeleteUserSagas() {
    yield* [takeEvery(DO_DELETE_USER_REQUEST, doDeleteUser)]; 
}