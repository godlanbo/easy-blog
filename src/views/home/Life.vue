<template>
  <div class="life">
    <div class="life-title">
      <span class="life-title-text">My Life</span>
    </div>
    <section class="life-list-wrapper">
      <life-item v-for="(item, index) in lifeItemList" :key="index" :data="item" :activeItem="activeItem"></life-item>
    </section>
  </div>
</template>

<script>
import LifeItem from './components/LifeItem/index'
import { getYear } from '../../utils'
import { listInfoMixin, lazyImgMixin } from '../../utils/mixin'
export default {
  components: {
    LifeItem,
  },
  mixins: [listInfoMixin, lazyImgMixin],
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
    activeItem() {
      return Number(this.$route.query.id) || -1
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/style/globalScript';
.life {
  padding-top: 120px;
  padding-bottom: 150px;
  .life-title {
    width: 100%;
    text-align: center;
    margin-bottom: 65px;
    .life-title-text {
      font-size: 55px;
      font-weight: 800;
      @include colorText($line-color);
    }
  }
  .life-list-wrapper {
    margin: 0 auto;
    background: #fff;
    border-radius: 6px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
}
@media (min-width: 1024px) {
  .life {
    .life-list-wrapper {
      width: 70%;
      padding: 115px 80px 25px;
    }
  }
}
@media (max-width: 1024px) {
  .life {
    .life-list-wrapper {
      width: 85%;
      padding: 100px 50px 25px;
    }
  }
}
@media (max-width: 640px) {
  .life {
    .life-list-wrapper {
      width: 95%;
      padding: 80px 10px 25px;
    }
  }
}
</style>