import {
    DO_REGISTER_IN_PROGRESS,
    DO_REGISTER_SUCCESS,
    DO_REGISTER_FAILED,
  } from "../constants/constants";
  
  const initialState = {
    inProgress: false,
    status: null,
    error: null,
  };
  
  export default function registerReducer(state = initialState, action = {}) {
    switch (action.type) {
      case DO_REGISTER_IN_PROGRESS:
        return { ...initialState, inProgress: true };
      case DO_REGISTER_SUCCESS:
        return { ...initialState, status: action.result };
      case DO_REGISTER_FAILED:
        return { ...initialState, error: action.error };
  
      default:
        return initialState;
    }
  }
  