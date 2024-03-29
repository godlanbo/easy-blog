import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import dayjs from 'dayjs'
// import ElementUI from 'element-ui'
import ElementConfig from './element.config'
import './assets/style/icon.css'
import './assets/style/markdown.css'
import './assets/style/tailwind.css'
import './assets/style/global.scss' // 后于tailwind引入，因为需要重置font-family
// import './mock/index'
import './permission'
import VueMeta from 'vue-meta'
import LazyLoadImg from './directives/lazyLoadImg'
import runtime from 'serviceworker-webpack-plugin/lib/runtime'

import('./assets/style/fontDev.scss')

if ('serviceWorker' in navigator) {
  runtime.register()
}

Vue.config.productionTip = process.env.NODE_ENV !== 'development'

Vue.use(ElementConfig)
Vue.use(LazyLoadImg)

Vue.use(VueMeta, {
  tagIDKeyName: 'hid'
})

Vue.config.errorHandler = (err, vm, info) => {
  console.error(err)
  console.error(info)
}

Vue.filter('dateformat', (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs(dataStr).format(pattern)
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
