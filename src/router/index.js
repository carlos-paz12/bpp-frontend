import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import Dashboard from '../components/Dashboard.vue'
import Teste from '@/components/Teste.vue'

const routes = [
  { path: '/', component: Login },
  { path: '/dashboard', component: Dashboard },
  { path: '/teste', component: Teste }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
