<template>
  <div class="life-item">
    <div class="life-item-title">
      <span class="life-item-title-text">{{ data.year }}</span>
    </div>
    <div class="life-item-content-wrapper">
      <el-collapse
        class="life-item-content"
        :value="activeItem"
        @change="onChange"
        accordion
      >
        <el-collapse-item
          class="life-item-content-item"
          :id="`lifeItem${item.id}`"
          v-for="item in data.itemList"
          :key="item.id"
          :name="item.id"
        >
          <template v-slot:title>
            <span class="title-time">{{
              item.time | dateformat('MM-DD')
            }}</span>
            <span class="title-text">{{ item.title }}</span>
          </template>
          <div class="collapse-item-content-wrapper">
            <div class="img" v-if="item.imgUrl.length !== 0">
              <img :src="item.imgUrl" />
            </div>
            <div class="content">
              <p>{{ item.content }}</p>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Object,
    activeItem: {
      type: Number,
      default: -1
    }
  },
  methods: {
    onChange() {
      setTimeout(() => {
        let e = new Event('resize')
        window.dispatchEvent(e)
      }, 300)
    }
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        if (this.activeItem !== -1) {
          let el = document.querySelector(`#lifeItem${this.activeItem}`)
          el.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          })
        }
      }, 550)
    })
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/style/globalScript';
.life-item {
  margin-bottom: 25px;
  .life-item-title {
    margin-bottom: 30px;
    font-weight: 600;
    color: $text-color;
  }
  .life-item-content-wrapper {
    .life-item-content-item {
      /deep/ .el-collapse-item__header {
        font-weight: 600;
        height: auto;
        line-height: 1;
        padding: 30px 20px;
      }
      /deep/ .el-collapse-item__content {
        padding: 0px 20px 20px;
      }
      .title-time {
        margin-right: 14px;
        white-space: nowrap;
        color: #ccc;
      }
      .title-text {
        color: $text-color;
      }
      .collapse-item-content-wrapper {
        display: flex;
        .img {
          flex: 0 0 40%;
          img {
            border-radius: 7px;
            height: 100%;
            width: 100%;
            object-fit: cover;
          }
        }
        .content {
          font-size: 16px;
          font-size: 400;
          color: $text-color;
          flex: 1;
        }
      }
    }
  }
}
@media (min-width: 1024px) {
  .life-item {
    .life-item-title {
      font-size: 40px;
    }
    .life-item-content-wrapper {
      .life-item-content-item {
        .collapse-item-content-wrapper {
          .img {
            margin-right: 15px;
          }
        }
        .title-text {
          font-size: 22px;
        }
        .title-time {
          font-size: 20px;
        }
      }
    }
  }
}
@media (max-width: 1024px) {
  .life-item {
    .life-item-title {
      font-size: 35px;
    }
    .life-item-content-wrapper {
      .life-item-content-item {
        .collapse-item-content-wrapper {
          .img {
            margin-right: 15px;
          }
        }
        .title-text {
          font-size: 22px;
        }
        .title-time {
          font-size: 20px;
        }
      }
    }
  }
}
@media (max-width: 640px) {
  .life-item {
    .life-item-title {
      font-size: 35px;
      padding-left: 20px;
    }
    .life-item-content-wrapper {
      .life-item-content-item {
        .collapse-item-content-wrapper {
          flex-direction: column;
          .img {
            margin-bottom: 10px;
          }
        }
        .title-text {
          font-size: 18px;
          @include overflowText(1);
        }
        .title-time {
          font-size: 16px;
        }
      }
    }
  }
}
</style>