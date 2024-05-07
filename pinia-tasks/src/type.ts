export interface AppState {
    tasks: Task[]
    loading: boolean
}

export interface Task {
    id: string
    isFav: boolean
    title: string
}
export type AppLocale = 'EN' | 'DE'
export const LOC_STORAGE_LOCALE = "app_locale"
