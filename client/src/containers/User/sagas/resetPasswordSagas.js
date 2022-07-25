import { takeEvery, put, call } from "redux-saga/effects";
import { DO_RESET_PASSWORD_REQUEST} from "../constants/constants";

import{
    doResetPasswordProgress,
    doResetPasswordSuccess,
    doResetPasswordFailed
} from "../actions/resetPasswordAction";

import apiHandler from "../../../middlewares/apiHandler";

export function* doResetPassword(data){
    console.log(data)

    try {
        yield put(doResetPasswordProgress());
        const result = yield call(apiHandler.resetPassword,data); 
        yield put(doResetPasswordSuccess(result.data.message));

    } catch (error) {
        yield put(doResetPasswordFailed(error.response.data));
    }

}

export default function* resetPasswordSagas() {
    yield* [takeEvery(DO_RESET_PASSWORD_REQUEST, doResetPassword)];    
}