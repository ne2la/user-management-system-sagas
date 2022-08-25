import {
    DO_VERIFY_EMAIL_REQUEST,
    DO_VERIFY_EMAIL_IN_PROGRESS,
    DO_VERIFY_EMAIL_SUCCESS,
    DO_VERIFY_EMAIL_FAILED
} from "../constants/constants";

const doVerifyEmail = (payload) => ({
    type: DO_VERIFY_EMAIL_REQUEST,
    payload
});

const doVerifyEmailProgress = () => ({
    type: DO_VERIFY_EMAIL_IN_PROGRESS
});

const doVerifyEmailSuccess = (result) => ({
    type: DO_VERIFY_EMAIL_SUCCESS,
    result,
});

const doVerifyEmailFailed = (error) => ({
    type: DO_VERIFY_EMAIL_FAILED,
    error
});

export { doVerifyEmail,doVerifyEmailProgress,doVerifyEmailSuccess,doVerifyEmailFailed };


