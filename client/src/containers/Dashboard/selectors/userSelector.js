import { createSelector } from "reselect";

const userReducer = (state) => state.userReducer;

//get users

const getUsers_inProgress = () =>
  createSelector(userReducer, (currentState) => currentState.inProgress);

const getUsers_allUsers = () =>
  createSelector(userReducer, (currentState) => currentState.allUsers);

const getUsers_error = () =>
  createSelector(userReducer, (currentState) => currentState.errorGetUsers);

// delete user 

const deleteUser_inProgress = () =>
  createSelector(userReducer, (currentState) => currentState.inProgress);

const deleteUser_result = () =>
  createSelector(userReducer, (currentState) => currentState.resultDeleteUser);

const deleteUser_error = () =>
  createSelector(userReducer, (currentState) => currentState.errorDeleteUser);

// add user

const addUser_inProgress = () =>
  createSelector(userReducer, (currentState) => currentState.inProgress);

const addUser_result = () =>
  createSelector(userReducer, (currentState) => currentState.resultAddUser);

const addUser_error = () =>
  createSelector(userReducer, (currentState) => currentState.errorAddUser);

// Update User

const updateUser_inProgress = () =>
  createSelector(userReducer, (currentState) => currentState.inProgress);

const updateUser_result = () =>
  createSelector(userReducer, (currentState) => currentState.resultUpdateUser);

const updateUser_error = () =>
  createSelector(userReducer, (currentState) => currentState.errorUpdateUser);


export {
    getUsers_inProgress, getUsers_allUsers, getUsers_error, 
    deleteUser_inProgress, deleteUser_result,deleteUser_error,
    addUser_inProgress, addUser_result,addUser_error,
    updateUser_inProgress, updateUser_result,updateUser_error
};  