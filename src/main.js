import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.config.globalProperties.state = {
  loggedInUser: "ylsewlys"
}

app.use(router).mount('#app')
