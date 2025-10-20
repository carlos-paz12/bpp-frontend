import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import DashboardBolsista from '@/components/DashboardBolsista.vue'
import DashboardGerente from '@/components/DashboardGerente.vue'
import NovoUsuarioBolsista from '@/components/NovoUsuarioBolsista.vue'
import NovoUsuarioGerente from '@/components/NovoUsuarioGerente.vue'
import Teste from '@/components/Teste.vue'

const routes = [
  { path: '/spe/api/auth/login', component: Login },

  // Rotas protegidas com roles específicas
  {
    path: '/spe/api/dashboardBolsista',
    component: DashboardBolsista,
    meta: { requiresAuth: true, role: 'BOLSISTA' }
  },
  {
    path: '/spe/api/admin/dashboardGerente',
    component: DashboardGerente,
    meta: { requiresAuth: true, role: 'ADMIN' } // ou "TECNICO", se for o caso
  },
  {
    path: '/spe/api/admin/novoUsuarioBolsista',
    component: NovoUsuarioBolsista,
    meta: { requiresAuth: true, role: 'ADMIN' }
  },
  {
    path: '/spe/api/admin/novoUsuarioGerente',
    component: NovoUsuarioGerente,
    meta: { requiresAuth: true, role: 'ADMIN' }
  },
  {
    path: '/teste',
    component: Teste,
    meta: { requiresAuth: true } // qualquer usuário logado pode acessar
  },
  // Fallback para rotas não encontradas
  {
    path: '/:pathMatch(.*)*',
    redirect: '/spe/api/auth/login'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

/*
  🔒 Guard global para autenticação e autorização
*/
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role')?.toUpperCase();

  // Se a rota requer autenticação e o usuário não tem token → volta pro login
  if (to.meta.requiresAuth && !token) {
    next('/');
    return;
  }

  // Se a rota tem restrição de role e o usuário não tem permissão
  if (to.meta.role && role !== to.meta.role.toUpperCase()) {
    alert('Acesso negado! Você não tem permissão para acessar esta página.');
    next('/'); // redireciona para o login (ou outra página segura)
    return;
  }

  next();
});

export default router;
