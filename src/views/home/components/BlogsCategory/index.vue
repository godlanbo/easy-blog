<template>
  <div class="blogs-category">
    <div class="blogs-category-content-wrapper">
      <header class="blogs-category-header">
        <span class="header-title">#{{ title }}</span>
        <span class="header-desc">共计{{ totalNum }}篇文章</span>
      </header>
      <div class="blogs-category-content items-start">
        <main class="blogs-category-content-list">
          <div
            class="blogs-category-content-list-item"
            v-for="item in categoryContentList"
            :key="item.id"
            @click="linkToBlogsDetail(item.id)"
          >
            <category-item :data="item"></category-item>
          </div>
        </main>
        <!-- <aside class="blogs-category-list">
          <div
            class="blogs-category-list-item"
            v-for="(item, index) in categoryList"
            :class="{ isSelected: item.name == title }"
            :key="index"
            @click="switchQuery(item.name)"
          >
            <span class="blogs-category-list-item-text">{{ item.name }}</span>
            <span class="blogs-category-list-item-num">{{ item.num }}</span>
          </div>
        </aside> -->
        <component
          :is="sidebarComponent"
          :categoryRenderList="categoryRenderList"
          :title="title"
          @switch-query="switchQuery"
        ></component>
      </div>
    </div>
  </div>
</template>

<script>
import CategoryItem from '../CategoryItem/index'
import TagSidebar from './tagSidebar'
import TimeSidebar from './timeSidebar'
import { listInfoMixin } from '../../../../utils/mixin'
import { getMonth, getYear } from '../../../../utils/index'
export default {
  mixins: [listInfoMixin],
  components: {
    CategoryItem,
    TagSidebar,
    TimeSidebar
  },
  props: {
    categoryList: {
      type: Array,
      default: () => []
    },
    type: String
  },
  data() {
    return {
      title: '',
      blogMapByTime: {},
      // 需要渲染的分类列表数据
      categoryRenderList: {}
    }
  },
  computed: {
    sidebarComponent() {
      if (this.type === 'tag') {
        return 'TagSidebar'
      } else {
        return 'TimeSidebar'
      }
    },
    categoryContentList() {
      if (this.type === 'tag') {
        return this.blogsList.filter(blog => {
          return blog.tags.indexOf(this.title) !== -1
        })
      } else {
        let date = this.title.split('-')
        return (
          this.blogMapByTime[date[0]] && this.blogMapByTime[date[0]][date[1]]
        )
      }
    },
    totalNum() {
      if (this.type === 'tag') {
        // 页面初始化的时候categoryRenderList为对象，防止报错
        if (!Array.isArray(this.categoryRenderList)) {
          return 0
        }
        for (const item of this.categoryRenderList) {
          if (item.name == this.title) {
            return item.num
          }
        }
      } else {
        let date = this.title.split('-')
        return (
          (this.categoryRenderList[date[0]] &&
            this.categoryRenderList[date[0]][date[1]]) ||
          0
        )
      }
      return 0
    }
  },
  watch: {
    categoryList() {
      this.initCategoryRenderListData()
      this.initHeader()
    }
  },
  methods: {
    // 初始化侧边栏所需分类列表数据
    initCategoryRenderListData() {
      if (this.type === 'tag') {
        this.categoryRenderList = this.categoryList
      } else {
        let blogMapByTime = {}
        /**
         * {
         *  2012: {4: {}, 6: {}, 9: {}},
         *  2013: {5: {}, 7: {}, 10: {}},
         * }
         */
        let res = {}
        for (const blog of this.blogsList) {
          for (const timeCategory of this.categoryList) {
            const year = timeCategory.name
            const month = getMonth(blog.releaseTime)
            if (!blogMapByTime[year]) {
              blogMapByTime[year] = {}
            }
            if (!res[year]) {
              res[year] = {}
            }
            if (getYear(blog.releaseTime) === +year) {
              if (blogMapByTime[year][month]) {
                blogMapByTime[year][month].push(blog)
              } else {
                blogMapByTime[year][month] = [blog]
              }
              if (res[year][month]) {
                res[year][month]++
              } else {
                res[year][month] = 1
              }
            }
          }
        }
        this.blogMapByTime = blogMapByTime
        this.categoryRenderList = res
      }
    },
    switchQuery(queryString) {
      if (queryString === this.title) {
        return
      }
      this.title = queryString
      if (this.type === 'tag') {
        this.$router.replace({
          path: '/blogs/tags',
          query: {
            tag: queryString
          }
        })
      } else {
        this.$router.replace({
          path: '/archive',
          query: {
            time: queryString
          }
        })
      }
    },
    initHeader() {
      this.title = this.$route.query[this.type]
    },
    linkToBlogsDetail(id) {
      this.$router.push({
        path: `/blogs/${id}`
      })
    }
  },
  activated() {
    this.initCategoryRenderListData()
    this.initHeader()
  }
}
</script>
<style lang="scss">
@import '@/assets/style/globalScript';
.blogs-category {
  .blogs-category-content-wrapper {
    width: 70%;
    margin: 0 auto;
    .blogs-category-header {
      display: flex;
      align-items: center;
      width: 100%;
      border-radius: 5px;
      background: #fff;
      padding: 25px 35px;
      margin-bottom: 5px;
      @media (max-width: 640px) {
        flex-direction: column;
      }
      .header-title {
        font-size: 45px;
        font-weight: 600;
        color: $text-color;
        margin-right: 40px;
        @media (max-width: 640px) {
          margin-bottom: 15px;
          margin-right: 0px;
        }
      }
      .header-desc {
        font-size: 20px;
        font-weight: 400;
        color: $text-color;
      }
    }
    .blogs-category-content {
      position: static;
      display: flex;
      width: 100%;
      .blogs-category-content-list {
        background: #fff;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 25px 0;
        .blogs-category-content-list-item {
          flex: 1;
          width: 100%;
        }
      }
    }
  }
}
@media (min-width: 1080px) {
  .blogs-category-content-wrapper {
    .blogs-category-content {
      flex-direction: row;
      .blogs-category-content-list {
        flex: 0 1 calc(75% - 5px);
        margin-right: 5px;
      }
      .blogs-category-list {
        flex: 0 1 25%;
      }
    }
  }
}
@media (max-width: 1080px) {
  .blogs-category-content-wrapper {
    .blogs-category-content {
      flex-direction: column;
      .blogs-category-content-list {
        width: 100%;
        order: 1;
      }
      .blogs-category-list {
        width: 100%;
        margin-bottom: 5px;
        display: flex;
        flex-flow: row wrap;
      }
    }
  }
}
@media (max-width: 640px) {
  .blogs-category {
    .blogs-category-content-wrapper {
      width: 90%;
    }
  }
}
</style>
