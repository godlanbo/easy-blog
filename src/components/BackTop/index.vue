<template>
  <transition name="slide-right-3">
    <div
      class="backTop tool-list-item"
      @click="handleBackTop"
      v-show="toolListVisible"
      :class="{ 'message-board-visible': messageBoardVisible }"
    >
      <span class="icon-up"></span>
    </div>
  </transition>
</template>
<script>
import { popoverToolListMixin } from '../../utils/mixin'
const cubic = value => Math.pow(value, 3)
const easeInOutCubic = value =>
  value < 0.5 ? cubic(value * 2) / 2 : 1 - cubic((1 - value) * 2) / 2

export default {
  name: 'BackTop',
  mixins: [popoverToolListMixin],
  methods: {
    handleBackTop() {
      const el = document.documentElement
      const beginTime = Date.now()
      const beginValue = el.scrollTop
      const rAF = window.requestAnimationFrame || (func => setTimeout(func, 16))
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
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/style/globalScript';
.backTop {
  bottom: $base-distance;
  z-index: 2999;
  .icon-up {
    @include center;
  }
  &.message-board-visible {
    bottom: $base-distance;
    box-shadow: unset;
  }
}
</style>
