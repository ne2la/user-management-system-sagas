import { takeEvery, put, call } from "redux-saga/effects";

import { DO_ADD_USER_REQUEST } from "../constants/constants"

import {
    doAddUserInProgress,
    doAddUserSuccess,
    doAddUserFailed
} from "../actions/addUserAction";

import apiHandler from "../../../middlewares/apiHandler";

export function* doAddUser(data) {
    console.log(data)
      try {
        yield put(doAddUserInProgress());
        const result = yield call(apiHandler.addUser,data); 
        console.log(result)
        yield put(doAddUserSuccess(result));
      } catch (error) {
        console.log(error)
        yield put(doAddUserFailed(error.response.data));
      }
  }

export default function* doAddUserSagas() {
    yield* [takeEvery(DO_ADD_USER_REQUEST, doAddUser)]; 
}