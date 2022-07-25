import { takeEvery, put, call } from "redux-saga/effects";
import { DO_FORGOT_PASSWORD_REQUEST} from "../constants/constants";

import{
    doForgotPasswordProgress,
    doForgotPasswordSuccess,
    doForgotPasswordFailed
} from "../actions/forgotPasswordAction";

import apiHandler from "../../../middlewares/apiHandler";

export function* doForgotPassword(data){
    console.log(data)

    try {
        yield put(doForgotPasswordProgress());
        const result = yield call(apiHandler.forgotPassword,data);
        console.log(result.data.message); 
        yield put(doForgotPasswordSuccess(result.data.message));
    } catch (error) {
        yield put(doForgotPasswordFailed(error.response.data));
    }

}

export default function* forgotPasswordSagas() {
    yield* [takeEvery(DO_FORGOT_PASSWORD_REQUEST, doForgotPassword)];    
}