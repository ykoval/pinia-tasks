<template>
  <main>
    <!-- heading -->
    <header>
      <img src="./assets/pinia-logo.svg" alt="pinia-logo" />
      <h1>{{$t('title')}}</h1>
      <div class="location-select">
        <a @click="$i18n.locale = 'EN';setLocale('EN')">EN</a> | <a @click="$i18n.locale = 'DE';setLocale('DE')">DE</a>
      </div>
    </header>

    <!-- new task form -->
    <div class="new-task-form">
      <TaskForm />
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
      <p>You have {{ allCount }} tasks todo</p>
      <div v-for="task in tasks">
        <TaskDetails :task="task" />
      </div>
    </div>

    <div class="task-list" v-if="filter === 'favs'">
      <p>You have {{ favCount }} favs left todo</p>
      <div v-for="task in favs">
        <TaskDetails :task="task" />
      </div>
    </div>

    <button @click="taskStore.$reset">Reset state</button>
  </main>
</template>

<script lang="ts">
import { useTaskStore } from '@/stores/TaskStore.js'
import TaskDetails from '@/components/TaskDetails.vue'
import { ref } from 'vue'
import TaskForm from '@/components/TaskForm.vue'
import { storeToRefs } from 'pinia'
import {type AppLocale, LOC_STORAGE_LOCALE} from "@/type";

export default {
  components: { TaskForm, TaskDetails },
  setup() {
    const taskStore = useTaskStore()

    const { tasks, loading, allCount, favCount, favs } = storeToRefs(taskStore)

    //fetch cards
    taskStore.getTasks()

    const filter = ref('all')

    const setLocale =(locale: AppLocale) =>{
      localStorage.setItem(LOC_STORAGE_LOCALE, locale)
    }

    return { taskStore, filter, tasks, loading, allCount, favCount, favs, setLocale }
  }
}
</script>
