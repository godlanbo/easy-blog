<template>
  <div class="home">
    <div class="home-title-section-wrapper">
      <section class="home-title-section">
        <div class="title-section-background-img" />
        <avatar-detail class="title-section-avatar"></avatar-detail>
      </section>
    </div>
    <div class="text">1</div>
  </div>
</template>

<script>
import AvatarDetail from './components/Avatar/index'
export default {
  components: {
    AvatarDetail
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/style/globalScript';
.home {
  .home-title-section-wrapper {
    height: calc(100vh + 100px);
    width: 100%;
    .home-title-section {
      position: relative;
      width: 100%;
      height: 100%;
      @include center;
      .title-section-background-img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        clip-path: circle(115vw at 50% calc(100px - 115vw + 100vh));
        background-attachment: fixed;
        background-image: url('/image/head.png');
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
      }
      .title-section-avatar {
        z-index: 1;
      }
    }
  }
}
.text {
  height: 2000px;
}
</style>