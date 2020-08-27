<template>
  <div class="headerbar-container">
    <div class="login-out-btn" @click="loginOut">
      <span class="login-out-text">Login Out</span>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    loginOut() {
      
    }
  },
}
</script>
<style lang="scss" scoped>
@import '@/assets/style/globalScript';
.headerbar-container {
  height: 50px;
  border-bottom: 1px solid #ccc;
  .login-out-btn {
    margin-right: 30px;
    height: 100%;
    float: right;
    font-size: 25px;
    font-weight: 600;
    color: $text-color;
    @include center;
    white-space: nowrap;
    cursor: pointer;
    transition: transform $animationTime $animationType;
    &:hover {
      transform: scale(.96);
    }
  }
}
</style>