<template>
  <div class="life-list">
    <section class="life-list-wrapper" v-if="lifeList.length">
      <life-item
        v-for="(item, index) in lifeItemList"
        :key="index"
        :data="item"
        @on-delete="deleteLife"
      ></life-item>
    </section>
    <section class="no-content" v-else>
      <span>还没有任何动态</span>
    </section>
  </div>
</template>

<script>
import { getLifeList } from '../../api'
import { getYear } from '../../utils'
import LifeItem from './components/LifeItem/index'
import { deleteLife } from '../../api/admin'
export default {
  components: {
    LifeItem,
  },
  data() {
    return {
      lifeList: [],
    }
  },
  computed: {
    lifeItemList() {
      let lifeList = []
      let item = {}
      item.itemList = []
      this.lifeList.sort((a, b) => b.time - a.time)
      for (let i = 0; i < this.lifeList.length; i++) {
        if (item.year && getYear(this.lifeList[i].time) == item.year) {
          item.itemList.push(this.lifeList[i])
        } else if (item.year && getYear(this.lifeList[i].time) != item.year) {
          lifeList.push(item)
          item = {}
          item.itemList = []
          item.year = getYear(this.lifeList[i].time)
          item.itemList.push(this.lifeList[i])
        } else {
          item.year = getYear(this.lifeList[i].time)
          item.itemList.push(this.lifeList[i])
        }
      }
      lifeList.push(item)
      return lifeList
    },
  },
  methods: {
    deleteLife(id) {
      this.$alert('确认删除这篇动态？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        showCancelButton: true,
      })
        .then(() => {
          return deleteLife(id)
        })
        .then((res) => {
          this.$message({
            type: 'success',
            message: '删除成功!',
          })
          return getLifeList()
        })
        .then((res) => {
          this.lifeList = res.data.lifeList
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
  },
  mounted() {
    getLifeList().then((res) => {
      this.lifeList = res.data.lifeList
    })
  },
}
</script>
<style lang="scss" scoped>
@import '@/assets/style/globalScript';
.life-list {
  width: 100%;
  .life-list-wrapper {
    width: 80%;
    margin: 0 auto;
    padding: 20px 40px;
    background: #fff;
    border-radius: 6px;
  }
  .no-content {
    font-size: 25px;
    color: #ccc;
    @include center;
  }
}
</style>