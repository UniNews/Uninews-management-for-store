import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/modules/auth'

Vue.use(Router)

// const ifNotAuthenticated = (to, from, next) => {
//   if (!store.state.user) {
//     console.log(store.state.user)
//     next()
//     return
//   }
//   next('/')
// }

// const ifAuthenticated = (to, from, next) => {
//   if (store.state.user) {
//     console.log(store.state.user)
//     next()
//     return
//   }
//   next('/login')
// }

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: () => import('../views/Dashboard'),
      // beforeEnter: ifAuthenticated,
    },
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
    }
  ]
})