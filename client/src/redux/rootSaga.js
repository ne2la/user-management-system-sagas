import { fork, all } from "redux-saga/effects";

import registerSagas from "../containers/User/sagas/registerSagas";
import loginSagas from "../containers/User/sagas/loginSagas";
import forgotPasswordSagas from "../containers/User/sagas/forgotPasswordSagas";
import resetPasswordSagas from "../containers/User/sagas/resetPasswordSagas";
import userSagas from "../containers/Dashboard/sagas/userSagas";

export default function* rootSaga() {
  return yield all([
    
    fork(registerSagas), 
    fork(loginSagas), 
    fork(forgotPasswordSagas),
    fork(resetPasswordSagas),
    fork(userSagas)
    
  ]);
}
