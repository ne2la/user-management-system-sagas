import {
    DO_REGISTER_REQUEST,
    DO_REGISTER_IN_PROGRESS,
    DO_REGISTER_SUCCESS,
    DO_REGISTER_FAILED,
  } from "../constants/constants";
  
  const doRegister = (payload) => ({
    type: DO_REGISTER_REQUEST,
    payload,
  });
  const doRegisterInProgress = () => ({
    type: DO_REGISTER_IN_PROGRESS,
  });
  const doRegisterSuccess = (result) => ({
    type: DO_REGISTER_SUCCESS,
    result,
  });
  const doRegisterFailed = (error) => ({
    type: DO_REGISTER_FAILED,
    error: error,
  });
  
  export {
    doRegister,
    doRegisterInProgress,
    doRegisterSuccess,
    doRegisterFailed,
  };
  