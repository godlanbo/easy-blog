import Vue from 'vue'
import VueRouter from 'vue-router'
import { handleScroll } from './../utils/index'
import layoutHome from '../layout/home/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home',
    component: layoutHome,
    children: [{
      path: '/home',
      name: 'Home',
      component: () => import('@/views/home/Home')
    }]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      handleScroll(document.documentElement.scrollTop, savedPosition.y)
      return {
        x: 0,
        y: document.documentElement.scrollTop
      }
    } else {
      handleScroll(document.documentElement.scrollTop, 0)
      return {}
    }
  }
})

export default router
