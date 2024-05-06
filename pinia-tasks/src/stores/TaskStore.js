import {defineStore} from "pinia";

export const useTaskStore = defineStore('taskStore', {
    state: () => ({
        tasks:[],
        loading: false,
    }),
    getters: {
        favs() {
         return this.tasks.filter(t => t.isFav);
        },
        favCount() {
            return this.tasks.reduce((p,c) => {
                return c.isFav ? p + 1 : p;
            }, 0)
        },
        allCount: (state) => {
            return state.tasks.length
        },
    },
    actions: {
        async getTasks() {
            this.loading = true;
            const res = await fetch('http://localhost:3000/tasks')
            const data = await res.json()
            this.tasks = data
            this.loading = false
        },
        async addTask(task) {
            this.tasks.push(task)

            const res = await fetch('http://localhost:3000/tasks', {
                method: 'POST',
                body: JSON.stringify(task),
                headers: {'Content-Type': 'application/json'},
            })

            if(res.type === 'error') console.error(res.statusText)
        },
        async deleteTask(id) {
            this.tasks = this.tasks.filter(t=>t.id !== id)

            const res = await fetch(`http://localhost:3000/tasks/${id}`, {
                method: 'DELETE'
            })

            if(res.type === 'error') console.error(res.statusText)
        },
        async toggleFav(id) {
            const task = this.tasks.find(t=> t.id === id)
            task.isFav = !task.isFav

            const res = await fetch(`http://localhost:3000/tasks/${id}`, {
                method: 'PATCH',
                body: JSON.stringify({isFav: task.isFav}),
                headers: {'Content-Type': 'application/json'},
            })

            if(res.type === 'error') console.error(res.statusText)
        }
    }
})