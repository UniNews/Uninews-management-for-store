import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/modules/auth'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login'),
      // beforeEnter: ifNotAuthenticated,
    },
    {
      path: '/followers',
      name: 'Followers',
      component: () => import('../views/Followers')
    },
    {
      path: '/',
      name: 'Dashboard',
      component: () => import('../views/Dashboard'),
      // beforeEnter: ifAuthenticated,
    },

  ]
})