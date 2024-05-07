import { defineStore } from 'pinia'
import { API_URL_TASKS } from '@/constants'

export const useTaskStore = defineStore('taskStore', {
  state: (): State => ({
    tasks: [],
    loading: false
  }),
  getters: {
    favs(): Array<Task> {
      return this.tasks.filter((t) => t.isFav)
    },
    favCount(): number {
      return this.tasks.reduce((p, c) => {
        return c.isFav ? p + 1 : p
      }, 0)
    },
    allCount: (state) => {
      return state.tasks.length
    }
  },
  actions: {
    async getTasks() {
      this.loading = true
      const res = await fetch(API_URL_TASKS)
      const data = await res.json()
      this.tasks = data
      this.loading = false
    },
    async addTask(task: Task) {
      this.tasks.push(task)

      const res = await fetch(API_URL_TASKS, {
        method: 'POST',
        body: JSON.stringify(task),
        headers: { 'Content-Type': 'application/json' }
      })

      if (res.type === 'error') console.error(res.statusText)
    },
    async deleteTask(id: string) {
      this.tasks = this.tasks.filter((t) => t.id !== id)

      const res = await fetch(`${API_URL_TASKS}/${id}`, {
        method: 'DELETE'
      })

      if (res.type === 'error') console.error(res.statusText)
    },
    async toggleFav(id: string): Promise<void> {
      const task = this.tasks.find((t) => t.id === id)
      if(!task) return
      task.isFav = !task.isFav
      const res = await fetch(`${API_URL_TASKS}/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ isFav: task.isFav }),
        headers: { 'Content-Type': 'application/json' }
      })

      if (res.type === 'error') console.error(res.statusText)
    }
  }
})
