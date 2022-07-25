import { createSelector } from "reselect";

const resetPasswordReducer = (state) => state.resetPasswordReducer;
console.log(resetPasswordReducer)

const resetPassword_inProgress = () =>
  createSelector(resetPasswordReducer, (currentState) => currentState.inProgress);

const resetPassword_result = () =>
  createSelector(resetPasswordReducer, (currentState) => currentState.result);

const resetPassword_error = () =>
  createSelector(resetPasswordReducer, (currentState) => currentState.error);

export { resetPassword_inProgress,resetPassword_result,resetPassword_error };  