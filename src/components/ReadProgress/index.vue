<template>
  <div class="reading-progress">
    <div class="progress"></div>
  </div>
</template>
<script>
export default {
  name: 'ReadProgress',
  data() {
    return {
      timer: null,
      pageHeight: 0,
      windowHeight: 0,
      scrollAvail: 0,
      initTask: null
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler() {
        this.initTask = setTimeout(() => {
          this.initProgress()
        }, 600)
      },
    },
  },
  methods: {
    asyncInitProgress() {
      if (this.initTask) {
        clearInterval(this.initTask)
        this.initTask = null
      }
      this.initProgress()
    },
    initProgress() {
      this.pageHeight = document.documentElement.scrollHeight
      this.windowHeight = document.documentElement.clientHeight
      this.scrollAvail = this.pageHeight - this.windowHeight
    },
    onScroll() {
      let scrollTop = document.documentElement.scrollTop
      this.progress.style.transform = `scaleX(${scrollTop / this.scrollAvail})`
    },
    onResize() {
      if (!this.timer) {
        this.timer = setTimeout(() => {
          this.initProgress()
          this.timer = null
        }, 150)
      }
    },
  },
  destroyed() {
    window.removeEventListener('scroll', this.onScroll)
    window.removeEventListener('resize', this.onResize)
    window.addEventListener('img-ready', this.initProgress)
  },
  mounted() {
    this.progress = document.querySelector('.progress')
    window.addEventListener('resize', this.onResize)
    window.addEventListener('scroll', this.onScroll)
    window.addEventListener('img-ready', this.initProgress)
  },
}
</script>
<style lang="scss">
.reading-progress {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10000;
  background: transparent;
  height: 4px;
  .progress {
    transform: scaleX(0);
    width: 100%;
    height: 100%;
    // background: #0ab9e6;
    // background-image: linear-gradient(90deg, #ff3278, #0ab9e6 80%);
    background-image: linear-gradient(to left, #c33764, #1d2671);
    transform-origin: 0 0;
    transition: transform 0.2s ease-out;
  }
}
</style>
