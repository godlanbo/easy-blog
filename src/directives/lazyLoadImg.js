import defaultImg from '../../public/image/default.png'

const imgState = {
  wait: 0,
  loading: 1,
  loaded: 2,
  error: 3
}

const imgResSrc = /^(data|https?)/

function loadImage(src) {
  return new Promise((resolve, reject) => {
    let img = new Image()

    img.onload = () => {
      resolve()
      img = null
    }

    img.onerror = err => {
      reject(err)
      img = null
    }

    img.src = src
  })
}

class ImageLoader {
  constructor(src, loadingSrc, errorSrc) {
    this.state = imgState.wait
    this.src = src
    this.errSrc = errorSrc
    this.loadingSrc = loadingSrc
    // 可能有多个图片用同一个url，loader把他们都收集起来，只需要加载一次
    this.elements = []
  }
  addImage(el, type) {
    el.src = this.loadingSrc
    // 标识唯一的资源
    el.setAttribute('data-lazy-key', this.src)
    // img | bg img元素和背景图片
    this.elements.push({
      el,
      type: type || 'img'
    })
    ImageLoader.setSrc(el, type, this.loadingSrc)
  }
  renderImage() {
    if (
      this.state === imgState.loaded ||
      this.state === imgState.error ||
      this.state === imgState.loading
    ) {
      return
    }
    this.state = imgState.loading
    loadImage(this.src)
      .then(() => {
        this.state = imgState.loaded
        this.walkImage(this.src)
      })
      .catch(err => {
        this.state = imgState.error
        this.walkImage(this.errSrc)
        console.error(
          `Image: ${this.src} load error, the error msg is: ${err.message}`
        )
      })
  }
  // 将加载好的资源装载在元素上
  static setSrc(el, type, src) {
    if (type === 'bg') {
      if (src.match(imgResSrc)) {
        el.style.backgroundImage = `url(${src})`
      } else {
        el.style.backgroundImage = src
      }
    } else if (type === 'img') {
      el.src = src
    }
  }
  // 遍历所有元素，分别设置他们的src
  walkImage(src) {
    for (let i = 0; i < this.elements.length; i++) {
      ImageLoader.setSrc(this.elements[i].el, this.elements[i].type, src)
    }
  }
}

class LazyLoadManager {
  constructor(options) {
    const { loadingSrc = defaultImg, errorSrc = defaultImg } = options
    this.loadingSrc = loadingSrc
    this.errorSrc = errorSrc
    this.collectMap = new Map()
    this.observer = this.initObserver()
  }
  collectImage(el, src, type) {
    let imgLoader
    if (this.collectMap.has(src)) {
      imgLoader = this.collectMap.get(src)
    }
    imgLoader = new ImageLoader(src, this.loadingSrc, this.errorSrc)
    imgLoader.addImage(el, type)
    this.collectMap.set(src, imgLoader)
    this.observer.observe(el)
  }
  initObserver() {
    return new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const target = entry.target
          const lazyKey = target.dataset.lazyKey
          const lazyImageLoader = this.collectMap.get(lazyKey)
          if (lazyImageLoader.state === imgState.wait) {
            lazyImageLoader.renderImage()
          } else if (lazyImageLoader.state === imgState.loading) {
            this.observer.unobserve(target)
          } else {
            this.collectMap.delete(lazyKey)
            this.observer.unobserve(target)
          }
        }
      }
    })
  }
}

const LazyLoadImg = {
  install(app, options) {
    const lazyLoadInstance = new LazyLoadManager({
      ...options
    })
    app.directive('lazy', {
      bind(el, binding) {
        lazyLoadInstance.collectImage(el, binding.value, binding.arg)
      }
    })
  }
}

export default LazyLoadImg
