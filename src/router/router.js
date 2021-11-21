import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import authGuard from './authGuard.js';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { auth: true },
    
  },
  {
    path: '/my-mems',
    name: 'MyMems',//
    component: () => import('../views/MyMems.vue'),
    meta: { auth: true },
    beforeEnter: authGuard,
    children:[
    ]
  },
  {
    path: '/login',
    name: 'Login',//
    component: () => import('../views/Login.vue'),
    meta: { auth: true }
  },
  {
    path: '/new-mem',
    name: 'NewMem',//
    component: () => import('../views/NewMem.vue'),
    meta: { auth: true },
    beforeEnter: authGuard,
  },
  {
    path: '/registration',
    name: 'Registration',//
    component: () => import('../views/Registration.vue'),
    meta: { auth: true }
  },
  {
    path: '/my-mems/:id',
    name: 'Detail',
    component: () => import('../views/RedactMem.vue'),
    meta: { auth: true },
    beforeEnter: authGuard
  },
]

const router = new VueRouter({
  mode:'history',
  routes
})

export default router
