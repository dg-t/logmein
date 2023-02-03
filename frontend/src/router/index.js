import { createRouter, createWebHistory } from 'vue-router';
import AppHome from '../views/AppHome.vue';
import AppLogin from '../views/authentication/AppLogin.vue';
import AppSignup from '../views/authentication/AppSignup.vue';
import AppForgotPassword from '../views/authentication/AppForgotPassword.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: AppHome,
    },
    {
      path: '/login',
      name: 'login',
      component: AppLogin,
    },
    {
      path: '/signup',
      name: 'signup',
      component: AppSignup,
    },
    {
      path: '/forgotPassword',
      name: 'forgotPassword',
      component: AppForgotPassword,
    },
  ],
});

export default router;
