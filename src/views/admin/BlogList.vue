<template>
  <div class="blog-list-container">
    <div class="blog-list-wrapper">
      <div class="handle-time-wrapper">
        <div class="time-order-wrapper">
          <div class="time-order-title">
            <span class="time-order-title-text">排列顺序</span>
          </div>
          <el-button size="mini" class="time-order-btn" @click="switchSortType">{{sortTypeText}}</el-button>
        </div>
        <div class="time-year-wrapper">
          <div class="time-year-title">
            <span class="time-year-title-text">年份</span>
          </div>
          <div class="time-year-drop">
            <el-dropdown @command="onSelectCommand">
              <el-button size="mini">
                {{filterTime}}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <template v-slot:dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="不限">不限</el-dropdown-item>
                  <el-dropdown-item
                    v-for="(item, index) in timeCategoryList"
                    :command="item.name"
                    :key="index"
                  >{{item.name}}</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </div>
      <div class="blog-list">
        <div
          class="blog-list-item"
          v-for="(item, index) in blogsItemList[currentPage - 1]"
          :key="item.id"
          @click="onClickBlogItem(item)"
        >
          <div class="title-wrapper">
            <span class="title-text">{{item.title}}</span>
          </div>
          <div class="tags">
            <tag-item v-for="(item, index) in item.tags" :key="index" :tag="item" :showBg="false"></tag-item>
          </div>
          <div class="release-detail-and-handle-wrapper">
            <div class="release-detail">
              <span class="release-time">日期 {{item.releaseTime | dateformat('YYYY年MM月DD日')}}</span>
              <span class="author">作者 {{item.author}}</span>
            </div>
            <div class="handle">
              <el-button size="mini" @click.stop="onEditBlog(index)">编辑</el-button>
              <el-button type="danger" size="mini" @click.stop="onDeleteBlog(index)">删除</el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="page-wrapper">
        <el-pagination
          background
          :page-size="pageLength"
          layout="prev, pager, next"
          :total="totalLength"
          :current-page="currentPage"
          @current-change="onCurrentPageChange"
        ></el-pagination>
      </div>
    </div>
    <div class="filter-panel-wrapper">
      <div class="search-wrapper">
        <input
          type="text"
          placeholder="输入关键字"
          class="search-input"
          v-model="searchText"
          @keyup.enter="onSearch"
        />
        <el-button class="search-btn" size="small" type="primary" @click="onSearch">搜索</el-button>
      </div>
      <tags-panel
        :tags-item-list="tagCategoryList"
        :sticky-top="82"
        @select-change="onSelectChange"
      ></tags-panel>
    </div>
  </div>
</template>

