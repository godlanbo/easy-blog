<template>
  <header class="header-wrapper">
    <div class="logo-wrapper">
      <span class="logo-text">GodLanBo</span>
    </div>
    <nav class="nav-wrapper">
      <div class="nav-item">
        <router-link to="/home">
          <span class="nav-item-text uppercase">home</span>
        </router-link>
      </div>
      <div class="nav-item">
        <router-link to="/blogs">
          <span class="nav-item-text uppercase">blogs</span>
        </router-link>
      </div>
      <div class="nav-item">
        <router-link to="/timeline">
          <span class="nav-item-text uppercase">timeline</span>
        </router-link>
      </div>
      <div class="nav-item">
        <a href="https://github.com/godlanbo" target="_blank">
          <span class="nav-item-text uppercase">github</span>
        </a>
      </div>
    </nav>
  </header>
</template>

<script>
export default {}
</script>
<style lang="scss" scoped>
@import '@/assets/style/globalScript';
.header-wrapper {
  width: 100%;
  padding: 0 10%;
  position: fixed;
  top: 0;
  left: 0;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  height: 50px;
  z-index: 999;
  background: rgba(0, 0, 0, .3);
  .logo-wrapper {
    flex: 0 0 20%;
    height: 100%;
    @include center;
    font-size: 32px;
    font-weight: bold;
    color: $text-color2;
  }
  .nav-wrapper {
    flex: 1;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    .nav-item {
      @include center;
      height: 100%;
      margin: 0 20px;
      a {
        width: 100%;
        text-decoration: none;
        position: relative;
        .nav-item-text {
          width: 100%;
          color: $text-color2;
          font-size: 18px;
          font-weight: bold;
        }
        &::before {
          display: block;
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          width: 100%;
          bottom: -4px;
          height: 4px;
          transform: scaleX(0);
          background-color: #fff;
          transition: transform .3s ease;
        }
        &:hover::before {
          transform: scaleX(1);
        }
      }
    }
  }
}
</style>