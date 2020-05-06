import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login'),
    },
    {
      path: '/',
      name: 'News',
      component: () => import('../views/News'),
    },
    {
      path: '/newsDetail',
      name: 'NewsDetail',
      component: () => import('../views/NewsDetail'),
    },
    {
      path: '/postnews',
      name: 'PostNews',
      component: () => import('../views/PostNews')
    },
    {
      path: '/followers',
      name: 'Followers',
      component: () => import('../views/Followers')
    },
    {
      path: '/user',
      name: 'User',
      component: () => import('../views/User.vue')
    },
    {
      path: '/myUser',
      name: 'MyUser',
      component: () => import('../views/MyUser.vue')
    },
    {
      path: '/newsGraph',
      name: 'NewsGraph',
      component: () => import('../views/Graphs/NewsGraph.vue')
    }
  ]
})