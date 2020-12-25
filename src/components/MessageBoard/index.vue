<template>
  <div class="message-board-placeholder">
    <transition name="slide-left">
      <div class="message-board" v-show="messageBoardVisible">
        <div class="message-board-header">
          <span class="close-btn icon-down" @click="toggleMessageBoard"></span>
          <div class="header-banner-wrapper">
            <div class="header-banner">
              <h2 class="banner-title">嗨，你好👋</h2>
              <p class="banner-content">
                欢迎来到我的个人博客</br>
                在这里留下你想对我说的🎉
              </p>
            </div>
            <div class="header-avatar">
              <img src="/image/avatar.jpeg" />
            </div>
          </div>
          <div class="header-title">
            <span class="header-title-text">😀 确保输入的邮箱有效，方便我回复您</span>
          </div>
        </div>
        <div class="message-board-body">
          <el-input
            class="input-box"
            type="text"
            placeholder="请输入邮箱地址"
            v-model="messageData.email">
          </el-input>
          <div style="margin: 5px 0;"></div>
          <el-input
            class="input-box"
            type="textarea"
            resize="none"
            autosize
            placeholder="请输入你想说的内容"
            v-model="messageData.message">
          </el-input>
        </div>
        <div class="message-board-footer"></div>
      </div>
    </transition>
    <transition name="slide-right-1">
      <div
        class="message-board-toggle-btn"
        v-show="toolListVisible"
        @click="handleClickToggleBtn"
        :class="{'message-board-visible': messageBoardVisible}"
      >
        <span class="icon icon-issue" :class="{ active: !messageBoardVisible }"></span>
        <span class="icon icon-send" :class="{ active: messageBoardVisible }"></span>
      </div>
    </transition>
  </div>
