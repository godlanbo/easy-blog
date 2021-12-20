import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import dayjs from 'dayjs'
import ElementUI from 'element-ui'
import './assets/style/icon.css'
import './assets/style/markdown.css'
import './assets/style/tailwind.css'
import './assets/style/global.scss' // 后于tailwind引入，因为需要重置font-family
// import './mock/index'
import mavonEditor from 'mavon-editor'
import markdownItAnchor from 'markdown-it-anchor'
import 'mavon-editor/dist/css/index.css'
import './permission'
import VueMeta from 'vue-meta'
import LazyLoadImg from './directives/lazyLoadImg'

if (process.env.NODE_ENV === 'development') {
  import('./assets/style/fontDev.scss')
} else {
  import('./assets/style/font.scss')
}

Vue.config.productionTip = process.env.NODE_ENV !== 'development'
// 配置markdown-it插件
mavonEditor.markdownIt.use(markdownItAnchor, {
  permalink: true,
  permalinkBefore: true,
  permalinkClass: 'anchor',
  permalinkSymbol: '<div class="octicon-link octicon"></div>',
  permalinkAttrs: slug => {
    return { id: slug }
  },
  slugify: s => {
    return String(s)
      .trim()
      .toLowerCase()
  }
})
Vue.prototype.$markDown = mavonEditor.markdownIt.set({
  langPrefix: 'language-',
  highlight: (str, lang) => {
    const isDiffBlock = /\n(\+|-)\s/.test(str)
    let res =
      `<pre class="language-${lang} extra-class">` +
      `<pre class="language-${
        isDiffBlock ? 'diff-' : ''
      }${lang} diff-highlight line-numbers">` +
      `<code>${str.replace(/</g, '&lt;')}</code>` +
      `</pre>` +
      `</pre>`
    return res
  }
})
Vue.use(mavonEditor)
Vue.use(ElementUI)
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
