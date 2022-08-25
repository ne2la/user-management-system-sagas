import { takeEvery, put, call } from "redux-saga/effects";
import{
    doVerifyEmailProgress,
    doVerifyEmailSuccess,
    doVerifyEmailFailed
} from "../actions/verifyEmail";
import apiHandler from "../../../middlewares/apiHandler";
import { DO_VERIFY_EMAIL_REQUEST} from "../constants/constants";

export function* doVerifyEmail(data){
    
    try {

        yield put(doVerifyEmailProgress());
        const result = yield call(apiHandler.verifyEmail,data); 
        yield put(doVerifyEmailSuccess(result.data.message));

    } catch (error) {
        yield put(doVerifyEmailFailed(error.response.data));
    }
}

export default function* verifyEmailSagas() {
    yield* [takeEvery(DO_VERIFY_EMAIL_REQUEST, doVerifyEmail)];    
}