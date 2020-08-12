<template>
  <div class="backTop" @click="handleBackTop">
    <span class="icon-up"></span>
  </div>
</template>
<script>
const cubic = (value) => Math.pow(value, 3)
const easeInOutCubic = (value) =>
  value < 0.5 ? cubic(value * 2) / 2 : 1 - cubic((1 - value) * 2) / 2

export default {
  name: 'BackTop',
  methods: {
    handleScroll() {
      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop
      const backTop = document.querySelector('.backTop')
      if (scrollTop > 200) {
        backTop.style.visibility = 'visible'
        backTop.style.opacity = 1
      } else {
        backTop.style.visibility = 'hidden'
        backTop.style.opacity = 0
      }
    },
    handleBackTop() {
      const el = document.documentElement
      const beginTime = Date.now()
      const beginValue = el.scrollTop
      const rAF =
        window.requestAnimationFrame || ((func) => setTimeout(func, 16))
      const frameFunc = () => {
        const progress = (Date.now() - beginTime) / 500
        if (progress < 1) {
          el.scrollTop = beginValue * (1 - easeInOutCubic(progress))
          rAF(frameFunc)
        } else {
          el.scrollTop = 0
        }
      }
      rAF(frameFunc)
    },
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
}
</script>
<style lang="scss" scoped>
@import '@/assets/style/globalScript';
.backTop {
  visibility: hidden;
  opacity: 0;
  position: fixed;
  background-color: #fff;
  font-weight: bold;
  bottom: 100px;
  right: 40px;
  z-index: 20;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  @include center;
  font-size: 30px;
  box-shadow: 0 8px 24px 0 rgba(187,191,196,.2);
  cursor: pointer;
  transition: opacity 0.5s ease, visibility 0.5s ease;
  .icon-up {
    color: transparent;
    background-image: linear-gradient(to left, #c33764, #1d2671);
    background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: bold;
  }
}
</style>