<template>
  <div class="blogs-detail">
    <div class="blogs-detail-content">
      <header class="content-header">
        <span class="release-time">{{
          blogsDetail.releaseTime | dateformat
        }}</span>
        <span class="title">{{ blogsDetail.title }}</span>
      </header>
      <section class="tags">
        <tag-item
          v-for="(item, index) in blogsDetail.tags"
          :key="index"
          :tag="item"
          @select="queryTag"
        ></tag-item>
      </section>
      <article class="content markdown-body" v-html="markDownContent"></article>
    </div>
    <div class="blogs-skip-wrapper" v-if="preBlog || nextBlog">
      <div
        class="pre-btn skip-btn"
        v-if="preBlog"
        @click="onClickSkipBlog(preBlog.id)"
      >
        <span>← {{ normalizeBlogTitle(preBlog.title) }}</span>
      </div>
      <div
        class="next-btn skip-btn"
        v-if="nextBlog"
        @click="onClickSkipBlog(nextBlog.id)"
      >
        <span>{{ normalizeBlogTitle(nextBlog.title) }} →</span>
      </div>
    </div>
    <comment
      @comment-load="handleLoadComment"
      @on-publish-comment="handleRefreshComment"
      :commentsList="commentsList"
      :commentsCount="commentsList.length"
    ></comment>
  </div>
</template>

<script>
import TagItem from '../../components/Tag/index'
import Comment from './components/comment/index.vue'
import prism from 'prismjs'
import { mapGetters } from 'vuex'
import { ensurePageLoaded, normalizeMDContent } from '../../utils'
import initHashLocation from '../../utils/initHashLocation'
export default {
  name: 'BlogsDetail',
  components: {
    TagItem,
    Comment
  },
  data() {
    return {
      blogsDetail: {
        tags: [], // template 不支持可选链式操作，故初始化为空数组
        title: '',
        releaseTime: 0
      },
      markDownContent: '',
      commentsList: []
    }
  },
  metaInfo() {
    return {
      meta: [
        { hid: 'keywords', name: 'keywords', content: `${this.pageKeywords}` },
        {
          hid: 'description',
          name: 'description',
          content: `${this.blogsDetail?.title}`
        }
      ]
    }
  },
  computed: {
    pageKeywords() {
      if (this.blogsDetail?.tags) {
        return this.blogsDetail.tags.join(',')
      }
      return ''
    },
    ...mapGetters([
      'isLoadInfo',
      'getCommentsList',
      'blogsListArr',
      'currentBlogIndex',
      'getBlogsDetail'
    ]),
    preBlog() {
      if (this.currentBlogIndex > 0) {
        let { title, id } = this.getBlogsDetail(
          this.blogsListArr[this.currentBlogIndex - 1]
        )
        return { title, id }
      } else {
        return null
      }
    },
    nextBlog() {
      if (this.currentBlogIndex < this.blogsListArr.length - 1) {
        let { title, id } = this.getBlogsDetail(
          this.blogsListArr[this.currentBlogIndex + 1]
        )
        return { title, id }
      } else {
        return null
      }
    }
  },
  watch: {
    isLoadInfo(val) {
      if (val) {
        this.getBlogsDetailAsync()
      }
    }
  },
  mounted() {
    if (this.isLoadInfo) {
      this.getBlogsDetailAsync()
    }
  },
  methods: {
    normalizeBlogTitle(title) {
      if (title.length <= 20) {
        return title
      } else {
        return title.slice(0, 20) + '...'
      }
    },
    queryTag(tag) {
      this.$router.push({
        path: '/blogs/tags',
        query: {
          tag
        }
      })
    },
    onClickSkipBlog(blogId) {
      this.$router.push(`/blogs/${blogId}`)
      this.$router.go(0)
    },
    getBlogsDetailAsync() {
      let id = this.$route.params.id
      this.$store.dispatch('getBlogsDetail', id).then(data => {
        if (data) {
          this.blogsDetail = data
          this.blogsDetail.content = normalizeMDContent(
            this.blogsDetail.content
          )
          this.markDownContent = this.$markDown.render(this.blogsDetail.content)
          this.$nextTick(() => {
            let preCents = document.querySelectorAll('.extra-class')
            preCents.forEach(preCItem => {
              preCItem.outerHTML = `<div class="${Array.from(
                preCItem.classList
              ).join(' ')}">${preCItem.innerHTML}</div>`
            })
            prism.highlightAllUnder(document)
            this.notifyReadProgressInit()
          })
          document.title = this.blogsDetail.title
        } else {
          this.$router.push('/404')
        }
      })
    },
    notifyReadProgressInit() {
      // 确保页面高度稳定后，通知阅读条初始化
      ensurePageLoaded(() => {
        let e = new Event('page-ready')
        window.dispatchEvent(e)
        initHashLocation()
      })
    },
    handleLoadComment() {
      this.loadComment(false)
    },
    // 发表新评论后强制重新加载评论
    handleRefreshComment() {
      this.loadComment(true)
    },
    loadComment(force) {
      let id = this.$route.params.id
      this.$store.dispatch('getCommentsList', { id, force }).then(() => {
        this.commentsList = this.getCommentsList(id)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/style/globalScript';
.blogs-detail {
  padding-top: 120px;
  display: flex;
  flex-direction: column;
  .blogs-detail-content {
    margin: 0 auto 15px;
    // padding-bottom: 150px;
    .content-header {
      background: #fff;
      border-radius: 5px;
      width: 100%;
      display: flex;
      flex-direction: column;
      padding: 25px 30px;
      margin-bottom: 5px;
      .release-time {
        font-size: 22px;
        font-weight: 600;
        color: #ccc;
        padding-bottom: 20px;
      }
      .title {
        font-size: 40px;
        font-weight: 600;
        color: $text-color;
      }
    }
    .tags {
      width: 100%;
      background: #fff;
      border-radius: 5px;
      padding: 25px 30px 10px;
      display: flex;
      flex-flow: row wrap;
      align-items: center;
      margin-bottom: 5px;
    }
    .content {
      width: 100%;
      border-radius: 5px;
      overflow: hidden;
      background-color: #fff;
      padding: 40px 32px;
    }
  }
  .blogs-skip-wrapper {
    margin: 0 auto 15px;
    border-radius: 5px;
    background-color: #fff;
    padding: 10px 0;
    .skip-btn {
      font-weight: 600;
      color: $text-color;
      white-space: nowrap;
      cursor: pointer;
      @media (min-width: 1080px) {
        font-size: 24px;
        padding: 10px 40px;
      }
      @media (max-width: 1080px) {
        font-size: 20px;
        padding: 10px 20px;
      }
      @media (max-width: 640px) {
        font-size: 18px;
        padding: 10px 15px;
      }
      span {
        transition: background-size 0.3s ease;
        background-image: linear-gradient(to right, $bg-green, $bg-green);
        background-repeat: no-repeat;
        background-size: 0% 35%;
        background-position: 0 bottom;
        &:hover {
          background-size: 100% 35%;
        }
      }
    }
    .pre-btn {
      text-align: left;
    }
    .next-btn {
      text-align: right;
    }
  }
}
@media (min-width: 1080px) {
  .blogs-detail-content,
  .blogs-skip-wrapper {
    width: 70%;
  }
}
@media (max-width: 1080px) {
  .blogs-detail-content,
  .blogs-skip-wrapper {
    width: 80%;
  }
}
@media (max-width: 640px) {
  .blogs-detail-content {
    width: 95%;
  }
  .blogs-skip-wrapper {
    width: 95%;
  }
}
</style>
