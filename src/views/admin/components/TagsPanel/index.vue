<template>
  <div class="tags-panel" :style="{top : stickyTop === 0 ? 'unset' : `${stickyTop}px`}">
    <div class="title-wrapper">
      <span class="title-text">标签</span>
    </div>
    <div class="content">
      <tag-item
        class="tag-item"
        v-for="(item, index) in tagsItemList"
        :key="index"
        :tag="item.name"
        :class="{'is-selected' : selectedTags[index]}"
        @select="onSelectTag(index)"
      ></tag-item>
      <tag-item class="tag-item" v-if="canEdit" tag="+" @select="triggleAddTagPanel"></tag-item>
    </div>
    <div class="add-tag" :class="{'is-open' : addTagPanelVisible}" v-if="canEdit">
      <el-input class="input-tag" size="mini" v-model="addTagText"></el-input>
      <el-button type="primary" size="mini" @click="onAddTag">确定</el-button>
    </div>
  </div>
</template>
<script>
import TagItem from '@/components/Tag/index'
export default {
  components: {
    TagItem
  },
  props: {
    tagsItemList: {
      type: Array,
      default: []
    },
    stickyTop: {
      type: Number,
      default: 0
    },
    selectedTags: {
      type: Array,
      default: () => []
    },
    canEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      addTagText: '',
      addTagPanelVisible: false
    }
  },
  methods: {
    triggleAddTagPanel() {
      this.addTagPanelVisible = !this.addTagPanelVisible
    },
    onAddTag() {
      this.$emit('add-tag', this.addTagText)
    },
    onSelectTag(index) {
      this.selectedTags[index] = !this.selectedTags[index]
      this.$emit('select-change', this.selectedTags)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/style/globalScript';
.tags-panel {
  position: sticky;
  padding: 10px;
  border-radius: 5px;
  background: #fff;
  .title-wrapper {
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
    display: flex;
    width: 90%;
    margin: 0 auto;
    flex-flow: row wrap;
    .tag-item {
      margin-bottom: 10px;
      font-size: 14px;
      &.is-selected {
        background-color: $color-blue !important;
        color: #fff !important;
      }
    }
  }
  .add-tag {
    width: 90%;
    margin: 0 auto;
    max-height: 0;
    overflow: hidden;
    transition: max-height $animationTime $animationType;
    &.is-open {
      max-height: 100%;
    }
    .input-tag {
      font-size: 16px;
      width: 70%;
      margin-right: 10px;
      vertical-align: middle;
    }
  }
}
</style>