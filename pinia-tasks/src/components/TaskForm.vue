<template>
  <form @submit.prevent="handleSubmit">
    <input type="text" placeholder="I need too ..." v-model="newTask" />
    <button>Add</button>
  </form>
</template>

<script lang="ts">
import { useTaskStore } from '@/stores/TaskStore.js'
import { ref } from 'vue'

export default {
  setup() {
    const taskStore = useTaskStore()

    const newTask = ref('')

    const handleSubmit = () => {
      if (newTask.value.length > 0) {
        taskStore.addTask({
          title: newTask.value,
          isFav: false,
          id: new Date().getTime().toString()
        })
        newTask.value = ''
      }
    }

    return { newTask, handleSubmit }
  }
}
</script>
