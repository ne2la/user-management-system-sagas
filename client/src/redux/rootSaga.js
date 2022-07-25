import { fork, all } from "redux-saga/effects";

import registerSagas from "../containers/User/sagas/registerSagas";
import loginSagas from "../containers/User/sagas/loginSagas";
import forgotPasswordSagas from "../containers/User/sagas/forgotPasswordSagas";
import resetPasswordSagas from "../containers/User/sagas/resetPasswordSagas";
import getUsersSagas from "../containers/Dashboard/sagas/getUsersSagas";
import deleteUserSagas from "../containers/Dashboard/sagas/deleteUserSagas";
import addUserSagas from "../containers/Dashboard/sagas/addUserSagas";

export default function* rootSaga() {
  return yield all(
    [ fork(registerSagas), fork(loginSagas), fork(forgotPasswordSagas),
      fork(resetPasswordSagas), fork(getUsersSagas), fork(deleteUserSagas),
      fork(addUserSagas) 
    ]
    );
}
