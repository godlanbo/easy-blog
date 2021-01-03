import { mapGetters, mapMutations } from 'vuex'

export const listInfoMixin = {
  computed: {
    ...mapGetters(['blogsList', 'lifeList', 'lifeItemList'])
  }
}

export const lazyImgMixin = {
  data() {
    return {
      lazyObserver: null
    }
  },
  computed: {
    ...mapGetters(['isLoadInfo'])
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
  }
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
      handler() {
        this.isShowLeaveWarning = true
      }
    },
    lifeItem: {
      deep: true,
      handler() {
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
        showCancelButton: true
      })
        .then(() => {
          next()
        })
        .catch(() => {
          next(false)
        })
    } else {
      next()
    }
  }
}

export const popoverToolListMixin = {
  computed: {
    ...mapGetters(['toolListVisible', 'messageBoardVisible'])
  },
  methods: {
    ...mapMutations(['setToolListVisible', 'toggleMessageBoard']),
    handleScroll() {
      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop
      if (scrollTop > 200) {
        this.setToolListVisible(true)
      } else {
        this.setToolListVisible(false)
        if (this.messageBoardVisible) {
          this.toggleMessageBoard()
        }
      }
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
