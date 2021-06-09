<template>
  <aside class="blogs-category-list">
    <div
      class="blogs-category-list-item"
      v-for="(item, index) in categoryRenderList"
      :class="{ isSelected: item.name == title }"
      :key="index"
      @click="emitSwitchQuery(item.name)"
    >
      <span class="blogs-category-list-item-text">{{ item.name }}</span>
      <span class="blogs-category-list-item-num">{{ item.num }}</span>
    </div>
  </aside>
</template>
<script>
export default {
  name: 'TagSidebar',
  props: {
    categoryRenderList: {
      // 兼容初始化值{}，初始化值是一个对象
      type: [Array, Object],
      required: true
    },
    title: String
  },
  methods: {
    emitSwitchQuery(name) {
      this.$emit('switch-query', name)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/style/globalScript';
.blogs-category-list {
  background: #fff;
  padding: 25px 10px;
  @media (max-width: 1080px) {
    padding: 25px 30px;
  }
  border-radius: 5px;
  .blogs-category-list-item {
    width: 70%;
    margin: 0 auto 20px;
    padding: 15px 20px;
    border-radius: 6px;
    background: #f0f3f6;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
    color: $text-color;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 22px;
    font-weight: 600;
    transition: all 0.1s $animationType;
    cursor: pointer;
    @media (max-width: 1080px) {
      margin: 10px 10px 10px 0;
      flex: 0 1 20%;
      font-size: 20px;
    }
    @media (max-width: 640px) {
      padding: 10px;
      font-size: 18px;
    }
    &-text {
      white-space: nowrap;
      padding-right: 5px;
    }
    &:hover {
      background: $text-color;
      color: #fff;
      transform: scale(1.2);
    }
    &.isSelected {
      background: $text-color;
      color: #fff;
    }
  }
}
</style>
