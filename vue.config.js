const path = require('path')
// const PrerenderSPAPlugin = require('prerender-spa-plugin')
// const Renderer = PrerenderSPAPlugin.PuppeteerRenderer

function resolve(dir) {
  return path.join(__dirname, dir)
}

let vueCdn = process.env.NODE_ENV === 'production' ? 'vue.min.js' : 'vue.js'

module.exports = {
  productionSourceMap: process.env.NODE_ENV === 'production' ? false : true,
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    externals: {
      vue: 'Vue',
      'element-ui': 'ELEMENT'
    }
  },
  chainWebpack(config) {
    const cdn = {
      css: [
        // element-ui css
        'https://cdn.jsdelivr.net/npm/element-ui@2.14.1/lib/theme-chalk/index.css'
      ],
      js: [
        `https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/${vueCdn}`,
        // element-ui js
        'https://cdn.jsdelivr.net/npm/element-ui@2.14.1/lib/index.js'
      ]
    }
    config.plugin('html').tap(args => {
      args[0].cdn = cdn
      return args
    })
  }
}
