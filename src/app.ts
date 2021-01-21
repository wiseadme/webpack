import './assets/scss/main.scss'
import { createApp } from 'vue'
import { store } from './store'
import { router } from './router'
import App from '@/App.vue'
import VueLand from 'vueland'
import 'vueland/dist/vueland.css'

const app = createApp(App)

app.use(store)
app.use(router)
app.use(VueLand)
app.mount('#app')
