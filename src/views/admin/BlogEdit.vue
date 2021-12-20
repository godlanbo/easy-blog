<template>
  <div class="blog-edit-container">
    <div class="blog-content-wrapper">
      <div class="title-wrapper">
        <input
          type="text"
          class="title-text"
          v-model="blog.title"
          placeholder="输入文章标题"
        />
      </div>
      <div class="content-wrapper">
        <mavon-editor
          ref="md"
          class="content-view"
          v-model="blog.content"
          :subfield="false"
          :ishljs="true"
          :boxShadow="false"
          @imgAdd="onImgAdd"
          @imgDel="onImgDel"
          codeStyle="monokai"
        />
      </div>
    </div>
    <div class="edit-cover-and-tags-panel">
      <div class="edit-cover">
        <div class="img-wrapper" v-if="blog.cover">
          <img alt="upload blog cover" :src="blog.cover" />
        </div>
        <div class="no-img" v-else>
          <span class="no-img-text">暂无封面图片</span>
        </div>
        <el-input
          v-model="blog.cover"
          class="mb-3.5"
          clearable
          placeholder="填入图片链接"
        ></el-input>
        <div class="handle-panel">
          <el-upload
            action
            :show-file-list="false"
            :auto-upload="true"
            :before-upload="onUploadCover"
          >
            <el-button size="mini" type="primary">点击上传</el-button>
          </el-upload>
          <el-button size="mini" type="primary" @click="getRandomCover"
            >随机获取</el-button
          >
        </div>
      </div>
      <div class="release-info-wrapper" v-if="mode === 'edit'">
        <div class="title">
          <span class="title-text">文章信息</span>
        </div>
        <div class="content">
          <div class="author line">
            <span class="el-icon-user mark"></span>
            <span class="text">作者：</span>
            <span>{{ blog.author }}</span>
          </div>
          <div class="release-tim line">
            <span class="el-icon-date mark"></span>
            <span class="text">发布时间：</span>
            <span>{{ blog.releaseTime | dateformat('YYYY年MM月DD日') }}</span>
          </div>
        </div>
      </div>
      <tags-panel
        :tags-item-list="tagCategoryList"
        :selected-tags="selectedTags"
        :can-edit="true"
        @update:selectedTags="onSelectTag"
        @add-tag="onAddTag"
      ></tags-panel>
      <el-button class="submit-btn" type="success" @click="onSaveBlogEdit">{{
        mode === 'create' ? '发布' : '保存'
      }}</el-button>
    </div>
  </div>
</template>

