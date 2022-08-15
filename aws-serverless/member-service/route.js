import { userDetailsHandler } from "./src/handlers";

export const addUser = async (event) => 
    await userDetailsHandler.addUser(event);

export const fetchUsers = async (event) =>
  await userDetailsHandler.fetchUsers(event);

export const deleteUser = async (event) =>
  await userDetailsHandler.deleteUser(event);

export const updateUser = async (event) =>
  await userDetailsHandler.updateUser(event);