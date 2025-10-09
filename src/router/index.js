import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import DashboardBolsista from '@/components/DashboardBolsista.vue'
import Teste from '@/components/Teste.vue'
import DashboardGerente from '@/components/DashboardGerente.vue'
import NovoUsuarioBolsista from '@/components/NovoUsuarioBolsista.vue'
import NovoUsuarioGerente from '@/components/NovoUsuarioGerente.vue'

const routes = [
  { path: '/', component: Login },
  { path: '/dashboardBolsista', component: DashboardBolsista },
  { path: '/teste', component: Teste },
  { path: '/dashboardGerente', component: DashboardGerente},
  { path: '/novoUsuarioBolsista', component: NovoUsuarioBolsista},
  { path: '/novoUsuarioGerente', component: NovoUsuarioGerente}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
