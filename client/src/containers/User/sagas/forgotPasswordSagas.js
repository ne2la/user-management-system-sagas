import { takeEvery, put, call } from "redux-saga/effects";
import{
    doForgotPasswordProgress,
    doForgotPasswordSuccess,
    doForgotPasswordFailed
} from "../actions/forgotPasswordAction";
import apiHandler from "../../../middlewares/apiHandler";
import { DO_FORGOT_PASSWORD_REQUEST} from "../constants/constants";

export function* doForgotPassword(data){
    console.log(data)

    try {

        yield put(doForgotPasswordProgress());
        const result = yield call(apiHandler.forgotPassword,data);
        yield put(doForgotPasswordSuccess(result.data.message));
        
    } catch (error) {
        yield put(doForgotPasswordFailed(error.response.data));
    }

}

export default function* forgotPasswordSagas() {
    yield* [takeEvery(DO_FORGOT_PASSWORD_REQUEST, doForgotPassword)];    
}