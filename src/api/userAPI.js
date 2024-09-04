import axiosInstance from '../lib/axios.js'


export async function registerUser(userData) {
  const response = await axiosInstance.post('/users', userData);
  return response.data;
}


export async function loginUser(userData) {
  const response = await axiosInstance.post('/users/login', userData);
  return response.data;
}


export async function getUserByUsername(username) {
  const response = await axiosInstance.get(`/users/${username}`);
  return response.data;
}

