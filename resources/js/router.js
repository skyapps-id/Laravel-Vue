import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { 
      path: '/auth',
      component: () => import('./components/AppIndex.vue'),
      children: [
        {
          name: 'login',
          path: 'login',
          component: () => import('./components/auth/Login.vue')
        },
        {
          path: 'logout/:destory',
          component: () => import('./components/auth/Logout.vue')
        },
        {
          path: 'logout',
          component: () => import('./components/auth/Logout.vue')
        },
      ]
    },
    { 
      path: '/',
      component: () => import('./components/AppDashboard.vue'),
      children: [
        {
          name: 'home',
          path: '',
          component: () => import('./components/Home.vue')
        },
        {
          name: 'person',
          path: 'person',
          component: () => import('./components/person/PersonIndex.vue')
        },
        {
          name: 'designers',
          path: 'designers',
          component: () => import('./components/designers/DesignersIndex.vue')
        },
        {
          name: 'event',
          path: 'event',
          component: () => import('./components/event/EventIndex.vue')
        },
        {
          name: 'eventRegister',
          path: 'register',
          component: () => import('./components/eventRegister/EventRegisterIndex.vue')
        },
      ]
    },
    { 
      path: '/register/event/:uuid',
      component: () => import('./components/AppIndex.vue'),
      children: [
        {
          name: 'personRegister',
          path: '',
          component: () => import('./components/visitor/IndexVisitor.vue')
        },
      ]
    },
    {
      path: '*',
      component: () => import('./components/AppIndex.vue'),
      children: [
        {
          name: '404 Error',
          path: '',
          component: () => import('./components/pages/Error.vue'),
        },
      ],
    },
  ]
})

const checkToken = () => {
  if(localStorage.getItem('token') == (null || undefined) ){
      return false
  }
  else{
      return true
  }
}

router.beforeEach((to, from, next) => {
  if(to.path == '/') {
    if(checkToken()) { 
        next()
    } else {
        next('/auth/login')
    }
  }
  next()
})


export default router