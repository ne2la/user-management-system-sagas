import { createSelector } from "reselect";

const forgotPasswordReducer = (state) => state.forgotPasswordReducer;
console.log(forgotPasswordReducer)

const forgotPassword_inProgress = () =>
  createSelector(forgotPasswordReducer, (currentState) => currentState.inProgress);

const forgotPassword_result = () =>
  createSelector(forgotPasswordReducer, (currentState) => currentState.result);

const forgotPassword_error = () =>
  createSelector(forgotPasswordReducer, (currentState) => currentState.error);

export { forgotPassword_inProgress,forgotPassword_result,forgotPassword_error };  