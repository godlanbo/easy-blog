<template>
  <el-popover ref="reference" placement="left" width="100" trigger="click">
    <el-button
      style="width: 100%; margin-bottom: 10px"
      @click="handleSub('eamil')"
      >邮件订阅</el-button
    >
    <div></div>
    <el-button style="width: 100%" @click="handleSub('rss')">Rss订阅</el-button>
    <template v-slot:reference>
      <transition name="slide-right-2">
        <div
          class="rss"
          v-show="toolListVisible"
          :class="{ 'message-board-visible': messageBoardVisible }"
        >
          <span class="icon-sub"></span>
        </div>
      </transition>
    </template>
  </el-popover>
</template>
<script>
import { isEmail } from '../../utils'
import { addSubEmail } from '../../api/index'
import { popoverToolListMixin } from '../../utils/mixin'
export default {
  name: 'Rss',
  mixins: [popoverToolListMixin],
  methods: {
    handleSub(type) {
      if (type === 'rss') {
        window.open('https://godlanbo.com/rss/index.xml', '_blank')
      } else {
        this.$prompt('请输入邮箱', '邮件订阅', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValidator: isEmail,
          inputErrorMessage: '邮箱格式不正确'
        })
          .then(({ value }) => {
            return addSubEmail(value)
          })
          .then(res => {
            this.$message({
              type: 'success',
              message: '订阅成功'
            })
          })
          .catch(() => {})
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/style/globalScript';
.rss {
  position: fixed;
  font-weight: bold;
  bottom: $tool-item-size + $tool-item-gap + $base-distance;
  right: $toolListRight;
  z-index: 3000;
  width: $tool-item-size;
  height: $tool-item-size;
  border-radius: 50%;
  @include center;
  font-size: 25px;
  color: #aaa;
  background: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all $animationTime $animationType;
  .icon-sub {
    @include center;
  }
  &:hover {
    transform: scale(1.08);
    box-shadow: 0 8px 24px 0 rgba(187, 191, 196, 0.2);
  }
  &.message-board-visible {
    bottom: $base-distance;
    box-shadow: unset;
  }
}
@media (max-width: 640px) {
  .rss {
    right: $small-toolListRight;
  }
}
</style>
