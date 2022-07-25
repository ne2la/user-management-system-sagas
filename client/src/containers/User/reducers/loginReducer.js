import {
    DO_LOGIN_IN_PROGRESS,
    DO_LOGIN_SUCCESS,
    DO_LOGIN_FAILED,
  } from "../constants/constants";
  
  const initialState = {
    inProgress: false,
    loggedUser: null,
    error: null,
  };
  
  export default function loginReducer(state = initialState, action = {}) {
    switch (action.type) {
      case DO_LOGIN_IN_PROGRESS:
        return { ...initialState, inProgress: true };
      case DO_LOGIN_SUCCESS:
        return { ...initialState, loggedUser: action.result };
      case DO_LOGIN_FAILED:
        return { ...initialState, error: action.error };
  
      default:
        return initialState;
    }
  }
  