import {
    DO_DELETE_USER_REQUEST,
    DO_DELETE_USER_IN_PROGRESS,
    DO_DELETE_USER_SUCCESS,
    DO_DELETE_USER_FAILED,
} from "../constants/constants";

const doDeleteUser = (payload) => ({
    type: DO_DELETE_USER_REQUEST,
    payload
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

export { doDeleteUser,doDeleteUserInProgress,doDeleteUserSuccess,doDeleteUserFailed };