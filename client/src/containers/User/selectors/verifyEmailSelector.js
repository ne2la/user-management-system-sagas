import { createSelector } from "reselect";

const verifyEmailReducer = (state) => state.verifyEmailReducer;
console.log(verifyEmailReducer)

const verifyEmail_inProgress = () =>
  createSelector(verifyEmailReducer, (currentState) => currentState.inProgress);

const verifyEmail_result = () =>
  createSelector(verifyEmailReducer, (currentState) => currentState.result);

const verifyEmail_error = () =>
  createSelector(verifyEmailReducer, (currentState) => currentState.error);

export { verifyEmail_inProgress,verifyEmail_result,verifyEmail_error };  