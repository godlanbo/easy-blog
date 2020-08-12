<template>
  <div class="container">
    <header-bar></header-bar>
    <router-view />
  </div>
</template>

<script>
import HeaderBar from './components/HeaderBar/index'
export default {
  components: {
    HeaderBar
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/style/globalScript';
.container {
  width: 100%;
  box-sizing: border-box;
  background-color: $bg-color;
}
</style>