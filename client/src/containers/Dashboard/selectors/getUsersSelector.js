import { createSelector } from "reselect";

const getUsersReducer = (state) => state.getUsersReducer;

const getUsers_inProgress = () =>
  createSelector(getUsersReducer, (currentState) => currentState.inProgress);

const getUsers_allUsers = () =>
  createSelector(getUsersReducer, (currentState) => currentState.allUsers);

const getUsers_error = () =>
  createSelector(getUsersReducer, (currentState) => currentState.error);

export { getUsers_inProgress, getUsers_allUsers, getUsers_error };