<template>
  <el-popover ref="reference" placement="left" width="100" trigger="click">
    <el-button class="w-full mb-2.5" @click="handleSub('eamil')"
      >邮件订阅</el-button
    >
    <div></div>
    <el-button class="w-full" @click="handleSub('rss')">Rss订阅</el-button>
    <template v-slot:reference>
      <transition name="slide-right-2">
        <div
          class="rss tool-list-item"
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
          .then(() => {
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
  bottom: $tool-item-size + $tool-item-gap + $base-distance;
  z-index: 3000;
  .icon-sub {
    @include center;
  }
  &.message-board-visible {
    bottom: $base-distance;
    box-shadow: unset;
  }
}
</style>
