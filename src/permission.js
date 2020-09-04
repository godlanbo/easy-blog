import router from './router'
import { getToken } from './utils/auth' // get token from cookie
// import getPageTitle from '@/utils/get-page-title'


const whiteList = ['/login', '/home', '/life', '/archive', '/blogs', '/404'] // no redirect whitelist

router.beforeEach((to, from, next) => {
  // start progress bar
  // set page title
  // document.title = getPageTitle(to.meta.title)
  // determine whether the user has logged in
  if (to.path.indexOf('/blogs') !== -1) {
    next()
  } else if (whiteList.indexOf(to.path) !== -1) {
    next()
  } else {
    const hasToken = getToken()
    if (hasToken) {
      if (to.path === '/login') {
        // if is logged in, redirect to the home page
        next({ path: '/dashboard' })
      } else {
        next()
      }
    } else {
      /* has no token*/
      // 重定向到login页面
      next(`/login?redirect=${to.path}`)
    }
  }
})
