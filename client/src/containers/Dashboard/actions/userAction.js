import {
    DO_GET_USERS_REQUEST,
    DO_GET_USERS_IN_PROGRESS,
    DO_GET_USERS_SUCCESS,
    DO_GET_USERS_FAILED,

    DO_DELETE_USER_REQUEST,
    DO_DELETE_USER_IN_PROGRESS,
    DO_DELETE_USER_SUCCESS,
    DO_DELETE_USER_FAILED,

    DO_ADD_USER_REQUEST,
    DO_ADD_USER_IN_PROGRESS,
    DO_ADD_USER_SUCCESS,
    DO_ADD_USER_FAILED,

    DO_UPDATE_USER_REQUEST,
    DO_UPDATE_USER_IN_PROGRESS,
    DO_UPDATE_USER_SUCCESS,
    DO_UPDATE_USER_FAILED,
    DO_DATA_UPDATE

} from "../constants/constants";

// Get Users

const doGetUsers = () => ({
    type: DO_GET_USERS_REQUEST,
});

const doGetUsersInProgress = () => ({
    type: DO_GET_USERS_IN_PROGRESS,
});

const doGetUsersSuccess = (result) => ({
    type: DO_GET_USERS_SUCCESS,
    result,
});

const doGetUsersFailed = (error) => ({
    type: DO_GET_USERS_FAILED,
    error,
});

// Delete User

const doDeleteUser = (payload,callback) => ({
    type: DO_DELETE_USER_REQUEST,
    payload,
    callback
});

const doDeleteUserInProgress = () => ({
    type: DO_DELETE_USER_IN_PROGRESS,
});

const doDeleteUserSuccess = (result) => ({
    type: DO_DELETE_USER_SUCCESS,
    result,
});

const doDeleteUserFailed = (error) => ({
    type: DO_DELETE_USER_FAILED,
    error,
});

// Add User

const doAddUser = (payload,callback) => ({
    type: DO_ADD_USER_REQUEST,
    payload,
    callback
});

const doAddUserInProgress = () => ({
    type: DO_ADD_USER_IN_PROGRESS,
});

const doAddUserSuccess = (result) => ({
    type: DO_ADD_USER_SUCCESS,
    result,
});

const doAddUserFailed = (error) => ({
    type: DO_ADD_USER_FAILED,
    error,
});

//Update User

const doUpdateUser = (payload,callback) => ({
    type: DO_UPDATE_USER_REQUEST,
    payload,
    callback
});

const doUpdateUserInProgress = () => ({
    type: DO_UPDATE_USER_IN_PROGRESS,
});

const doUpdateUserSuccess = (result) => ({
    type: DO_UPDATE_USER_SUCCESS,
    result,
});

const doUpdateUserFailed = (error) => ({
    type: DO_UPDATE_USER_FAILED,
    error,
});

export { 
    doGetUsers, doGetUsersInProgress, doGetUsersSuccess, doGetUsersFailed, 
    doDeleteUser,doDeleteUserInProgress,doDeleteUserSuccess,doDeleteUserFailed,
    doAddUser, doAddUserInProgress, doAddUserSuccess, doAddUserFailed,
    doUpdateUser, doUpdateUserInProgress, doUpdateUserSuccess, doUpdateUserFailed
};