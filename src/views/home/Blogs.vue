<template>
  <div class="blogs">
    <div class="blogs-title">
      <span class="blogs-title-text">All Blogs</span>
    </div>
    <section class="blogs-list-wrapper">
      <div class="blogs-list">
        <div class="blogs-list-item" v-for="item in blogsList" :key="item.id">
          <card-item :data="item"></card-item>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import CardItem from './components/CardItem/index.vue'
import { listInfoMixin } from '../../utils/mixin'
export default {
  components: {
    CardItem
  },
  mixins: [listInfoMixin]
}
</script>
<style lang="scss" scoped>
@import '@/assets/style/globalScript';
.blogs {
  padding-top: 140px;
  .blogs-title {
    width: 100%;
    text-align: center;
    margin-bottom: 65px;
    .blogs-title-text {
      position: relative;
      font-size: 55px;
      font-weight: 800;
      @include colorText($line-color);
      // &::before {
      //   content: '';
      //   position: absolute;
      //   width: 100%;
      //   bottom: -10px;
      //   height: 3px;
      //   left: 0;
      //   transform: scaleX(1.5);
      //   transform-origin: 0 0;
      //   background-image: $line-color;
      // }
    }
  }
  .blogs-list-wrapper {
    margin: 0 auto;
    .blogs-list {
      width: 100%;
      display: flex;
      flex-flow: row wrap;
      justify-content: flex-start;
      .blogs-list-item {
        padding: 0 15px;
        margin-bottom: 30px;
      }
    }
  }
}
@media (min-width: 1280px) {
  .blogs {
    .blogs-list-wrapper {
      padding: 20px 20px 80px;
      width: 75%;
      .blogs-list-item {
        max-width: 33.33%;
        min-width: 33.33%;
      }
    }
  }
}
@media (max-width: 1280px) {
  .blogs {
    .blogs-list-wrapper {
      padding: 20px 10px 80px;
      width: 80%;
      .blogs-list-item {
        max-width: 50%;
        min-width: 50%;
      }
    }
  }
}
@media (max-width: 640px) {
  .blogs {
    .blogs-list-wrapper {
      padding: 20px 0 80px;
      width: 95%;
      .blogs-list-item {
        max-width: 100%;
        min-width: 100%;
      }
    }
  }
}
</style>
