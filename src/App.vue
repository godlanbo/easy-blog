<template>
  <div id="app">
    <read-progress></read-progress>
    <back-top></back-top>
    <router-view/>
  </div>
</template>
<script>
import ReadProgress from './components/ReadProgress/index'
import BackTop from './components/BackTop/index'
export default {
  components: {
    ReadProgress,
    BackTop
  }
}
</script>
<style lang="scss">

</style>
