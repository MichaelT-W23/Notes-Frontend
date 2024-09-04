<template>
  <div class="note-view">
    <div class="note-header">
      <h2>{{ note.title }}</h2>
      <span 
        class="star-icon" 
        :class="{ starred: notesStore.isNoteStarred(note) }"
        @click="toggleStar"
      >
        ★
      </span>
    </div>
    <p>{{ note.content }}</p>
    <p><strong>Created At:</strong> {{ formatDate(note.created_at) }}</p>
    <p><strong>Updated At:</strong> {{ formatDate(note.updated_at) }}</p>
  </div>
</template>


<script setup>
import { ref, toRefs, watch, onMounted } from 'vue';
import { formatDate } from "../utils/dates";
import { useNotesStore } from "../stores/starred";

const props = defineProps({
  note: {
    type: Object,
    required: true,
  },
});

const { note } = toRefs(props);

const notesStore = useNotesStore();

const isStarred = ref(localStorage.getItem(`note-${note.value.note_id}-starred`) === 'true' || note.value.starred);

watch(isStarred, (newVal) => {
  if (newVal) {
    notesStore.starNote(note.value.note_id);
  } else {
    notesStore.unstarNote(note.value.note_id);
  }
  localStorage.setItem(`note-${note.value.note_id}-starred`, newVal);
});

const toggleStar = () => {
  isStarred.value = !isStarred.value;
};

onMounted(() => {
  const savedStarredState = localStorage.getItem(`note-${note.value.note_id}-starred`);
  if (savedStarredState !== null) {
    isStarred.value = savedStarredState === 'true';
  }
});

</script>


<style scoped>
.note-view {
  border: 1px solid #ddd;
  padding: 16px;
  margin-bottom: 16px;
  border-radius: 8px;
  background-color: #f9f9f9;
  width: 500px;
}

.note-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

h2 {
  margin-top: 0;
  margin-bottom: 0;
}

p {
  margin: 4px 0;
}

.star-icon {
  cursor: pointer;
  font-size: 24px;
  color: gray;
  transition: color 0.3s;
}

.star-icon.starred {
  color: orange;
}

</style>
