<template>
  <div class="container">
    <header-bar></header-bar>
    <router-view />
    <footer-bar></footer-bar>
  </div>
</template>

<script>
import HeaderBar from './components/HeaderBar/index'
import FooterBar from './components/FooterBar/index'
export default {
  components: {
    HeaderBar,
    FooterBar
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
}
</style>