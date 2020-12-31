<template>
  <footer class="footer-wrapper">
    <span>Copyright <span class="copyright">©</span> 2020 🔥GodLanBo🔥.</span>
  </footer>
</template>
<script>
export default {
  
}
</script>
<style lang="scss" scoped>
@import '@/assets/style/globalScript';
.footer-wrapper {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  padding: 15px;
  background: $line-color;
  @include center;
  color: #fff;
  font-size: 15px;
  .copyright {
    font-family: 'Helvetica';
  }
}
</style>