</template>
<script>
import { sendMessageBoard } from '../../api'
import { isEmail } from '../../utils'
import { getLocalStorage, setLocalStorage } from '../../utils/localStorage'
import { popoverToolListMixin } from '../../utils/mixin'
export default {
  name: 'MessageBoard',
  mixins: [popoverToolListMixin],
  data() {
    return {
      messageData: {
        email: '',
        message: ''
      }
    }
  },
  methods: {
    resetForm() {
      this.toggleMessageBoard()
      setLocalStorage('guest-email', this.messageData.email, { exp: 30 * 24 * 3600 })
      this.messageData.message = ''
    },
    validateForm() {
      let inputs = document.querySelectorAll('.input-box')
      if (!this.messageData.email.length) {
        this.animateElement(inputs[0], 'shake-message', 800)
        return false
      }
      if (!isEmail(this.messageData.email)) {
        this.$message({
          type: 'warning',
          message: '必须是有效的邮箱地址'
        })
        return false
      }
      if (!this.messageData.message.length) {
        this.animateElement(inputs[1], 'shake-message', 800)
        return false
      }
      return true
    },
    animateElement(el, name, duration) {
      el.classList.add(name)
      setTimeout(() => {
        el.classList.remove(name)
      }, duration)
    },
    handleClickToggleBtn() {
      if (this.messageBoardVisible) {
        this.animateElement(
          document.querySelector('.message-board-toggle-btn'),
          'btn-wave',
          600
        )
        if (this.validateForm()) {
          sendMessageBoard(this.messageData).then(res => {
            this.$message({
              type: 'success',
              message: res.message
            })
            this.resetForm()
          }).catch(({ message }) => {
            console.log(message)
          })
        }
      } else {
        this.toggleMessageBoard()
      }
    }
  },
  mounted() {
    const email = getLocalStorage('guest-email') || ''
    this.messageData.email = email
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/style/globalScript';
.message-board-toggle-btn {
  position: fixed;
  font-weight: bold;
  bottom: ($tool-item-size + $tool-item-gap) * 2 + $base-distance;
  right: $toolListRight;
  z-index: 3001;
  width: $tool-item-size;
  height: $tool-item-size;
  border-radius: 50%;
  @include center;
  font-size: 30px;
  color: #aaa;
  background: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all $animationTime $animationType;
  .icon {
    position: absolute;
    opacity: 0;
    visibility: hidden;
    transition: transform 0.26s linear, opacity 0.18s linear,
      visibility 0.26s linear;
    width: $tool-item-size;
    height: $tool-item-size;
    background-color: #fff;
    border-radius: 50%;
    @include center;
    &.active {
      opacity: 1;
      visibility: visible;
    }
  }
  .icon-issue {
    transform: rotate(30deg) scale(0);
    &.active {
      transform: rotate(0deg) scale(1);
    }
  }
  .icon-send {
    transform: rotate(-30deg);
    &.active {
      transform: rotate(0deg);
    }
  }
  &:hover {
    transform: scale(1.08);
    box-shadow: 0 8px 24px 0 rgba(187, 191, 196, 0.2);
  }
  &.message-board-visible {
    transform: scale(1.08);
    bottom: $base-distance;
    box-shadow: rgba(2, 6, 16, 0.2) 0px 4px 24px;
    &:hover {
      transform: scale(1.3);
    }
    &::before {
      content: '';
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%) scale(0);
      width: $tool-item-size + 10px;
      height: $tool-item-size + 10px;
      border-radius: 50%;
      background-color: rgb(20, 127, 255);
      z-index: -1;
      opacity: 0.5;
    }
    &.btn-wave {
      &::before {
        // 前面快，后面稍正常
        animation: circle-scale 0.6s 0s running cubic-bezier(0.26, 1.32, 1, 0.99) both;
      }
    }
  }
}
@media (max-width: 640px) {
  .message-board-toggle-btn {
    right: $small-toolListRight;
  }
}
.message-board-placeholder {
  width: 0;
  height: 0;
}
.message-board {
  display: flex;
  flex-direction: column;
  color: #fff;
  position: fixed;
  right: $toolListRight + $tool-item-size / 2 - 5px;
  bottom: 26px;
  z-index: 3000;
  box-shadow: rgba(0, 18, 46, 0.16) 0px 8px 36px 0px;
  width: 372px;
  overflow: hidden;
  border-radius: 16px;
  background-color: #fff;
  .message-board-header {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 35px 35px 0;
    background-color: rgb(74, 144, 226);
    margin-bottom: 15px;
    .close-btn {
      position: absolute;
      right: 25px;
      top: 10px;
      color: #fff;
      font-size: 27px;
      cursor: pointer;
      padding: 10px;
      z-index: 1;
      &::after {
        content: '';
        position: absolute;
        transform: scale(0);
        background: rgb(239, 242, 246);
        width: 38px;
        height: 38px;
        top: 3px;
        left: 4.5px;
        border-radius: 19px;
        transition: all 0.16s ease-in-out;
        background-color: rgba(0, 36, 92, 0.16);
      }
      &:hover::after {
        transform: scale(1);
      }
    }
    .header-banner-wrapper {
      position: relative;
      display: flex;
      .header-banner {
        flex: 0 0 230px;
        .banner-title {
          font-size: 42px;
          margin-bottom: 25px;
        }
        .banner-content {
          font-size: 16px;
          line-height: 1.8;
          margin-bottom: 25px;
        }
      }
      .header-avatar {
        flex: 1;
        position: relative;
        img {
          position: absolute;
          left: 0;
          bottom: 20px;
          width: 70px;
          height: 70px;
          border-radius: 50%;
          object-fit: cover;
        }
      }
    }
    .header-title {
      position: relative;
      width: calc(100% + 70px);
      margin: 0 -35px;
      padding: 14px 28px 20px;
      z-index: 6;
      line-height: 1.3;
      background-color: rgba(67, 130, 203, 0.72);
      &::after {
        content: '';
        position: absolute;
        width: calc(100% + 10px);
        bottom: -8px;
        left: -5px;
        border-image-source: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzNzIgMTUiPgogIDxwYXRoIGQ9Ik0zNDkuOCAxLjRDMzM0LjUuNCAzMTguNSAwIDMwMiAwaC0yLjVjLTkuMSAwLTE4LjQuMS0yNy44LjQtMzQuNSAxLTY4LjMgMy0xMDIuMyA0LjctMTQgLjUtMjggMS4yLTQxLjUgMS42Qzg0IDcuNyA0MS42IDUuMyAwIDIuMnY4LjRjNDEuNiAzIDg0IDUuMyAxMjguMiA0LjEgMTMuNS0uNCAyNy41LTEuMSA0MS41LTEuNiAzMy45LTEuNyA2Ny44LTMuNiAxMDIuMy00LjcgOS40LS4zIDE4LjctLjQgMjcuOC0uNGgyLjVjMTYuNSAwIDMyLjQuNCA0Ny44IDEuNCA4LjQuMyAxNS42LjcgMjIgMS4yVjIuMmMtNi41LS41LTEzLjgtLjUtMjIuMy0uOHoiIGZpbGw9IiNmZmYiLz4KPC9zdmc+Cg==);
        border-image-slice: 0 0 100%;
        border-image-width: 0 0 15px;
        border-image-repeat: stretch;
        border-width: 0px 0px 15px;
        border-bottom-style: solid;
      }
    }
  }
  .message-board-body {
    display: flex;
    flex-direction: column;
    padding: 0 20px 20px;
    .input-box {
      /deep/ input,
      /deep/ textarea {
        font-family: Helvetica;
        border-width: 0;
        font-size: 16px;
      }
      /deep/ textarea {
        max-height: 60px;
      }
      &.shake-message {
        animation: shake 0.8s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
      }
    }
  }
}
</style>