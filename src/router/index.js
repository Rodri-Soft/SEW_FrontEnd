import axios from 'axios'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from './../store/index.js'
import Cookies from 'js-cookie'
import '../wwwroot/js/axios'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LogInView.vue')
  },
  {
    path: '/change-password',
    name: 'changePassword',
    component: () => import('../views/ChangePasswordView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/about',
    name: 'about',
    meta: { requiresAuth: true },
    component: () => import('../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    const accessToken = Cookies.get('access_token');
    let payload = {
      token: accessToken
    };

    const url = 'auth/verify-token';

    axios.post(url, payload).then((data) => {
      const codeStatus = data.status;

      if (codeStatus === 200 && accessToken) {          
        next();
        return;
      }
    }).catch((error) => {
      next('/login');
    });
  } else {
    next()
  }
})

export default router
