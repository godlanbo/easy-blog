<template>
  <div class="blogs-detail">
    <div class="blogs-detail-content">
      <header class="content-header">
        <span class="release-time">{{blogsDetail.releaseTime | dateformat}}</span>
        <span class="title">{{blogsDetail.title}}</span>
      </header>
      <section class="tags">
        <tag-item
          v-for="(item, index) in blogsDetail.tags"
          :key="index"
          :tag="item"
          @select="queryTag"
        ></tag-item>
      </section>
      <article class="content">
        <mavon-editor
          class="content-view"
          :value="markDownContent"
          :editable="false"
          :toolbarsFlag="false"
          defaultOpen="preview"
          :subfield="false"
          :ishljs="true"
          :boxShadow="false"
          codeStyle="monokai"
        />
      </article>
    </div>
  </div>
</template>

<script>
import { getBlogsDetail } from '../../api/index'
import TagItem from '../../components/Tag/index'
export default {
  name: 'BlogsDetail',
  components: {
    TagItem,
  },
  data() {
    return {
      blogsDetail: {},
      markDownContent: '',
    }
  },
  created() {
    let id = this.$route.params.id
    getBlogsDetail(id).then((res) => {
      this.blogsDetail = res.data
      this.blogsDetail.content = this.blogsDetail.content.replace(/&gt;/g, '>')
      this.markDownContent = this.blogsDetail.content
      document.title = this.blogsDetail.title
    })
  },
  methods: {
    queryTag(tag) {
      this.$router.push({
        path: '/blogs/tags',
        query: {
          tag,
        },
      })
    },
  },
}
</script>
<style lang="scss" scoped>
@import '@/assets/style/globalScript';
.blogs-detail {
  padding-top: 120px;
  .blogs-detail-content {
    margin: 0 auto;
    padding-bottom: 150px;
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
      padding: 25px 30px;
      display: flex;
      flex-flow: row wrap;
      align-items: center;
      margin-bottom: 5px;
    }
    .content {
      width: 100%;
      border-radius: 5px;
      overflow: hidden;
      .content-view {
        // height: 100vh;
        width: 100%;
        /deep/ code {
          font-size: 16px !important;
        }
      }
    }
  }
}
@media (min-width: 1080px) {
  .blogs-detail-content {
    width: 70%;
  }
}
@media (max-width: 1080px) {
  .blogs-detail-content {
    width: 80%;
  }
}
@media (max-width: 640px) {
  .blogs-detail-content {
    width: 95%;
    /deep/ pre {
      padding: 16px 0 !important;
    }
  }
}
</style>