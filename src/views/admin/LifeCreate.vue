<template>
  <div class="life-create">
    <el-input class="title" v-model="lifeItem.title" placeholder="请输入标题"></el-input>
    <div class="content-wrapper">
      <div class="upload-img-wrapper">
        <div class="img-preview" v-if="lifeItem.imgUrl">
          <img :src="lifeItem.imgUrl" />
        </div>
        <div class="no-img" v-else>
          <span class="no-img-text">暂无图片</span>
        </div>
        <div class="upload-img">
          <el-upload
            action
            :show-file-list="false"
            :auto-upload="true"
            :before-upload="onUploadImg"
          >
            <el-button size="mini" type="primary">点击上传</el-button>
          </el-upload>
        </div>
      </div>
      <div class="content-input-wrapper">
        <el-input
          type="textarea"
          :rows="8"
          placeholder="请输入内容"
          v-model="lifeItem.content"
          resize="none"
        ></el-input>
      </div>
    </div>
    <div class="submit-wrapper">
      <el-button class="submit-btn" size="mini" type="success" @click="releaseLife">发 布</el-button>
    </div>
  </div>
</template>

<script>
import { uploadImg, newLife } from '../../api/admin'
import { editMixin } from '../../utils/mixin'

export default {
  mixins: [editMixin],
  data() {
    return {
      lifeItem: this.getEmptyItem(),
      img: '',
    }
  },
  methods: {
    onUploadImg(file) {
      this.img = file
      let reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (e) => {
        this.lifeItem.imgUrl = e.currentTarget.result
      }
      return false
    },
    getEmptyItem() {
      return {
        title: '',
        content: '',
        imgUrl: '',
      }
    },
    uploadImg() {
      let fd = new FormData()
      fd.append('img', this.img)
      return uploadImg(fd)
    },
    releaseLife() {
      this.uploadImg()
        .then((res) => {
          this.lifeItem.imgUrl = res.data.imgUrl
          return newLife(this.lifeItem)
        })
        .then((res) => {
          this.lifeItem = this.getEmptyItem()
          this.$message({
            type: 'success',
            message: res.message,
          })
        })
        .catch((err) => {
          console.error(err)
        })
    },
  },
}
</script>
<style lang="scss" scoped>
@import '@/assets/style/globalScript';
.life-create {
  width: 80%;
  margin: 0 auto;
  padding-top: 80px;
  display: flex;
  flex-direction: column;
  .title {
    margin-bottom: 10px;
    /deep/ input {
      color: $text-color;
      font-weight: 400;
      font-size: 20px;
    }
  }
  .content-wrapper {
    flex: 1;
    background: #fff;
    border-radius: 5px;
    display: flex;
    padding: 20px 30px;
    margin-bottom: 10px;
    .upload-img-wrapper {
      flex: 0 0 30%;
      margin-right: 10px;
      .img-preview {
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
      .upload-img {
        @include center;
      }
    }
    .content-input-wrapper {
      flex: 1;
      height: 100%;
      /deep/ textarea {
        font-weight: 400;
        font-size: 20px;
        font-family: 'consolas';
      }
    }
  }
  .submit-wrapper {
    display: flex;
    justify-content: flex-end;
    .submit-btn {
      width: 200px;
    }
  }
}
</style>