<script>
import TagsPanel from './components/TagsPanel/index'
import { getBlogsCategoryList } from '../../api/home'
import {
  addTag,
  uploadImg,
  newBlog,
  updateBlog,
  deletImg
} from '../../api/admin'
import { getLocalStorage, removeLocalStorage } from '../../utils/localStorage'
import { editMixin } from '../../utils/mixin'
export default {
  name: 'blogEdit',
  components: {
    TagsPanel
  },
  mixins: [editMixin],
  data() {
    return {
      tagCategoryList: [],
      blog: {},
      mode: 'create',
      coverFile: null
    }
  },
  computed: {
    selectedTags() {
      return this.tagCategoryList.map(tag => this.blog.tags.includes(tag.name))
    }
  },
  methods: {
    onSelectTag(arr) {
      this.blog.tags = this.tagCategoryList
        .filter((tag, idx) => arr[idx])
        .map(tagItem => tagItem.name)
    },
    onAddTag(value) {
      addTag(value).then(res => {
        this.tagCategoryList = res.data.tagCategoryList
      })
    },
    getRandomCover() {
      this.blog.cover = `https://picsum.photos/seed/${Date.now()}/672/360`
    },
    onSaveBlogEdit() {
      if (this.mode === 'create') {
        this.releaseBlog()
          .then(() => {
            this.$message({
              type: 'success',
              message: '发布成功'
            })
            this.isShowLeaveWarning = false
            this.$router.back()
            this.getBlogsList()
          })
          .catch(console.error)
      } else {
        this.updateBlog()
          .then(() => {
            this.$message({
              type: 'success',
              message: '更新博客成功'
            })
            this.getBlogsList()
          })
          .catch(console.error)
      }
    },
    updateBlog() {
      return Promise.resolve().then(() => {
        if (this.coverFile) {
          return this.uploadImage(this.coverFile).then(res => {
            this.blog.cover = res.data.imgUrl
            return updateBlog(this.blog)
          })
        } else {
          return updateBlog(this.blog)
        }
      })
    },
    getEmptyBlog() {
      return {
        cover: '',
        title: '',
        content: '',
        tags: []
      }
    },
    releaseBlog() {
      return Promise.resolve().then(() => {
        if (this.coverFile) {
          return this.uploadImage(this.coverFile).then(res => {
            this.blog.cover = res.data.imgUrl
            return newBlog(this.blog)
          })
        } else {
          return newBlog(this.blog)
        }
      })
    },
    uploadImage(img) {
      let fd = new FormData()
      fd.append('img', img)
      return uploadImg(fd)
    },
    onUploadCover(file) {
      this.coverFile = file
      let reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = e => {
        this.blog.cover = e.currentTarget.result
      }
      return false
    },
    onImgAdd(pos, file) {
      this.uploadImage(file).then(res => {
        this.$refs.md.$img2Url(pos, res.data.imgUrl)
      })
    },
    onImgDel(pos) {
      const fileName = pos[0].split('/').pop()
      deletImg(fileName)
        .then(res => {
          this.$message({
            type: 'success',
            message: res.message
          })
        })
        .catch(err => {
          console.error(err)
        })
    }
  },
  mounted() {
    getBlogsCategoryList('tag').then(res => {
      this.tagCategoryList = res.data.categoryList
      this.blog = getLocalStorage('blog')
      if (this.blog) {
        this.mode = 'edit'
      } else {
        this.blog = this.getEmptyBlog()
      }
    })
  },
  destroyed() {
    removeLocalStorage('blog')
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/style/globalScript';
.blog-edit-container {
  width: 100%;
  display: flex;
  justify-content: center;
  .blog-content-wrapper {
    flex: 0 0 70%;
    display: flex;
    margin-right: 10px;
    flex-direction: column;
    height: auto;
    .title-wrapper {
      flex: 0 0 40px;
      margin-bottom: 10px;
      .title-text {
        width: 100%;
        height: 100%;
        border: 1px solid;
        border-radius: 5px;
        outline: none;
        font-size: 25px;
        font-weight: 600;
        color: $text-color;
        padding: 1px 10px;
        border-color: #ccc;
        &::placeholder {
          font-weight: 400;
          color: #ccc;
        }
        &:focus {
          border-color: $color-blue;
          box-shadow: 0 0 0 1px $color-blue;
        }
      }
    }
    .content-wrapper {
      flex: 1;
      border-radius: 5px;
      background: #fff;
      overflow: hidden;
      max-width: 892px;
      .content-view {
        height: 100%;
      }
    }
  }
  .edit-cover-and-tags-panel {
    flex: 0 0 25%;
    display: flex;
    flex-direction: column;
    .edit-cover {
      background: #fff;
      margin-bottom: 10px;
      padding: 15px 10px;
      border-radius: 5px;
      .img-wrapper {
        width: 100%;
        margin-bottom: 15px;
        img {
          height: 220px;
          object-fit: cover;
          width: 100%;
          border-radius: 5px;
        }
      }
      .no-img {
        width: 100%;
        margin-bottom: 15px;
        border-radius: 5px;
        height: 220px;
        border: 1px dashed #ccc;
        color: #ccc;
        @include center;
        font-size: 14px;
      }
      .handle-panel {
        display: flex;
        justify-content: space-around;
      }
    }
    .tags-panel {
      margin-bottom: 10px;
    }
    .submit-btn {
      width: 100%;
    }
    .release-info-wrapper {
      padding: 10px;
      border-radius: 5px;
      background: #fff;
      margin-bottom: 10px;
      .title {
        text-align: center;
        width: 90%;
        margin: 0 auto;
        font-size: 20px;
        font-weight: 600;
        border-bottom: 1px solid #ccc;
        margin-bottom: 15px;
        padding: 10px;
      }
      .content {
        width: 90%;
        margin: 0 auto;
        .line {
          margin-bottom: 15px;
          font-size: 16px;
          color: $text-color;
          display: flex;
          align-items: center;
          .text {
            font-weight: 600;
          }
          .mark {
            margin-right: 7px;
            font-weight: 600;
            font-size: 18px;
          }
        }
      }
    }
  }
}
</style>
