import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import dayjs from 'dayjs'
import ElementUI from 'element-ui'
import './assets/style/global.scss'
import './assets/style/icon.css'
// import './mock/index'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import './permission'

Vue.prototype.$markDown = mavonEditor.markdownIt
Vue.use(mavonEditor)
Vue.use(ElementUI)

Vue.config.productionTip = (process.env.NODE_ENV !== 'development')
Vue.filter('dateformat', (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs(dataStr).format(pattern)
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
