import { createRouter, createWebHistory } from 'vue-router'
import RegisterView from '@/components/pages/RegisterView.vue'
import LoginView from '@/components/pages/LoginView.vue'
import HomeView from '@/components/pages/Dashboard/HomeView.vue'

const routes = [
  { path: '/', name: 'register', component: RegisterView },
  { path: '/login', name: 'login', component: LoginView },
  { path: '/home', name: 'home', component: HomeView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
