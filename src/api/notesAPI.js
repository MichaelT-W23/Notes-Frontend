import axiosInstance from '../lib/axios.js'


export async function getUserNotes(userId) {
  const response = await axiosInstance.get(`/users/${userId}/notes`);
  return response.data;
}


export async function getNotesByTag(tagName) {
  const response = await axiosInstance.get(`/notes/tag/${tagName}`);
  return response.data;
}


export async function getAllTags(userId) {
  const response = await axiosInstance.get(`/users/${userId}/tags`);
  return response.data;
}

    