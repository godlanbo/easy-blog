<template>
  <aside class="blogs-category-list">
    <div
      class="blogs-category-list-block"
      v-for="(monthData, yearKey) in categoryRenderList"
      :key="yearKey"
    >
      <div class="block-title text-theme-text text-2xl font-semibold mb-3">
        <span>{{ yearKey }}</span>
      </div>
      <div
        class="blogs-category-list-item"
        v-for="(monthDataCount, monthKey) in monthData"
        :class="{ isSelected: `${yearKey}-${monthKey}` == title }"
        :key="monthKey"
        @click="emitSwitchQuery(yearKey, monthKey)"
      >
        <span class="blogs-category-list-item-text">{{ monthKey }}月</span>
        <span class="blogs-category-list-item-num">{{ monthDataCount }}</span>
      </div>
    </div>
  </aside>
</template>
<script>
export default {
  name: 'TimeSidebar',
  props: {
    categoryRenderList: {
      type: Object,
      required: true
    },
    title: String
  },
  methods: {
    emitSwitchQuery(year, month) {
      this.$emit('switch-query', `${year}-${month}`)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/style/globalScript';
.blogs-category-list {
  background: #fff;
  padding: 25px 10px;
  border-radius: 5px;
  @media (max-width: 1080px) {
    padding: 25px 30px;
  }
  .blogs-category-list-block {
    flex: 0 0 20%;
    width: 70%;
    margin: 0 auto;
    @media (max-width: 1080px) {
      width: auto;
      margin: 0;
      padding: 0 15px;
    }
    display: flex;
    flex-direction: column;
  }
  .blogs-category-list-item {
    margin-bottom: 20px;
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
      padding: 10px 15px;
      font-size: 20px;
    }
    @media (max-width: 640px) {
      padding: 5px 10px;
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
