import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login'),
      meta: { title: 'Login' }
    },
    {
      path: '/',
      name: 'News',
      component: () => import('../views/News'),
      meta: { title: 'News' }
    },
    {
      path: '/newsDetail',
      name: 'NewsDetail',
      component: () => import('../views/NewsDetail'),
      meta: { title: 'NewsDetail' }
    },
    {
      path: '/postnews',
      name: 'PostNews',
      component: () => import('../views/PostNews'),
      meta: { title: 'PostNews' }
    },
    {
      path: '/followers',
      name: 'Followers',
      component: () => import('../views/Followers'),
      meta: { title: 'Followers' }
    },
    {
      path: '/user',
      name: 'User',
      component: () => import('../views/User.vue'),
      meta: { title: 'User' }
    },
    {
      path: '/myUser',
      name: 'MyUser',
      component: () => import('../views/MyUser.vue'),
      meta: { title: 'User' }
    },
    {
      path: '/comment',
      name: 'Comment',
      component: () => import('../views/Comment'),
      meta: { title: 'Comment' }
    },
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

export default router