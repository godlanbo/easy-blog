<template>
  <transition name="slide-right-2">
    <div class="backTop" @click="handleBackTop" v-show="toolListVisible">
      <span class="icon-up"></span>
    </div>
  </transition>
</template>
<script>
import { popoverToolListMixin } from '../../utils/mixin'
const cubic = (value) => Math.pow(value, 3)
const easeInOutCubic = (value) =>
  value < 0.5 ? cubic(value * 2) / 2 : 1 - cubic((1 - value) * 2) / 2

export default {
  name: 'BackTop',
  mixins: [popoverToolListMixin],
  methods: {
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
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/style/globalScript';
.backTop {
  position: fixed;
  font-weight: bold;
  bottom: 60px;
  right: $toolListRight;
  z-index: 2999;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  @include center;
  font-size: 25px;
  background: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all $animationTime $animationType;
  .icon-up {
    @include center;
    color: #aaa;
    font-weight: bold;
  }
  &:hover {
    transform: scale(1.08);
    box-shadow: 0 8px 24px 0 rgba(187,191,196,.2);
  }
}
@media (max-width: 640px) {
  .backTop {
    right: $small-toolListRight;
  }
}
</style>