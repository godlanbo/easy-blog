<template>
  <div class="container">
    <span>这里什么也没有</span>
  </div>
</template>

<script>

export default {
  
}
</script>
<style lang="scss" scoped>
@import '@/assets/style/globalScript';
.container {
  height: 100vh;
  width: 100%;
  @include center;
  span {
    font-size: 30px;
    font-weight: 800;
    color: $text-color;
  }
}
</style>