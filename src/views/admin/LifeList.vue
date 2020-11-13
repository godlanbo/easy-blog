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
import { getYear } from '../../utils'
import LifeItem from './components/LifeItem/index'
import { deleteLife } from '../../api/admin'
import { listInfoMixin } from '../../utils/mixin'
export default {
  components: {
    LifeItem,
  },
  mixins: [listInfoMixin],
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
  }
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