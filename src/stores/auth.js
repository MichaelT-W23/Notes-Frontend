import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {

  const user = ref({
    username: localStorage.getItem('username') || null,
    email: null,
  });

  function login(userData) {
    user.value = userData;
    localStorage.setItem('username', userData.username);
  }
  
  if (localStorage.getItem('username')) {
    user.value.username = localStorage.getItem('username');
  }

  function logout() {
    user.value = {
      username: null,
      email: null,
      userId: null
    };

    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    localStorage.removeItem('notes');
    localStorage.removeItem('tags');
  }

  function getCurrentUser() {
    return user.value;
  }

  function getUsername() {
    return user.value.username || localStorage.getItem('username');
  }

  function getEmail() {
    return user.value.email;
  }

  function setUserId(id) {
    user.value.userId = id;
    localStorage.setItem('userId', id);
  }

  function getUserId() {
    return localStorage.getItem('userId');
  }

  function setNotes(notes) {
    user.value.notes = notes;
    localStorage.setItem('notes', JSON.stringify(notes));
  }

  function getNotes() {
    return JSON.parse(localStorage.getItem('notes'));
  }

  function setTags(tags) {
    user.value.tags = tags;
    localStorage.setItem('tags', JSON.stringify(tags));
  }

  function getTags() {
    return localStorage.getItem('tags').split(",");
  }

  return { user, login, logout, getCurrentUser, getUsername, getEmail, 
           setUserId, getUserId, setNotes, getNotes, setTags, getTags };
});
