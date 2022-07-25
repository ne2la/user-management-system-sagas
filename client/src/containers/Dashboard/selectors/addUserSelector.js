import { createSelector } from "reselect";

const addUserReducer = (state) => state.addUserReducer;

const addUser_inProgress = () =>
  createSelector(addUserReducer, (currentState) => currentState.inProgress);

const addUser_result = () =>
  createSelector(addUserReducer, (currentState) => currentState.result);

const addUser_error = () =>
  createSelector(addUserReducer, (currentState) => currentState.error);

export { addUser_inProgress, addUser_result,addUser_error };