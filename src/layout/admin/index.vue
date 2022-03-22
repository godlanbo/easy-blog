<template>
  <div class="container">
    <side-bar></side-bar>
    <div class="main-container">
      <header-bar></header-bar>
      <div class="main-content-container">
        <transition name="slide-up" mode="out-in">
          <router-view />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from './components/SideBar/index'
import HeaderBar from './components/HeaderBar/index'
export default {
  components: {
    SideBar,
    HeaderBar
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/style/globalScript';
.container {
  width: 100%;
  .main-container {
    margin-left: 210px;
    .main-content-container {
      min-height: calc(100vh - 50px);
      // height: calc(100vh - 50px);
      position: relative;
      padding: 20px;
      width: 100%;
      background-color: $bg-color;
    }
  }
}
</style>
