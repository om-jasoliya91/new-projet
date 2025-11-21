import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'

import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
const app = createApp(App)

app.use(createPinia())
app.use(router)

// Set base API URL (optional)
// meta:It is an object created by JavaScript (ES modules) that gives information about the current file/module.
axios.defaults.baseURL = import.meta.env.VITE_API_URL
console.log(import.meta.env.VITE_API_URL)

const token = localStorage.getItem('token')
//check if token available so Bearer token Checked
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

app.mount('#app')
