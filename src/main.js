import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import dayjs from 'dayjs'
import './assets/style/global.scss'
import './assets/style/icon.css'
import './mock/index'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.prototype.$markDown = mavonEditor.markdownIt
Vue.use(mavonEditor)
Vue.config.productionTip = false
Vue.filter('dateformat', (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs(dataStr).format(pattern)
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
