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
      path: '/news',
      name: 'News',
      component: () => import('../views/News'),
      // beforeEnter: ifNotAuthenticated,
    },
    {
      path: '/newsDetail',
      name: 'NewsDetail',
      component: () => import('../views/NewsDetail'),
      // beforeEnter: ifNotAuthenticated,
    },
    {
      path: '/postnews',
      name: 'PostNews',
      component: () => import('../views/PostNews')
    }
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