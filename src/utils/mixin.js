import { getBlogsList, getLifeList } from './../api/index';

export const homeMixin = {
  data() {
    return {
      blogsList: [],
      lifeList: [],
    }
  },
  mounted() {
    getBlogsList().then(res => {
      this.blogsList = res.data.blogsList
    })
    getLifeList().then((res) => {
      this.lifeList = res.data.lifeList
    })
  },
}

export const lazyImgMixin = {
  mounted() {
    let observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(item => {
        if (item.isIntersecting) {
          let el = item.target
          if (el.tagName === 'IMG') {
            el.setAttribute('src', el.dataset.src)
          } else {
            el.style.backgroundImage = el.dataset.src
          }
          observer.unobserve(item.target)
        }
      })
    })
    setTimeout(() => {
      let imgs = document.querySelectorAll('figure img')
      let bgs = document.querySelectorAll('.home-life-section-list-item')
      imgs.forEach(img => {
        observer.observe(img)
      })
      bgs.forEach(bg => {
        observer.observe(bg)
      })
    }, 1200)
  },
}

export const editMixin = {
  data() {
    return {
      isShowLeaveWarning: false
    }
  },
  watch: {
    blog: {
      deep: true,
      handler(val) {
        this.isShowLeaveWarning = true
      }
    },
    lifeItem: {
      deep: true,
      handler(val) {
        this.isShowLeaveWarning = true
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    if (this.isShowLeaveWarning) {
      this.$alert('我们不会保存任何你在本页面上的操作，确定离开吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        showCancelButton: true,
      }).then(() => {
        next()
      }).catch(() => {
        next(false)
      })
    } else {
      next()
    }
  }
}