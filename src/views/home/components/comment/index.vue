<template>
  <div class="comment-wrapper">
    <div class="publish-comment-wrapper">
      <div class="logo-wrapper">
        <span class="icon-logo"></span>
      </div>
      <div class="publish-comment-form">
        <div class="inline-input-wrapper">
          <div class="input-wrapper">
            <label for="nickName">昵称: </label>
            <el-input
              id="nickName"
              v-model="postComment.nickName"
              placeholder="在这儿输入昵称"
              prefix-icon="el-icon-user"
              suffix-icon="el-icon-warning-outline"
            ></el-input>
          </div>
          <div class="input-wrapper">
            <label for="email">邮件地址: </label>
            <el-input
              id="email"
              v-model="postComment.email"
              placeholder="在这儿输入邮件地址"
              prefix-icon="el-icon-monitor"
              suffix-icon="el-icon-warning-outline"
            ></el-input>
          </div>
        </div>
        <div
          class="comment-input-wrapper"
          :class="{ 'on-focus': commentInputIsFocus }"
        >
          <el-input
            v-model="postComment.content"
            type="textarea"
            :rows="5"
            @focus="onFocusCommentInput"
            @blur="onBlurCommentInput"
            resize="none"
            placeholder="这里是输入内容/支持markdown格式"
          ></el-input>
          <div class="input-toolbar">
            <div class="toolbar-item emoji" v-popover:popover>
              <span class="icon-emoji"></span>
            </div>
            
          </div>
        </div>
        <div class="publish-comment-form-footer">
          <div class="tips">
            <span
              >你的邮件地址不会被公开，必填项已用<i
                class="el-icon-warning-outline"
              ></i
              >标识</span
            >
          </div>
          <el-button type="success" plain @click="onSubmitComment"
            >发送 !</el-button
          >
        </div>
      </div>
    </div>
    <div class="comment-list">
      <div class="comment-list-head">
        <div class="comment-count">
          <span class="comment-count-text">{{ commentsCount }} 条评论</span>
        </div>
      </div>
      <div class="comment-item" v-for="item in commentsList" :key="item.cid">
        <div class="comment-item-avatar">
          <div class="avatar-wrapper">{{ item.nickName[0].toUpperCase() }}</div>
        </div>
        <div class="comment-item-body">
          <div class="comment-item-body-head">
            <div class="nickName">
              <span class="nickNamc-text">{{ item.nickName }}</span>
            </div>
            <div class="publish-time">
              <span class="publish-time-text">{{ item.publishTime }}</span>
            </div>
          </div>
          <div
            class="comment-item-body-content markdown-body"
            v-html="item.content"
          ></div>
        </div>
      </div>
    </div>
    <el-popover ref="popover" placement="left" width="290" trigger="click">
      <div class="emoji-list-wrapper" @click="handleEmojiSelect">
        <div class="emoji-item" v-for="(emoji, index) in emojisList" :key="index">
          <span>{{ emoji }}</span>
        </div>
      </div>
    </el-popover>
  </div>
</template>

