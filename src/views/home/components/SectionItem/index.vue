<template>
  <section class="home-section-item">
    <div class="home-section-item-header">
      <span class="title">{{ title }}</span>
      <div class="more-link-btn" @click="linkTo">
        <span>{{ btnText }}</span>
      </div>
    </div>
    <slot></slot>
  </section>
</template>

<script>
export default {
  props: {
    title: String,
    btnText: String,
    linkToAddress: String
  },
  methods: {
    linkTo() {
      this.$router.push(this.linkToAddress)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/style/globalScript';
.home-section-item {
  width: 70%;
  box-sizing: border-box;
  margin: 110px auto 0;
  .home-section-item-header {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 600;
    color: $text-color;
    width: 100%;
    box-sizing: border-box;
    padding: 10px 5px;
    margin-bottom: 15px;
    .title {
      @include colorText($line-color);
      line-height: 1.2;
      font-size: 28px;
      white-space: nowrap;
    }
    .more-link-btn {
      font-size: 14px;
      border: 3px solid $text-color;
      box-sizing: border-box;
      padding: 5px 10px;
      border-radius: 50px;
      cursor: pointer;
      @include center;
      white-space: nowrap;
      transition: color $animationTime $animationType,
        background-image $animationTime $animationType,
        border-color $animationTime $animationType;
      &:hover {
        border: 3px solid $bg-color;
        background: $line-color;
        color: #fff;
      }
    }
    &::before {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 100%;
      height: 4px;
      background: $line-color;
    }
  }
}
</style>
