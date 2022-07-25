import {
    DO_GET_USERS_REQUEST,
    DO_GET_USERS_IN_PROGRESS,
    DO_GET_USERS_SUCCESS,
    DO_GET_USERS_FAILED
} from "../constants/constants";

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

export { doGetUsers, doGetUsersInProgress, doGetUsersSuccess, doGetUsersFailed };