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
      path: 'home',
      name: 'Home',
      component: () => import('@/views/home/Home')
    }, {
      path: 'blogs',
      name: 'Blogs',
      component: () => import('@/views/home/Blogs')
    }, {
      path: 'blogs/tags',
      name: 'BlogsTags',
      component: () => import('@/views/home/BlogsTags')
    }, {
      path: 'blogs/:id',
      name: 'BlogsDetail',
      component: () => import('@/views/home/BlogsDetail')
    }, {
      path: 'archive',
      name: 'Archive',
      component: () => import('@/views/home/Archive')
    }, {
      path: 'life',
      name: 'Life',
      component: () => import('@/views/home/Life')
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
      return false
    } else {
      handleScroll(document.documentElement.scrollTop, 0)
      return false
    }
  }
})

export default router
