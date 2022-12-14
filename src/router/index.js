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
    params: true,
    path: '/change-password/:token',
    name: 'changePassword',
    component: () => import('../views/ChangePasswordView.vue'),
  },
  {
    path: '/about',
    name: 'about',   
    props: true, 
    // meta: { requiresAuth: true },
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/home',
    name: 'home',
    meta: { requiresAuth: true },
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    meta: { requiresAuth: true },
    component: () => import('../views/ProfileView.vue')
  },
  {
    path: '/profile/cv/work-experiences',
    name: 'workExperiences',
    meta: { requiresAuth: true },
    component: () => import('../views/CVWorksView.vue')
  },
  {
    path: '/profile/cv/academic-trainings',
    name: 'academicTrainings',
    meta: { requiresAuth: true },
    component: () => import('../views/CVAcademicsView.vue')
  },
  {
    path: '/profile/cv/certifications',
    name: 'certifications',
    meta: { requiresAuth: true },
    component: () => import('../views/CVCertificationsView.vue')
  },
  {
    path: '/profile/cv/skills',
    name: 'skills',
    meta: { requiresAuth: true },
    component: () => import('../views/CVSkillsView.vue')
  },
  {
    path: '/profile/cv/lenguages',
    name: 'lenguages',
    meta: { requiresAuth: true },
    component: () => import('../views/CVLenguagesView.vue')
  },
  {
    path: '/user/:rfc',
    name: 'user',
    meta: { requiresAuth: true },
    component: () => import('../views/UserProfileView.vue')
  },
  {
    path: '/offers',
    name: 'offers',
    meta: { requiresAuth: true },
    component: () => import('../views/OfferView.vue'),
    beforeEnter: (to, from, next) => {
      const userRole = store.getters.user.role;
      if (userRole === 'Recruiter') {
        next();
      } else {
        next('/home')
      }
    }
  },  
  {
    path: '/jobApplications',
    name: 'jobApplications',
    meta: { requiresAuth: true },
    component: () => import('../views/JobApplication.vue'),
    beforeEnter: (to, from, next) => {
      const userRole = store.getters.user.role;
      if (userRole === 'Employee') {
        next();
      } else {
        next('/home')
      }
    }
  },
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
