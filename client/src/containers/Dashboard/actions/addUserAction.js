import {
    DO_ADD_USER_REQUEST,
    DO_ADD_USER_IN_PROGRESS,
    DO_ADD_USER_SUCCESS,
    DO_ADD_USER_FAILED
} from "../constants/constants"

const doAddUser = (payload) => ({
    type: DO_ADD_USER_REQUEST,
    payload
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

export {doAddUser, doAddUserInProgress, doAddUserSuccess, doAddUserFailed};