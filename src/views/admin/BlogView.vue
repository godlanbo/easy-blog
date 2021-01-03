<template>
  <div class="blog-view">
    <transition name="slide-up" mode="out-in" appear>
      <component :is="mode"></component>
    </transition>
  </div>
</template>

<script>
import BlogList from './BlogList'
import BlogEdit from './BlogEdit'
export default {
  components: {
    BlogList,
    BlogEdit
  },
  data() {
    return {
      mode: 'BlogList'
    }
  },
  watch: {
    $route(val) {
      let mode = val.query.mode
      if (mode === 'edit') {
        this.mode = 'BlogEdit'
      } else {
        this.mode = 'BlogList'
      }
    }
  },
  created() {
    let mode = this.$route.query.mode
    if (mode === 'edit') {
      this.mode = 'BlogEdit'
    } else {
      this.mode = 'BlogList'
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/style/globalScript';
.blog-view {
  width: 100%;
}
</style>
