import {
    DO_LOGIN_REQUEST,
    DO_LOGIN_IN_PROGRESS,
    DO_LOGIN_SUCCESS,
    DO_LOGIN_FAILED,
  } from "../constants/constants";
  
  const doLogin = (payload, callback) => ({
    type: DO_LOGIN_REQUEST,
    payload, //email and password
    callback, //function
  });
  const doLoginInProgress = () => ({
    type: DO_LOGIN_IN_PROGRESS,
  });
  const doLoginSuccess = (result) => ({
    type: DO_LOGIN_SUCCESS,
    result,
  });
  const doLoginFailed = (error) => ({
    type: DO_LOGIN_FAILED,
    error,
  });
  
  export { doLogin, doLoginSuccess, doLoginFailed, doLoginInProgress };
  