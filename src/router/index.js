import Vue from 'vue'
import VueRouter from 'vue-router'
import { handleScroll } from './../utils/index'
import layoutHome from '../layout/home/index'
import layoutAdmin from '../layout/admin/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home',
    hidden: true,
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
  },
  {
    path: '/login',
    name: 'Login',
    hidden: true,
    component: () => import('@/views/login/index')
  },
  {
    path: '/dashboard',
    redirect: '/dashboard/index',
    component: layoutAdmin,
    children: [{
      path: 'index',
      name: 'Dashboard',
      component: () => import('@/views/admin/Dashboard'),
      meta: { title: '仪表盘', icon: 'dashboard' }
    }]
  },
  {
    path: '/blog',
    component: layoutAdmin,
    name: 'BlogEdit',
    meta: { title: '博客', icon: 'edit' },
    children: [{
      path: 'list',
      name: 'List',
      component: () => import('@/views/admin/BlogView'),
      meta: { title: '博客列表' }
    }, {
      path: 'create',
      name: 'Create',
      component: () => import('@/views/admin/BlogEdit'),
      meta: { title: '创建博客' }
    }]
  },
  {
    path: '/mylife',
    component: layoutAdmin,
    meta: { title: '我的生活', icon: 'life' },
    name: 'MyLife',
    children: [{
      path: 'list',
      name: 'LifeList',
      component: () => import('@/views/admin/LifeList'),
      meta: { title: '动态列表' }
    }, {
      path: 'create',
      name: 'LifeCreate',
      component: () => import('@/views/admin/LifeCreate'),
      meta: { title: '新的动态' }
    }]
  },
  {
    path: '/404',
    name: '404 Not Found',
    component: () => import('@/views/404/index'),
    hidden: true
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]



const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 解决在hash模式下跳转到BlogsDetail路由savedPosition不为空导致无法回到顶部
    if (to.name === 'BlogsDetail') {
      handleScroll(document.documentElement.scrollTop, 0)
      return false
    } else if (savedPosition) {
      handleScroll(document.documentElement.scrollTop, savedPosition.y)
      return false
    } else {
      handleScroll(document.documentElement.scrollTop, 0)
      return false
    }
  }
})



export default router
