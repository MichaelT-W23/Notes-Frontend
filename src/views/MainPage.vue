<template>
  <div class="container">
    <p class="title">{{ authStore.getUsername() }} - {{ authStore.getUserId() }}</p>
    <img :src="NotesPic" alt="Notes Image" />
    <div class="links">
      <router-link to="/Starred">Starred Notes</router-link>
      <a href="#" @click="handleLogout">Logout</a>
    </div>
    <div v-for="note in notes" :key="note.id">
      <NoteCard :note="note" />
    </div>
    <h3>Tags</h3>
    <ul>
      <li v-for="(tag, index) in tags" :key="index">{{ tag }}</li>
    </ul>
  </div>
</template>


<script setup>
import { ref } from 'vue';
import { useAuthStore } from "../stores/auth";
import { getUser } from "../services/userService";
import { getAllUserNotes, getAllUserTags } from "../services/notesService";
import NoteCard from "../components/NotesCard.vue";
import NotesPic from "../assets/notes.jpg";

const authStore = useAuthStore();
const notes = ref([]);
const tags = ref([]);

// Get all user notes and tags by user id
// set both in the authStore
getUser(authStore.getUsername()) 
  .then((userData) => {
    const userId = userData.user_id;
    authStore.setUserId(userId);
  
    return Promise.all([getAllUserNotes(userId), getAllUserTags(userId)]);
  })
  .then(([fetchedNotes, fetchedTags]) => {
    notes.value = fetchedNotes.map(note => ({ ...note }));
    tags.value = fetchedTags;

    console.log(notes.value);
    console.log(tags.value);

    authStore.setNotes(notes.value);
    authStore.setTags(tags.value);
  })
  .catch((error) => {
    console.error('Error:', error);
  });


const handleLogout = () => {
  authStore.logout();
  window.location.href = "/";
};

</script>


<style scoped>
.container {
  position: relative;
  margin-left: auto;
  width: 80%; 
  padding: 16px;
  border-radius: 8px;
}

.title {
  font-size: 30px;
  text-decoration: underline;
  margin-bottom: 10px;
}

img {
  width: 350px;
  height: auto;
  border: 1px solid black;
  margin-bottom: 10px;
}

.links {
  margin-bottom: 16px;
}

.links a {
  margin-left: 20px;
}

</style>
