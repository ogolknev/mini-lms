import Root from '../ui/root.vue'
import { createApp } from 'vue'
import ui from '@nuxt/ui/vue-plugin'

import '../styles/main.css'
import { createPinia } from 'pinia'
import router from '../router/router'

const app = createApp(Root)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(ui)

app.mount('#app')
