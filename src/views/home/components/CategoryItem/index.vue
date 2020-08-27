<template>
  <div class="category-item">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <div class="release-time">
      <span class="release-time-text">{{data.releaseTime | dateformat}}</span>
    </div>
    <div class="title">
      <span class="title-text">{{data.title}}</span>
    </div>
    <div class="content">
      <p class="content-text">{{data.content}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Object,
  },
}
</script>
<style lang="scss" scoped>
@import '@/assets/style/globalScript';
@keyframes moveTop {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(100%);
  }
}
@keyframes moveRight {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(100%);
  }
}
@keyframes moveBottom {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(-100%);
  }
}
@keyframes moveLeft {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(-100%);
  }
}
.category-item {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 0 auto 15px;
  padding: 15px 25px 15px 0;
  overflow: hidden;
  // border-bottom: 3px solid $bg-color;
  cursor: pointer;
  .release-time {
    font-size: 20px;
    font-weight: 600;
    color: #ccc;
    margin-bottom: 15px;
    padding-left: 15px;
  }
  .title {
    font-size: 30px;
    font-weight: 800;
    color: $text-color;
    margin-bottom: 25px;
    padding-left: 15px;
  }
  .content {
    font-size: 16px;
    font-size: 400;
    color: $text-color;
    margin-bottom: 25px;
    padding-left: 15px;
    .content-text {
      line-height: 1.2;
      @include overflowText(2);
    }
  }
  &:hover > span {
    opacity: 1;
  }
  & > span {
    transition: opacity $animationTime $animationType;
    opacity: 0;
    &:nth-child(1) {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 3px;
      background: linear-gradient(to right, transparent, $color-blue);
      animation: moveTop 2s linear infinite;
    }
    &:nth-child(2) {
      position: absolute;
      top: 0;
      right: 0;
      height: 100%;
      width: 3px;
      background: linear-gradient(to bottom, transparent, $color-blue);
      animation: moveRight 2s linear infinite;
      animation-delay: 1s;
    }
    &:nth-child(3) {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 3px;
      background: linear-gradient(to left, transparent, $color-blue);
      animation: moveBottom 2s linear infinite;
    }
    &:nth-child(4) {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 3px;
      background: linear-gradient(to top, transparent, $color-blue);
      animation: moveLeft 2s linear infinite;
      animation-delay: 1s;
    }
  }
  // &:hover {
  //   &::before {
  //     background: $color-blue;
  //   }
  //   &::after {
  //     transform: scaleX(1);
  //   }
  // }
  // &::after {
  //   content: '';
  //   position: absolute;
  //   bottom: -3px;
  //   height: 3px;
  //   background: $color-blue;
  //   width: 100%;
  //   transform: scaleX(0);
  //   transition: transform $animationTime $animationType;
  //   z-index: 1;
  // }
  // &::before {
  //   content: '';
  //   position: absolute;
  //   left: 50%;
  //   bottom: -3px;
  //   transform: translateX(-50%);
  //   height: 6px;
  //   width: 6px;
  //   background: #eee;
  //   transform: rotate(45deg);
  //   box-shadow: 0 0 0 5px #fff;
  //   z-index: 2;
  //   transition: background-color $animationTime $animationType;
  // }
}
</style>