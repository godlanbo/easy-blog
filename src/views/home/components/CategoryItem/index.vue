<template>
  <div class="category-item">
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
.category-item {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 0 auto 15px;
  padding: 15px 25px 15px 0;
  border-bottom: 3px solid $bg-color;
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
  &:hover {
    &::before {
      background: $color-blue;
    }
    &::after {
      transform: scaleX(1);
    }
  }
  &::after {
    content: '';
    position: absolute;
    bottom: -3px;
    height: 3px;
    background: $color-blue;
    width: 100%;
    transform: scaleX(0);
    transition: transform $animationTime $animationType;
    z-index: 1;
  }
  &::before {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -3px;
    transform: translateX(-50%);
    height: 6px;
    width: 6px;
    background: #eee;
    transform: rotate(45deg);
    box-shadow: 0 0 0 5px #fff;
    z-index: 2;
    transition: background-color $animationTime $animationType;
  }
}
</style>