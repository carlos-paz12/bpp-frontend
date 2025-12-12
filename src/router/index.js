import { createRouter, createWebHistory } from 'vue-router'

import Login from '@/views/LoginView.vue'
import DashboardBolsista from '@/views/DashboardBolsistaView.vue'
import DashboardAdmin from '@/views/DashboardTecnicoView.vue'
import RegisterView from '@/views/RegisterView.vue'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  // Rotas protegidas com roles específicas
  {
    path: '/admin/register',
    component: RegisterView,
    // meta: { requiresAuth: true, role: 'ADMIN' }
  },
  {
    path: '/bolsista/dashboard',
    component: DashboardBolsista,
    // meta: { requiresAuth: true, role: 'BOLSISTA' }
  },
  {
    path: '/admin/dashboard',
    component: DashboardAdmin,
    // meta: { requiresAuth: true, role: 'ADMIN' }
  },
  // {
  //   path: '/teste',
  //   component: Teste,
  //   //meta: { requiresAuth: true } // qualquer usuário logado pode acessar
  // },
  // Fallback para rotas não encontradas
  {
    path: '/:pathMatch(.*)*',
    redirect: '/auth/login'
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
