<template>
  <div class="blogs-tags">
    <blogs-category :categoryList="categoryList" type="tag"></blogs-category>
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
    getBlogsCategoryList('tag').then(res => {
      this.categoryList = res.data.categoryList
    })
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/style/globalScript';
.blogs-tags {
  padding-top: 120px;
  padding-bottom: 150px;
}
</style>
