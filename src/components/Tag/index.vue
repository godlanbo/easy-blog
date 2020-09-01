<template>
  <div class="tag" :class="{ 'showBg' : showBg }" @click.prevent="onSelect(tag)">
    <span class="tag-text uppercase" v-if="tag !== '+'">#{{tag}}</span>
    <span class="tag-text uppercase" v-else>{{tag}}</span>
  </div>
</template>
<script>
export default {
  props: {
    tag: {
      type: String,
      default: '',
    },
    showBg: {
      type: Boolean,
      default: true,
    }
  },
  methods: {
    onSelect(tag) {
      this.$emit('select', tag)
    },
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/style/globalScript';
.tag {
  font-size: 16px;
  color: #ccc;
  font-weight: 600;
  padding: 8px 10px;
  border-radius: 55px;
  background-color: #fff;
  cursor: pointer;
  transition: all $animationTime $animationType;
  &.showBg {
    color: $text-color;
    margin-right: 15px;
    background-color: $bg-color;
    &:hover {
      background: $color-blue;
      color: #fff;
    }
  }
  &:hover {
    color: $color-blue;
  }
}
</style>