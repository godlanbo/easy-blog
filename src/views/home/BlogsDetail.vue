<template>
  <div class="blogs-detail">
    <div class="blogs-detail-content">
      <header class="content-header">
        <span class="release-time">{{blogsDetail.releaseTime | dateformat}}</span>
        <span class="title">{{blogsDetail.title}}</span>
      </header>
      <section class="tags">
        <div
          class="tag-item"
          v-for="(item, index) in blogsDetail.tags"
          :key="index"
          @click.prevent="queryTag(item)"
        >
          <span class="tag-item-text uppercase">#{{item}}</span>
        </div>
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
import { getBlogsDetail } from '../../api/home'
export default {
  name: 'BlogsDetail',
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
      this.markDownContent = this.blogsDetail.content.replace(/[ ]{2,}/g, '')
    })
  },
  methods: {
    queryTag(tag) {
      this.$router.push({
        path: '/blogs/tags',
        query: {
          tag
        }
      })
    }
  },
}
</script>
<style lang="scss" scoped>
@import '@/assets/style/globalScript';
.blogs-detail {
  padding-top: 120px;
  .blogs-detail-content {
    width: 70%;
    margin: 0 auto;
    padding-bottom: 150px;
    .content-header {
      background: #fff;
      border-radius: 5px;
      width: 100%;
      // height: 80px;
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
        padding-bottom: 20px;
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
      .tag-item {
        font-size: 16px;
        color: $text-color;
        font-weight: 600;
        padding: 8px 13px;
        border-radius: 55px;
        margin-right: 15px;
        background: $bg-color;
        cursor: pointer;
        transition: all $animationTime $animationType;
        &:hover {
          background: $color-blue;
          color: #fff;
        }
      }
    }
    .content {
      width: 100%;
      border-radius: 5px;
      overflow: hidden;
      .content-view {
        // height: 100vh;
        width: 100%;
        /deep/ .hljs {
          font-size: 20px !important;
          font-weight: 600;
        }
      }
    }
  }
}
</style>