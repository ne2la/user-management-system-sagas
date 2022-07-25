import { createSelector } from "reselect";

const deleteUserReducer = (state) => state.deleteUserReducer;

const deleteUser_inProgress = () =>
  createSelector(deleteUserReducer, (currentState) => currentState.inProgress);

const deleteUser_result = () =>
  createSelector(deleteUserReducer, (currentState) => currentState.result);

const deleteUser_error = () =>
  createSelector(deleteUserReducer, (currentState) => currentState.error);

export { deleteUser_inProgress, deleteUser_result,deleteUser_error };