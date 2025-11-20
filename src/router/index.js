import { createRouter, createWebHistory } from 'vue-router'
import RegisterView from '@/components/pages/RegisterView.vue'
import LoginView from '@/components/pages/LoginView.vue'

const routes = [
  { path: '/', name: 'register', component: RegisterView },
  { path: '/login', name: 'login', component: LoginView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
