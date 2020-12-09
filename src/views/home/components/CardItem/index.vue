<template>
  <div class="card-item">
    <div class="card-item-content">
      <router-link :to="linkAddress">
        <figure v-if="isShowImg">
          <img src="/image/default.png" :data-src="data.cover" />
        </figure>
        <main>
          <div class="tags-wrapper">
            <div class="tags-item" v-for="(item, index) in data.tags" :key="index" @click.prevent="queryTag(item)">
              <span class="tags-item-text uppercase">#{{item}}</span>
            </div>
          </div>
          <div class="title">{{data.title}}</div>
          <p class="content">{{detail}}</p>
          <div class="release-time">
            <span class="release-time-text">{{data.releaseTime | dateformat}}</span>
          </div>
        </main>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Object,
  },
  data() {
    return {
      innerWidth: window.innerWidth
    }
  },
  computed: {
    linkAddress() {
      return `/blogs/${this.data.id}`
    },
    isShowImg() {
      return this.innerWidth > 640 && !!this.data.cover
    },
    detail() {
      return this.$markDown.render(this.data.content.slice(0, 100).replace(/&gt;/g, '>')).replace(/<.*?>/g, '')
    }
  },
  methods: {
    init() {
      this.innerWidth = window.innerWidth
    },
    queryTag(tag) {
      this.$router.push({
        path: '/blogs/tags',
        query: {
          tag
        }
      })
    }
  },
  mounted() {
    window.addEventListener('resize', this.init)
  },
  destroyed() {
    window.removeEventListener('resize', this.init)
  },
}
</script>
<style lang="scss" scoped>
@import '@/assets/style/globalScript';
.card-item {
  width: 100%;
  .card-item-content {
    background: #fff;
    border-radius: 5px;
    box-shadow: 0 8px 24px 0 rgba(187, 191, 196, 0.2);
    overflow: hidden;
    transition: all $animationTime $animationType;
    &:hover {
      box-shadow: 0 8px 24px 0 rgba(54, 97, 174, 0.14);
      transform: scale(1.06);
    }
    a {
      width: 100%;
      text-decoration: none;
      color: $text-color;
      figure {
        width: 100%;
        img {
          object-fit: cover;
          width: 100%;
          height: 220px;
          vertical-align: middle;
        }
      }
      main {
        display: flex;
        flex-direction: column;
        padding: 20px 30px;
        .tags-wrapper {
          display: flex;
          flex-wrap: wrap;
          padding-bottom: 5px;
          .tags-item {
            padding-right: 10px;
            padding-bottom: 5px;
            white-space: nowrap;
            color: #ccc;
            &:hover {
              color: $color-blue;
            }
            .tags-item-text {
              font-size: 16px;
              font-weight: 600;
              transition: color $animationTime $animationType;
            }
          }
        }
        .title {
          font-size: 20px;
          font-weight: 800;
          padding-bottom: 15px;
          line-height: 1.3;
        }
        .content {
          width: 100%;
          font-size: 16px;
          line-height: 1.3;
          font-weight: 400;
          font-family: sans-serif;
          @include overflowText(2);
          margin-bottom: 25px;
        }
        .release-time {
          .release-time-text {
            font-size: 16px;
            font-weight: 600;
            color: #ccc;
          }
        }
      }
    }
  }
}
</style>