<script>
import TagItem from '@/components/Tag/index'
import TagsPanel from './components/TagsPanel/index'
import { getBlogsCategoryList } from '../../api/home'
import { isSameYear, getYear } from '../../utils'
import { setLocalStorage } from '../../utils/localStorage'
import { deleteBlog } from '../../api/admin'
export default {
  name: 'blogList',
  components: {
    TagItem,
    TagsPanel,
  },
  data() {
    return {
      timeCategoryList: [],
      tagCategoryList: [],
      searchText: '', // 输入
      filterText: '', // 确定后
      filterTime: '不限',
      sortType: 'up',
      selectedTags: [],
      pageLength: 7,
      currentPage: 1,
    }
  },
  computed: {
    sortTypeText() {
      return this.sortType === 'up' ? '升序' : '降序'
    },
    blogsItemList() {
      let list = this.blogsList
      if (this.filterText !== '') {
        list = list.filter((item) => {
          return item.title.indexOf(this.filterText) !== -1
        })
      }

      if (this.filterTime !== '不限') {
        list = list.filter((item) => {
          return getYear(item.releaseTime) == this.filterTime
        })
      }

      if (this.selectedTags.includes(true)) {
        let filterTag = []
        this.tagCategoryList.forEach((item, index) => {
          if (this.selectedTags[index]) {
            filterTag.push(item.name)
          }
        })

        list = list.filter((item) => {
          let r = true
          for (let i = 0; i < filterTag.length; i++) {
            r = r && item.tags.includes(filterTag[i])
          }
          return r
        })
      }
      list = this.sortBlogsList(list)
      let tempList = []

      let offset = 0
      while (1) {
        let end =
          offset + this.pageLength >= list.length
            ? list.length
            : offset + this.pageLength
        tempList.push(list.slice(offset, end))
        offset = end
        if (end >= list.length) break
      }
      return tempList
    },
    totalLength() {
      let len = 0
      this.blogsItemList.forEach((item) => {
        len += item.length
      })
      return len
    },
  },
  methods: {
    onCurrentPageChange(page) {
      this.currentPage = page
    },
    onClickBlogItem(item) {
      this.$router.push({
        path: `/blogs/${item.id}`,
      })
    },
    onSearch() {
      this.filterText = this.searchText
    },
    sortBlogsList(list) {
      if (this.sortType === 'up') {
        return list.sort((pre, next) => {
          return pre.releaseTime - next.releaseTime
        })
      } else {
        return list.sort((pre, next) => {
          return next.releaseTime - pre.releaseTime
        })
      }
    },
    onEditBlog(index) {
      setLocalStorage('blog', this.blogsItemList[this.currentPage - 1][index])
      this.$router.push({
        path: '/blog/list',
        query: {
          mode: 'edit',
        },
      })
    },
    onDeleteBlog(index) {
      this.$alert('确认删除这篇文章？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        showCancelButton: true,
      })
        .then(() => {
          return deleteBlog(this.blogsItemList[this.currentPage - 1][index].id)
        })
        .then((res) => {
          this.$message({
            type: 'success',
            message: '删除成功!',
          })
          this.$store.dispatch('getBlogsList')
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    onSelectChange(arr) {
      this.selectedTags = arr
    },
    onSelectCommand(filterTime) {
      this.filterTime = filterTime
    },
    switchSortType() {
      this.sortType = this.sortType === 'up' ? 'down' : 'up'
    },
  },
  mounted() {
    getBlogsCategoryList('time').then((res) => {
      this.timeCategoryList = res.data.categoryList
    })
    getBlogsCategoryList('tag').then((res) => {
      this.tagCategoryList = res.data.categoryList
    })
  },
}
</script>
<style lang="scss" scoped>
@import '@/assets/style/globalScript';
.blog-list-container {
  width: 100%;
  display: flex;
  justify-content: center;
  .blog-list-wrapper {
    flex: 0 0 70%;
    display: inline-block;
    margin-right: 10px;
    .handle-time-wrapper {
      width: 100%;
      margin-bottom: 10px;
      background-color: #fff;
      border-radius: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 20px;
      .time-order-wrapper {
        @include center;
        flex: 0 0 20%;
        .time-order-title {
          margin-right: 20px;
          color: $text-color;
        }
      }
      .time-year-wrapper {
        @include center;
        flex: 0 0 20%;
        .time-year-title {
          margin-right: 20px;
          color: $text-color;
        }
      }
    }
    .blog-list {
      width: 100%;
      padding: 30px 20px;
      background: #fff;
      border-radius: 5px;
      margin-bottom: 10px;
      .blog-list-item {
        position: relative;
        width: 90%;
        margin: 0 auto 25px;
        display: flex;
        flex-direction: column;
        padding: 10px 0 20px;
        border-bottom: 3px solid $bg-color;
        cursor: pointer;
        &:hover {
          &::before {
            background: $color-blue;
          }
          &::after {
            transform: scaleX(1);
          }
        }
        &::after {
          content: '';
          position: absolute;
          bottom: -3px;
          height: 3px;
          background: $color-blue;
          width: 100%;
          transform: scaleX(0);
          transition: transform $animationTime $animationType;
          z-index: 1;
        }
        &::before {
          content: '';
          position: absolute;
          left: 50%;
          bottom: -3px;
          transform: translateX(-50%);
          height: 6px;
          width: 6px;
          background: #eee;
          transform: rotate(45deg);
          box-shadow: 0 0 0 5px #fff;
          z-index: 2;
          transition: background-color $animationTime $animationType;
        }
        .title-wrapper {
          flex: 1;
          font-size: 25px;
          font-weight: 600;
          color: $text-color;
          margin-bottom: 10px;
        }
        .tags {
          flex: 1;
          display: flex;
          flex-flow: row wrap;
        }
        .release-detail-and-handle-wrapper {
          flex: 1;
          display: flex;
          align-items: center;
          .release-detail {
            flex: 1;
            font-size: 16px;
            font-weight: 400;
            color: $text-color;
            .release-time {
              margin-right: 15px;
            }
          }
          .handle {
            flex: 1;
            display: flex;
            justify-content: flex-end;
          }
        }
      }
    }
    .page-wrapper {
      @include center;
      padding: 20px;
      background: #fff;
      border-radius: 5px;
    }
  }
  .filter-panel-wrapper {
    flex: 0 0 25%;
    display: flex;
    flex-direction: column;
    .search-wrapper {
      position: sticky;
      top: 20px;
      padding: 10px 20px;
      border-radius: 5px;
      background: #fff;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      .search-btn {
        flex: 0 0 40px;
        margin-left: 10px;
      }
      .search-input {
        padding: 0;
        flex: 1;
        border: none;
        outline: none;
        height: 30px;
        font-size: 16px;
        border-bottom: 1px solid $text-color;
        &::placeholder {
          color: #ccc;
          font-size: 16px;
        }
      }
    }
    .tags-filter-wrapper {
      position: sticky;
      top: 75px;
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
    }
  }
}
</style>