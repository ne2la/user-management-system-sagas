import { userHandler } from "./src/handlers";

export const registerUser = async (event) =>
    await userHandler.registerUser(event);

export const fetchUsers = async (event) =>
  await userHandler.fetchUsers(event);

export const signInUser = async (event) => 
  await userHandler.signInUser(event);

export const forgotPassword = async (event) => 
  await userHandler.forgotPassword(event);

export const resetPassword = async (event) =>
  await userHandler.resetPassword(event);

export const deleteUser = async (event) =>
  await userHandler.deleteUser(event);