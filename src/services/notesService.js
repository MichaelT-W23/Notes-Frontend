import {
  getUserNotes,
  getNotesByTag,
  getAllTags
} from '../api/notesAPI.js'

export async function getAllUserNotes(userId) {
  try {
    const data = await getUserNotes(userId);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getNotesByTagName(tagName) {
  try {
    const data = await getNotesByTag(tagName);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllUserTags(userId) {
  try {
    const data = await getAllTags(userId);
    return data;
  } catch (error) {
    console.log(error);
  }
}