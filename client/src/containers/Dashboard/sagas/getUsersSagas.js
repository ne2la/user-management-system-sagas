import { takeEvery, put, call } from "redux-saga/effects";

import { DO_GET_USERS_REQUEST} from "../constants/constants";

import {
    doGetUsersInProgress,
    doGetUsersSuccess,
    doGetUsersFailed
} from "../actions/getUsersAction"

import apiHandler from "../../../middlewares/apiHandler";

export function* doGetUsers() {
    try {
      yield put(doGetUsersInProgress());
      const result = yield call(apiHandler.getUsers); 
      console.log(result)
      yield put(doGetUsersSuccess(result.data));
    
    } catch (error) {
      yield put(doGetUsersFailed(error.response.data));
    }
  }

  export default function* getUsersSagas() {
    yield* [takeEvery(DO_GET_USERS_REQUEST, doGetUsers)]; 
  }