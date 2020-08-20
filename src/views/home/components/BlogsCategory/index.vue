<template>
  <div class="blogs-category">
    <div class="blogs-category-content-wrapper">
      <header class="blogs-category-header">
        <span class="header-title">#{{title}}</span>
        <span class="header-desc">共计{{totalNum}}篇文章</span>
      </header>
      <div class="blogs-category-content">
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
            :class="{'isSelected':item.name === title}"
            :key="index"
            @click="switchQuery(item.name)"
          >
            <span class="blogs-category-list-item-text">{{item.name}}</span>
            <span class="blogs-category-list-item-num">{{item.num}}</span>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<script>
import CategoryItem from '../CategoryItem/index'
import { homeMixin } from '../../../../utils/mixin'
export default {
  mixins: [homeMixin],
  components: {
    CategoryItem,
  },
  props: {
    categoryList: Array,
    type: String,
  },
  data() {
    return {
      title: '',
    }
  },
  computed: {
    categoryContentList() {
      return this.blogsList.filter((blog) => {
        return blog.tags.indexOf(this.title) !== -1
      })
    },
    totalNum() {
      let totalNum = 0
      this.categoryList.forEach((item) => {
        if (item.name === this.title) {
          totalNum = item.num
        }
      })
      return totalNum
    }
  },
  watch: {
    $route(value) {
      this.initHeader()
    },
  },
  methods: {
    switchQuery(queryString) {
      if (queryString === this.title) {
        return
      }
      this.$router.replace({
        path: '/blogs/tags',
        query: {
          tag: queryString,
        },
      })
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
  mounted() {
    this.initHeader()
  },
}
</script>
<style lang="scss" scoped>
@import '@/assets/style/globalScript';
.blogs-category {
  .blogs-category-content-wrapper {
    width: 70%;
    margin: 0 auto;
    .blogs-category-header {
      width: 100%;
      border-radius: 5px;
      background: #fff;
      padding: 25px 35px;
      margin-bottom: 5px;
      .header-title {
        font-size: 45px;
        font-weight: 600;
        color: $text-color;
        margin-right: 40px;
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
        }
      }
      .blogs-category-list {
        background: #fff;
        padding: 25px 10px;
        border-radius: 5px;
        .blogs-category-list-item {
          padding: 15px 20px;
          border-radius: 6px;
          background: #f0f3f6;
          box-shadow: 5px 5px 10px #cccfd1, -5px -5px 10px #ffffff;
          color: $text-color;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 22px;
          font-weight: 600;
          transition: all 0.1s $animationType;
          cursor: pointer;
          &-text {
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
        .blogs-category-list-item {
          width: 70%;
          margin: 0 auto 20px;
        }
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
        justify-content: center;
        .blogs-category-list-item {
          margin: 10px 20px 10px 0;
          flex: 0 1 20%;
        }
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