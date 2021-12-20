import defaultImg from '../../public/image/default.png'

const imgState = {
  loading: 0,
  loaded: 1,
  error: 2
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
  constructor(el, src, loadingSrc, errorSrc, type) {
    this.state = imgState.loading
    // 标识唯一的资源
    el.setAttribute('data-lazy-key', src)
    this.src = src
    this.errSrc = errorSrc
    this.el = el
    this.type = type || 'img' // img | bg img元素和背景图片
    this.setSrc(loadingSrc)
  }
  renderImage() {
    if (this.state === imgState.loaded || this.state === imgState.error) {
      return
    }
    loadImage(this.src)
      .then(() => {
        this.state = imgState.loaded
        this.setSrc(this.src)
      })
      .catch(err => {
        this.state = imgState.error
        this.setSrc(this.errSrc)
        console.error(
          `Image: ${this.src} load error, the error msg is: ${err.message}`
        )
      })
  }
  // 将加载好的资源装载在元素上
  setSrc(src) {
    if (this.type === 'bg') {
      if (src.match(imgResSrc)) {
        this.el.style.backgroundImage = `url(${src})`
      } else {
        this.el.style.backgroundImage = src
      }
    } else if (this.type === 'img') {
      this.el.src = src
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
  addImage(el, src, type) {
    const imgLoader = new ImageLoader(
      el,
      src,
      this.loadingSrc,
      this.errorSrc,
      type
    )
    this.observer.observe(el)
    this.collectMap.set(src, imgLoader)
  }
  initObserver() {
    return new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const target = entry.target
          const lazyKey = target.dataset.lazyKey
          const lazyImageLoader = this.collectMap.get(lazyKey)
          if (lazyImageLoader.state === imgState.loading) {
            lazyImageLoader.renderImage()
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
        lazyLoadInstance.addImage(el, binding.value, binding.arg)
      }
    })
  }
}

export default LazyLoadImg
