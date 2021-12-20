import { mapActions, mapGetters, mapMutations } from 'vuex'

export const listInfoMixin = {
  computed: {
    ...mapGetters(['blogsList', 'lifeList', 'lifeItemList'])
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
      handler(v) {
        if (+v.content.length) {
          this.isShowLeaveWarning = true
        }
      }
    },
    lifeItem: {
      deep: true,
      handler() {
        this.isShowLeaveWarning = true
      }
    }
  },
  methods: {
    ...mapActions(['getBlogsList'])
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
