import { takeEvery, put, call } from "redux-saga/effects";
import{
    doResetPasswordProgress,
    doResetPasswordSuccess,
    doResetPasswordFailed
} from "../actions/resetPasswordAction";
import apiHandler from "../../../middlewares/apiHandler";
import { DO_RESET_PASSWORD_REQUEST} from "../constants/constants";

export function* doResetPassword(data){
    
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