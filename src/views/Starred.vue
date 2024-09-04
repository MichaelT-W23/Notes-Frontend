<template>
  <p>Starred Notes</p>
  <div v-for="note in noteStore.getStarredNotes()" :key="note.id">
    <NoteCard :note="note" />
  </div>
</template>


<script setup>
import { useNotesStore } from "../stores/starred";
import NoteCard from "../components/NotesCard.vue";

const noteStore = useNotesStore();

</script>