<script>
import { publishComment } from '../../../../api/home'
import { isEmail } from '../../../../utils'
import { emoji } from '../../../../utils/emoji'
export default {
  name: 'comment',
  props: {
    commentsList: {
      type: Array,
      default: () => [],
      required: true
    },
    commentsCount: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      postComment: {
        nickName: '',
        email: '',
        content: ''
      },
      commentInputIsFocus: false,
      emojisList: emoji
    }
  },
  updated() {
    // 评论加载后再次通知进度条初始化
    this.$nextTick(() => {
      let e = new Event('page-ready')
      window.dispatchEvent(e)
    })
  },
  methods: {
    handleEmojiSelect(event) {
      this.postComment.content += event.target.innerText
    },
    onFocusCommentInput() {
      this.commentInputIsFocus = true
    },
    onBlurCommentInput() {
      this.commentInputIsFocus = false
    },
    resetPost() {
      this.postComment = {
        nickName: '',
        email: '',
        content: ''
      }
    },
    validatePost() {
      let post = this.postComment
      if (post.nickName.length === 0) {
        this.$message({
          type: 'warning',
          message: '昵称不能为空'
        })
        return false
      }
      if (post.email.length === 0) {
        this.$message({
          type: 'warning',
          message: '邮箱不能为空'
        })
        return false
      }
      if (!isEmail(post.email)) {
        this.$message({
          type: 'error',
          message: '非法的邮箱地址'
        })
        return false
      }
      if (post.content.length === 0) {
        this.$message({
          type: 'warning',
          message: '评论内容不能为空'
        })
        return false
      }
      return true
    },
    onSubmitComment() {
      if (this.validatePost()) {
        publishComment(this.postComment, this.$route.params.id).then((res) => {
          this.$message({
            type: 'success',
            message: res.message
          })
          this.resetPost()
          this.$emit('on-publish-comment')
        })
      }
    }
  },
  mounted() {
    let commentRef = document.querySelector('.comment-wrapper')
    let observe = new IntersectionObserver((entries, observer) => {
      let el = entries[0].target
      if (entries[0].isIntersecting) {
        this.$emit('comment-load')
        observer.unobserve(el)
      }
    })
    observe.observe(commentRef)
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/globalScript';
.comment-wrapper {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding-bottom: 120px;
  .publish-comment-wrapper {
    display: flex;
    border-bottom: 1px solid #ddd;
    margin-bottom: 15px;
    .logo-wrapper {
      flex: 0 0 80px;
      font-size: 38px;
      font-weight: 600;
      color: $text-color;
      @include center;
    }
    .publish-comment-form {
      flex: 1;
      .inline-input-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 15px;
        .input-wrapper {
          display: flex;
          align-items: center;
          width: 45%;
          label {
            white-space: nowrap;
            color: $text-color;
            font-size: 18px;
            font-weight: 600;
            margin-right: 10px;
          }
          .el-input /deep/ input {
            font-size: 16px;
            transition: box-shadow 0.2s ease;
            &:hover,
            &:focus {
              border-color: $theme-color;
              box-shadow: $focus-border-shadow;
            }
          }
        }
      }
      .comment-input-wrapper {
        &.on-focus,
        &:hover {
          .el-textarea /deep/ textarea {
            box-shadow: 0px -3px 0px rgba(48, 132, 154, 0.5),
              3px 0px 0px rgba(48, 132, 154, 0.5),
              -3px 0px 0px rgba(48, 132, 154, 0.5);
            border-color: $theme-color;
            border-bottom-color: #DCDFE6;
          }
          .input-toolbar {
            box-shadow: 0px 3px 0px rgba(48, 132, 154, 0.5),
              3px 0px 0px rgba(48, 132, 154, 0.5),
              -3px 0px 0px rgba(48, 132, 154, 0.5);
            border-color: $theme-color;
          }
        }
        margin-bottom: 15px;
        .el-textarea /deep/ textarea {
          font-size: 16px;
          font-family: Arial;
          padding: 20px 15px;
          transition: box-shadow 0.2s ease;
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;
        }
        .input-toolbar {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding: 5px 15px;
          background-color: #fff;
          border: 1px solid #DCDFE6;
          border-top: unset;
          border-bottom-left-radius: 4px;
          border-bottom-right-radius: 4px;
          transition: box-shadow 0.2s ease;
          .toolbar-item {
            height: 100%;
            @include center;
            color: #aaa;
            font-size: 20px;
            padding: 5px;
            cursor: pointer;
          }
        }
      }
      .publish-comment-form-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 15px;
        .tips {
          color: #ccc;
        }
        .el-button {
          width: 20%;
        }
      }
    }
  }
  .comment-list {
    .comment-list-head {
      margin-bottom: 25px;
      .comment-count {
        color: $text-color;
        font-size: 20px;
        font-weight: 600;
        line-height: 1.2;
        .comment-count-text {
          cursor: pointer;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
    .comment-item {
      display: flex;
      margin-bottom: 20px;
      .comment-item-avatar {
        position: relative;
        flex: 0 0 100px;
        height: 100%;
        padding-top: 15px;
        display: flex;
        justify-content: center;
        .avatar-wrapper {
          display: inline-block;
          top: 0;
          height: 50px;
          line-height: 50px;
          width: 50px;
          border-radius: 50%;
          color: $text-color;
          font-size: 30px;
          box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
          font-weight: 800;
          text-align: center;
          background-color: #fff;
        }
      }
      .comment-item-body {
        flex: 1;
        border-radius: 5px;
        border: 1px solid #ddd;
        background-color: #fff;
        .comment-item-body-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px;
          border-bottom: 1px solid #ddd;
          .nickName {
            font-size: 16px;
            color: $text-color;
            font-weight: 600;
          }
          .publish-time {
            font-size: 16px;
            color: #a3aab1;
            font-weight: 400;
          }
        }
        .comment-item-body-content {
          padding: 15px;
        }
      }
    }
  }
}
.emoji-list-wrapper {
  display: flex;
  height: 200px;
  justify-content: flex-start;
  overflow-y: scroll;
  flex-wrap: wrap;
  .emoji-item {
    flex: 0 0 30px;
    @include center;
    padding: 5px;
    cursor: pointer;
    transition: transform .15s cubic-bezier(.2,0,.13,2);
    &:hover {
      transform: scale(1.25);
    }
  }
}
@media (min-width: 1080px) {
  .comment-wrapper {
    width: 70%;
  }
}
@media (max-width: 1080px) {
  .comment-wrapper {
    width: 80%;
  }
}
@media (max-width: 640px) {
  .comment-wrapper {
    width: 95%;
    .publish-comment-wrapper {
      .publish-comment-form {
        .inline-input-wrapper {
          flex-direction: column;
          align-items: flex-start;
          .input-wrapper {
            width: 100%;
          }
          .input-wrapper + .input-wrapper {
            margin-top: 15px;
          }
        }
        .publish-comment-form-footer {
          flex-direction: column;
          .tips {
            margin-bottom: 15px;
          }
          .el-button {
            width: 50%;
          }
        }
      }
    }
    .comment-list {
      .comment-item {
        .comment-item-avatar {
          flex: 0 0 20%;
        }
      }
    }
  }
}
</style>