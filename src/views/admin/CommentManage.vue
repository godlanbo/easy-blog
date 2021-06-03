<template>
  <div
    class="comment-manager-container flex bg-white-default rounded-sm h-full"
  >
    <!-- 索引列表 -->
    <div class="comment-index-list flex flex-col h-full overflow-x-hidden">
      <div class="comment-index-list-filter mx-4 py-4">
        <el-select
          v-model="filterTags"
          multiple
          placeholder="文章标签：默认全部"
        >
          <el-option
            v-for="(item, index) in allOptionalTags"
            :key="index"
            :label="item.name"
            :value="item.name"
          >
          </el-option>
        </el-select>
      </div>
      <div class="comment-index-list-body overflow-y-scroll">
        <div
          class="comment-index-list-item cursor-pointer"
          :class="{ active: activeBlogIndex === index }"
          v-for="(blog, index) in commentIndexList"
          :key="blog.id"
          @click="handleSelectBlog(index)"
        >
          <div class="item-wrapper mx-4 pt-3 pb-4">
            <div class="item-title text-lg text-grey-8 mb-2">
              <span class="item-title-text">{{ blog.title }}</span>
            </div>
            <div class="item-detail flex items-end">
              <div class="item-count text-sm text-grey-6 flex items-center">
                <span class="icon-comment text-xl"></span
                ><span>{{ blog.commentNum }}</span>
              </div>
              <div class="item-release-time text-sm text-grey-5 ml-auto">
                <span>{{ blog.releaseTime | dateformat('YYYY-MM-DD') }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="comment-index-list-pagination"></div>
    </div>
    <!-- 评论显示列表 -->
    <div class="comment-content-list flex-auto overflow-x-hidden">
      <div class="list-wrapper flex flex-col overflow-y-scroll p-5">
        <div
          class="comment-item flex flex-col mx-4 py-4"
          v-for="comment in currentCommentList"
          :key="comment.cid"
        >
          <div class="comment-item-title flex items-end mb-3">
            <div class="comment-author text-2xl font-semibold text-grey-8">
              <span>{{ comment.nickName }}（{{ comment.email }}）：</span>
            </div>
            <div class="comment-release-time ml-auto text-sm text-grey-6">
              <span>{{ comment.publishTime | dateformat }}</span>
            </div>
          </div>
          <div class="comment-item-content" v-html="comment.content"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getBlogsCategoryList } from '../../api/home'
import { mapGetters } from 'vuex'
export default {
  name: 'CommentManager',
  data() {
    return {
      filterTags: [],
      allOptionalTags: [],
      blogsList: [],
      activeBlogIndex: 0,
      currentCommentList: []
    }
  },
  methods: {
    // 选中索引列表中的一个
    handleSelectBlog(selectIndex) {
      this.activeBlogIndex = selectIndex
      const curBlogId = this.blogsList[selectIndex]?.id // 防止未初始化
      let commentsList = this.getCommentsList(curBlogId) // []
      if (commentsList.length) {
        this.currentCommentList = commentsList
      } else {
        this.$store.dispatch('getCommentsList', { id: curBlogId }).then(() => {
          this.currentCommentList = this.getCommentsList(curBlogId)
        })
      }
    }
  },
  computed: {
    ...mapGetters(['getCommentsList', 'isLoadInfo']),
    commentIndexList() {
      if (this.filterTags.length) {
        return this.blogsList.filter(item => {
          let r = true
          for (let i = 0; i < this.filterTags.length; i++) {
            r = r && item.tags.includes(this.filterTags[i])
          }
          return r
        })
      } else {
        return this.blogsList
      }
    }
  },
  mounted() {
    getBlogsCategoryList('tag').then(res => {
      this.allOptionalTags = res.data.categoryList
    })
    // 页面数据初始化后读取列表数据
    if (this.isLoadInfo) {
      this.blogsList = this.$store.getters.blogsList
      this.handleSelectBlog(0)
    } else {
      window.addEventListener('page-ready', () => {
        this.blogsList = this.$store.getters.blogsList
        this.handleSelectBlog(0)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/style/globalScript';
.comment-manager-container {
  .comment-index-list {
    flex: 0 0 300px;
    border-right: 1px solid #eee;
    .comment-index-list-filter {
      border-bottom: 1px solid #eee;
    }
    .comment-index-list-body {
      width: calc(100% + 6px);
      .comment-index-list-item {
        transition: background-color $animationTime $animationType;
        .item-wrapper {
          border-bottom: 1px solid #eee;
        }
        &.active {
          background-color: rgb(235, 235, 235);
        }
      }
    }
  }
  .comment-content-list {
    .list-wrapper {
      width: calc(100% + 6px);
      height: 100%;
    }
    .comment-item {
      border-bottom: 1px solid #eee;
      .comment-item-content {
        text-indent: 2em;
      }
    }
  }
}
</style>
