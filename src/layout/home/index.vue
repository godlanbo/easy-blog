<template>
  <div class="container">
    <read-progress></read-progress>
    <rss></rss>
    <back-top></back-top>
    <header-bar></header-bar>
    <transition name="slide-up" mode="out-in">
      <keep-alive exclude="BlogsDetail">
        <router-view />
      </keep-alive>
    </transition>
    <footer-bar></footer-bar>
  </div>
</template>

<script>
import HeaderBar from './components/HeaderBar/index'
import FooterBar from './components/FooterBar/index'
import ReadProgress from '@/components/ReadProgress/index'
import BackTop from '@/components/BackTop/index'
import Rss from '@/components/Rss/index'
export default {
  components: {
    HeaderBar,
    FooterBar,
    ReadProgress,
    BackTop,
    Rss
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/style/globalScript';
.container {
  position: relative;
  width: 100%;
  box-sizing: border-box;
  background-color: $bg-color;
  min-height: calc(100vh + 100px)
}
</style>