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
        <aside class="blogs-category-list">
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
        </aside>
      </div>
    </div>
  </div>
</template>

<script>
import CategoryItem from '../CategoryItem/index'
import { listInfoMixin } from '../../../../utils/mixin'
import { isSameYear } from '../../../../utils/index'
export default {
  mixins: [listInfoMixin],
  components: {
    CategoryItem
  },
  props: {
    categoryList: Array,
    type: String
  },
  data() {
    return {
      title: ''
    }
  },
  computed: {
    categoryContentList() {
      if (this.type === 'tag') {
        return this.blogsList.filter(blog => {
          return blog.tags.indexOf(this.title) !== -1
        })
      } else {
        return this.blogsList.filter(blog => {
          return isSameYear(blog.releaseTime, this.title)
        })
      }
    },
    totalNum() {
      let totalNum = 0
      this.categoryList.forEach(item => {
        if (item.name == this.title && this.type === 'tag') {
          totalNum = item.num
        } else if (item.name == this.title && this.type === 'time') {
          totalNum = item.num
        }
      })
      return totalNum
    }
  },
  methods: {
    switchQuery(queryString) {
      if (queryString === this.title) {
        return
      }
      if (this.type === 'tag') {
        this.$router.replace({
          path: '/blogs/tags',
          query: {
            tag: queryString
          }
        })
        this.title = queryString
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
    this.initHeader()
  }
}
</script>
<style lang="scss" scoped>
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
      .blogs-category-list {
        background: #fff;
        padding: 25px 10px;
        @media (max-width: 1080px) {
          padding: 25px 30px;
        }
        border-radius: 5px;
        .blogs-category-list-item {
          width: 70%;
          margin: 0 auto 20px;
          padding: 15px 20px;
          border-radius: 6px;
          background: #f0f3f6;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
            0 4px 6px -2px rgba(0, 0, 0, 0.05);
          color: $text-color;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 22px;
          font-weight: 600;
          transition: all 0.1s $animationType;
          cursor: pointer;
          @media (max-width: 1080px) {
            margin: 10px 10px 10px 0;
            flex: 0 1 20%;
            font-size: 20px;
          }
          @media (max-width: 640px) {
            padding: 10px;
            font-size: 18px;
          }
          &-text {
            white-space: nowrap;
            padding-right: 5px;
          }
          &:hover {
            background: $text-color;
            color: #fff;
            transform: scale(1.2);
          }
          &.isSelected {
            background: $text-color;
            color: #fff;
          }
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
