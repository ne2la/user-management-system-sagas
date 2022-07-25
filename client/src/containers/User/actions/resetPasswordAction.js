import {
    DO_RESET_PASSWORD_REQUEST,
    DO_RESET_PASSWORD_IN_PROGRESS,
    DO_RESET_PASSWORD_SUCCESS,
    DO_RESET_PASSWORD_FAILED,

} from "../constants/constants";

const doResetPassword = (payload) => ({
    type: DO_RESET_PASSWORD_REQUEST,
    payload
});

const doResetPasswordProgress = () => ({
    type: DO_RESET_PASSWORD_IN_PROGRESS
});

const doResetPasswordSuccess = (result) => ({
    type: DO_RESET_PASSWORD_SUCCESS,
    result,
});

const doResetPasswordFailed = (error) => ({
    type: DO_RESET_PASSWORD_FAILED,
    error
});

export { doResetPassword,doResetPasswordProgress,doResetPasswordSuccess,doResetPasswordFailed };
