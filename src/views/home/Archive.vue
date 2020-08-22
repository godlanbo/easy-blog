<template>
  <div class="archive">
    <blogs-category :categoryList="categoryList" type="time"></blogs-category>
  </div>
</template>

<script>
import BlogsCategory from './components/BlogsCategory/index'
import { getBlogsCategoryList } from '../../api/home'
export default {
  components: {
    BlogsCategory
  },
  data() {
    return {
      categoryList: []
    }
  },
  mounted() {
    getBlogsCategoryList('time').then(res => {
      console.log(res)
      this.categoryList = res.data.categoryList
    })
  },
}
</script>
<style lang="scss" scoped>
@import '@/assets/style/globalScript';
.archive {
  padding-top: 120px;
  padding-bottom: 150px;
}
</style>