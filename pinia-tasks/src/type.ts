interface State {
    tasks: Task[]
    loading: boolean
}

interface Task {
    id: string
    isFav: boolean
    title: string
}
