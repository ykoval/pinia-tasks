import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from '@/App.vue'
import { createI18n } from 'vue-i18n'
import EN from '@/locale/en.json'
import DE from '@/locale/de.json'
import {LOC_STORAGE_LOCALE} from "@/type";


const i18n = createI18n({
  locale: localStorage.getItem(LOC_STORAGE_LOCALE) || 'EN',
  messages: {
    EN: EN,
    DE: DE
  }
})
const app = createApp(App)
app.use(createPinia())
app.use(i18n)
app.mount('#app')
