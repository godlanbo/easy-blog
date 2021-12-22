const path = require('path')
// 分析包内容
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin')
// const PrerenderSPAPlugin = require('prerender-spa-plugin')
// const Renderer = PrerenderSPAPlugin.PuppeteerRenderer

function resolve(dir) {
  return path.join(__dirname, dir)
}

let vueCdn = process.env.NODE_ENV === 'production' ? 'vue.min.js' : 'vue.js'

let configureWebpack = {
  // provide the app's title in webpack's name field, so that
  // it can be accessed in index.html to inject the correct title.
  resolve: {
    alias: {
      '@': resolve('src'),
      '@assets': resolve('src/assets'),
      'bn.js': path.resolve(process.cwd(), 'node_modules', 'bn.js')
    }
  }
}

if (process.env.NODE_ENV === 'production') {
  configureWebpack['externals'] = {
    vue: 'Vue',
    'element-ui': 'ELEMENT'
  }
}

module.exports = {
  productionSourceMap: process.env.NODE_ENV === 'production' ? false : true,
  configureWebpack,
  publicPath:
    process.env.NODE_ENV === 'production'
      ? '//output-1303179205.file.myqcloud.com/output/'
      : '/',
  chainWebpack(config) {
    let css = [],
      js = []
    if (process.env.NODE_ENV === 'production') {
      css = [
        // element-ui css
        'https://lib.baomitu.com/element-ui/2.14.1/theme-chalk/index.css'
      ]
      js = [
        `https://lib.baomitu.com/vue/2.6.12/${vueCdn}`,
        // element-ui js
        'https://lib.baomitu.com/element-ui/2.14.1/index.js'
      ]
    }
    const cdn = {
      css,
      js
    }
    config.plugin('html').tap(args => {
      args[0].cdn = cdn
      return args
    })
    config.module.rule('eslint').use('eslint-loader')
    config.plugin('sw').use(ServiceWorkerWebpackPlugin, [{
      entry: path.join(__dirname, 'src/sw.js')
    }])
    process.env.ENV_ANALYZE === '1' &&
      config.plugin('analyzer').use(BundleAnalyzerPlugin)
  }
}
