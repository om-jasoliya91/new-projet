import { createRouter, createWebHistory } from 'vue-router'
import RegisterView from '@/components/pages/RegisterView.vue'
import LoginView from '@/components/pages/LoginView.vue'
import HomeView from '@/components/pages/Dashboard/HomeView.vue'
import ProfileView from '@/components/pages/Dashboard/ProfileView.vue'
import CourseView from '@/components/pages/Dashboard/CourseView.vue'

const routes = [
  { path: '/', name: 'register', component: RegisterView },
  { path: '/login', name: 'login', component: LoginView },
  { path: '/home', name: 'home', component: HomeView, meta: { requiresAuth: true } },
  { path: '/profile', name: 'profile', component: ProfileView, meta: { requiresAuth: true } },
  { path: '/course', name: 'course', component: CourseView, meta: { requiresAuth: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})
// beforeEach is a Global Navigation Guard in Vue Router.Run this function BEFORE every route change.
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.meta.requiresAuth && !token) {
    return next('/login')
  }
  next()
})

export default router
