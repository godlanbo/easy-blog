import { mapGetters } from 'vuex';
// import { getBlogsList, getLifeList } from './../api/index';

// export const homeMixin = {
//   data() {
//     return {
//       blogsList: [],
//       lifeList: [],
//     }
//   },
//   async mounted() {
//     let resBlog = await getBlogsList()
//     let resLife = await getLifeList()
//     this.blogsList = resBlog.data.blogsList
//     this.lifeList = resLife.data.lifeList
//     // 数据加载完毕后去触发lazyImg收集懒加载图片对象
//     let e = new Event('img-ready')
//     window.dispatchEvent(e)
//   },
// }
export const listInfoMixin = {
  computed: {
    ...mapGetters([
      'blogsList',
      'lifeList'
    ])
  }
}

export const lazyImgMixin = {
  data() {
    return {
      lazyObserver: null
    }
  },
  computed: {
    ...mapGetters([
      'isLoadInfo'
    ])
  },
  methods: {
    initObserverImg() {
      this.$nextTick(() => {
        let imgs = document.querySelectorAll('figure img')
        let bgs = document.querySelectorAll('.home-life-section-list-item')
        imgs.forEach(img => {
          this.lazyObserver.observe(img)
        })
        bgs.forEach(bg => {
          this.lazyObserver.observe(bg)
        })
      })
    }
  },
  mounted() {
    if (!this.lazyObserver) {
      this.lazyObserver = new IntersectionObserver((entries, observer) => {
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
    }
    if (!this.isLoadInfo) {
      window.addEventListener('img-ready', this.initObserverImg)
    } else {
      this.initObserverImg()
    }
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