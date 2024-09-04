import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useNotesStore = defineStore('notes', () => {

  const notes = ref(JSON.parse(localStorage.getItem('notes') || '[]'));

  function addNote(note) {
    notes.value.push({
      ...note,
      starred: true,
    });
    saveNotesToLocalStorage();
  }

  function removeNote(noteId) {
    notes.value = notes.value.filter(note => note.note_id !== noteId);
    saveNotesToLocalStorage();
  }

  function starNote(noteId) {
    const note = notes.value.find(note => note.note_id === noteId);

    if (note) {
      note.starred = true;
      console.log(`Note with ID ${noteId} starred.`);
      saveNotesToLocalStorage();
    }
  }

  function unstarNote(noteId) {
    const note = notes.value.find(note => note.note_id === noteId);
    if (note) {
      note.starred = false;
      console.log(`Note with ID ${noteId} unstarred.`);
      saveNotesToLocalStorage();
    }
  }

  function getStarredNotes() {
    return notes.value.filter(note => note.starred);
  }

  function getNumberOfStoredNotes() {
    return notes.value.length;
  }

  function isNoteStarred(note) {
    const foundNote = notes.value.find(n => n.note_id === note.note_id);
    return foundNote ? foundNote.starred : false;
  }

  function saveNotesToLocalStorage() {
    localStorage.setItem('notes', JSON.stringify(notes.value));
  }

  watch(notes, (newNotes) => {
    saveNotesToLocalStorage();
  }, { deep: true });

  return {
    notes,
    addNote,
    removeNote,
    starNote,
    unstarNote,
    getStarredNotes,
    getNumberOfStoredNotes,
    isNoteStarred
  };
});
