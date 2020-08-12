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
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler() {
        setTimeout(() => {
          this.initProgress()
        }, 100)
      },
    },
  },
  methods: {
    initProgress() {
      this.pageHeight = document.documentElement.scrollHeight
      this.windowHeight = document.documentElement.clientHeight
      this.scrollAvail = this.pageHeight - this.windowHeight
      this.progress = document.querySelector('.progress')
      window.addEventListener('scroll', this.onScroll)
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
  },
  mounted() {
    window.addEventListener('resize', this.onResize)
  },
}
</script>
<style lang="scss">
.reading-progress {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
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
