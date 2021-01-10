<template>
  <div
    class="tag hover:text-blue-5 text-grey-1 bg-white-default"
    :class="{
      'showBg bg-white-primary text-theme-text hover:text-white-default hover:bg-blue-5': showBg
    }"
    @click.prevent="onSelect(tag)"
  >
    <span class="tag-text uppercase" v-if="tag !== '+'">#{{ tag }}</span>
    <span class="tag-text uppercase" v-else>{{ tag }}</span>
  </div>
</template>
<script>
export default {
  props: {
    tag: {
      type: String,
      default: ''
    },
    showBg: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    onSelect(tag) {
      this.$emit('select', tag)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/style/globalScript';
.tag {
  font-size: 16px;
  font-weight: 600;
  padding: 8px 10px;
  border-radius: 55px;
  cursor: pointer;
  transition: all $animationTime $animationType;
  &.showBg {
    margin-right: 15px;
    margin-bottom: 15px;
  }
}
</style>
