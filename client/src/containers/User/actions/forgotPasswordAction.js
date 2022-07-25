import {
    DO_FORGOT_PASSWORD_REQUEST,
    DO_FORGOT_PASSWORD_IN_PROGRESS,
    DO_FORGOT_PASSWORD_SUCCESS,
    DO_FORGOT_PASSWORD_FAILED
} from "../constants/constants";

const doForgotPassword = (payload) => ({
    type: DO_FORGOT_PASSWORD_REQUEST,
    payload
});

const doForgotPasswordProgress = () => ({
    type: DO_FORGOT_PASSWORD_IN_PROGRESS
});

const doForgotPasswordSuccess = (result) => ({
    type: DO_FORGOT_PASSWORD_SUCCESS,
    result,
});

const doForgotPasswordFailed = (error) => ({
    type: DO_FORGOT_PASSWORD_FAILED,
    error
});

export { doForgotPassword,doForgotPasswordProgress,doForgotPasswordSuccess,doForgotPasswordFailed };


