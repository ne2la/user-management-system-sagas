import { takeEvery, put, call } from "redux-saga/effects";
import {
    doGetUsersInProgress,
    doGetUsersSuccess,
    doGetUsersFailed,
    doGetUsers,

    doDeleteUserInProgress,
    doDeleteUserSuccess,
    doDeleteUserFailed,

    doAddUserInProgress,
    doAddUserSuccess,
    doAddUserFailed,

    doUpdateUserInProgress,
    doUpdateUserSuccess,
    doUpdateUserFailed,

} from "../actions/userAction";
import apiHandler from "../../../middlewares/apiHandler";
import { 
  DO_GET_USERS_REQUEST,
  DO_DELETE_USER_REQUEST,
  DO_ADD_USER_REQUEST,
  DO_UPDATE_USER_REQUEST

} from "../constants/constants";

// Get User Sagas

export function* doGetAllUsers() {
    try {

      yield put(doGetUsersInProgress());
      const result = yield call(apiHandler.getUsers); 
      yield put(doGetUsersSuccess(result.data));
    
    } catch (error) {
      yield put(doGetUsersFailed(error.response.data));
    }
}

// Delete User Sagas

export function* doDeleteUser(data) {
    const {callback} = data;

      try {

        yield put(doDeleteUserInProgress());
        const result = yield call(apiHandler.deleteUser,data); 
        yield put(doDeleteUserSuccess(result.data.message));
        yield put(doGetUsers());
        callback.getNotification();

      } catch (error) {

        callback.getNotificationFailed(error.response.data.message);
        yield put(doDeleteUserFailed(error.response.data));
      }
}

// Add user Sagas

export function* doAddUser(data) {
    
      try {

        yield put(doAddUserInProgress());
        const result = yield call(apiHandler.addUser,data); 
        yield put(doAddUserSuccess(result.data));
        yield put(doGetUsers())
        data.callback();
        
      } catch (error) {
        yield put(doGetUsers())
        yield put(doAddUserFailed(error.response.data));
      }
}

// Update User Sagas

export function* doUpdateUser(data) {

    try {
      
        yield put(doUpdateUserInProgress());
        const result = yield call(apiHandler.updateUser,data); 
        yield put(doUpdateUserSuccess(result.data));
        yield put(doGetUsers())
        data.callback();
      
    } catch (error) {
      yield put(doUpdateUserFailed(error.response.data));
    }
}


export default function* doUserSagas() {
  yield* [takeEvery(DO_GET_USERS_REQUEST, doGetAllUsers)]; 
  yield* [takeEvery(DO_DELETE_USER_REQUEST, doDeleteUser)]; 
  yield* [takeEvery(DO_ADD_USER_REQUEST, doAddUser)]; 
  yield* [takeEvery(DO_UPDATE_USER_REQUEST, doUpdateUser)]; 
}






