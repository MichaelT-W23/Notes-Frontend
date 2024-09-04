import {
  registerUser,
  loginUser,
  getUserByUsername
} from '../api/userAPI.js';

export async function createNewUser(userData) {
  try {
    const data = await registerUser(userData);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function loginExistingUser(userData) {
  try {
    const data = await loginUser(userData);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getUser(username) {
  try {
    const data = await getUserByUsername(username);
    return data;
  } catch (error) {
    console.log(error);
  }
}