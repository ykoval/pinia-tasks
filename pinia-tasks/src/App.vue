<template>
  <main>

    <!-- heading -->
    <header>
      <img src="./assets/pinia-logo.svg" alt="pinia-logo" />
      <h1>Pinia tasks</h1>
    </header>

    <!-- new task form -->
    <div class="new-task-form">
      <TaskForm/>
    </div>

    <!-- nav filter -->
    <nav class="filter">
      <button @click="filter = 'all'">All tasks</button>
      <button @click="filter = 'favs'">Fav tasks</button>
    </nav>

    <!-- loading -->
    <div class="loading" v-if="loading">Loading tasks...</div>

    <!-- task list -->
    <div class="task-list" v-if="filter === 'all'">
      <p>You have {{allCount}} tasks todo</p>
      <div v-for="task in tasks">
        <TaskDetails :task="task" />
      </div>
    </div>

    <div class="task-list" v-if="filter === 'favs'">
      <p>You have {{favCount}} favs left todo</p>
      <div v-for="task in favs">
        <TaskDetails :task="task" />
      </div>
    </div>

    <button @click="taskStore.$reset">Reset state</button>
  </main>
</template>

<script>
import {useTaskStore} from "@/stores/TaskStore.js";
import TaskDetails from "@/components/TaskDetails.vue";
import {ref} from "vue";
import TaskForm from "@/components/TaskForm.vue";
import {storeToRefs} from "pinia";

export default {
  components: {TaskForm, TaskDetails},
  setup() {
    const taskStore = useTaskStore()

    const {tasks, loading, allCount, favCount, favs} = storeToRefs(taskStore)

    //fetch cards
    taskStore.getTasks()

    const filter = ref('all')

    return {taskStore, filter, tasks, loading, allCount, favCount, favs}
  }
}
</script>
