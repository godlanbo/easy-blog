<template>
  <div class="home">
    <section class="home-title-section">
      <div
        class="title-section-background-img"
        :style="{ 'background-image' : headImgURL }" />
      <avatar-detail
        class="title-section-avatar"
        title="GodLanBo"
        place="CrazyForCode"
        content="Always on the road!"
      ></avatar-detail>
      <span
        class="title-section-desc"
      >I use this website to witness my journey in Front-end Development.</span>
    </section>
    <section-item
      title="New Blogs"
      btnText="More Blogs"
      linkToAddress="/blogs"
      class="home-blogs-section"
      v-if="blogsItemList.length"
    >
      <div class="home-blogs-section-list">
        <div class="home-blogs-section-list-item" v-for="item in blogsItemList" :key="item.id">
          <card-item :data="item"></card-item>
        </div>
      </div>
    </section-item>
    <section-item
      title="My Life"
      btnText="More Life"
      linkToAddress="/life"
      class="home-life-section"
      v-if="lifeItemList.length"
    >
      <div class="home-life-section-list">
        <div
          class="home-life-section-list-item"
          v-for="item in lifeItemList"
          :key="item.id"
          :data-src="lifeItemImg(item)"
          :style="{'background-image': '/image/default.png'}"
          @click="linkToLife(item.id)"
        >
          <div class="content">
            <div class="title">「{{item.title}}」</div>
            <div class="time">{{item.time | dateformat('YYYY年MM月DD日')}}</div>
          </div>
        </div>
      </div>
    </section-item>
    <div class="friend-link-wrapper">
      <header class="friend-link-title">My Links</header>
      <div class="links-wrapper">
        <template v-for="(item, index) in links">
          <el-tooltip :content="item.name" placement="bottom">
            <div class="link-item">
              <a :href="item.link" target="_blank">
                <img :src="item.coverUrl" :alt="item.name">
              </a>
            </div>
          </el-tooltip>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import AvatarDetail from './components/Avatar/index'
import CardItem from './components/CardItem/index'
import SectionItem from './components/SectionItem/index'
import VanillaTilt from 'vanilla-tilt'
import { listInfoMixin, lazyImgMixin } from '../../utils/mixin'
import links from '../../links'
export default {
  components: {
    AvatarDetail,
    CardItem,
    SectionItem,
  },
  mixins: [lazyImgMixin, listInfoMixin],
  data() {
    return {
      links: links
    }
  },
  methods: {
    linkToLife(id) {
      this.$router.push({
        path: '/life',
        query: {
          id,
        },
      })
    },
    lifeItemImg(item) {
      if (item.imgUrl) {
        return `url(${item.imgUrl})`
      } else {
        return `linear-gradient(to right, #30849a, #031013)`
      }
    },
    initVanillaTilt() {
      VanillaTilt.init(
        document.querySelectorAll('.home-life-section-list-item'),
        {
          glare: true,
          reverse: true,
          scale: 1.1,
          max: 10,
          'max-glare': 0.5,
        }
      )
    }
  },
  computed: {
    blogsItemList() {
      return this.blogsList.slice(0, 6)
    },
    lifeItemList() {
      return this.lifeList.slice(0, 4)
    },
    headImgURL() {
      return `url(${process.env.VUE_APP_HEAD_IMG})`
    }
  },
  watch: {
    lifeList(val) {
      if (val.length) {
        this.$nextTick(() => {
          this.initVanillaTilt()
        })
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.initVanillaTilt()
    })
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/style/globalScript';
.home {
  overflow: hidden;
  .home-title-section {
    position: relative;
    height: calc(100vh + 100px);
    width: 100%;
    @include columnCenter;
    .title-section-background-img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      clip-path: circle(115vw at 50% calc(100px - 115vw + 100vh));
      background-attachment: fixed;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: cover;
    }
    .title-section-avatar {
      z-index: 1;
      &:hover ~ .title-section-desc {
        opacity: 0;
      }
    }
    .title-section-desc {
      font-weight: bold;
      padding: 10px 25px;
      margin-top: 20px;
      margin-bottom: 100px;
      color: #fff;
      z-index: 2;
      text-align: center;
      line-height: 1.1;
      transition: opacity $animationTime $animationType;
    }
  }
  .home-blogs-section {
    .home-blogs-section-list {
      width: 100%;
      display: flex;
      flex-flow: row wrap;
      .home-blogs-section-list-item {
        margin-bottom: 20px;
        padding: 0 10px;
      }
    }
  }
  .home-life-section {
    margin-top: 15px !important;
    margin-bottom: 50px;
    .home-life-section-list {
      width: 100%;
      padding: 20px 0px;
      display: flex;
      flex-flow: row wrap;
      justify-content: space-around;
      .home-life-section-list-item {
        transform-style: preserve-3d;
        transform: perspective(1000px);
        box-shadow: 6px 6px 12px #cccfd1, -6px -6px 12px #ffffff;
        border-radius: 7px;
        position: relative;
        height: 240px;
        width: 100%;
        margin-bottom: 20px;
        padding: 0 20px;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
        color: #fff;
        cursor: pointer;
        .content {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate3d(-50%, -50%, 80px);
          font-size: 22px;
          font-weight: 600;
          text-align: center;
          .title {
            margin-bottom: 15px;
            white-space: nowrap;
          }
          .time {
            font-size: 16px;
            white-space: nowrap;
          }
        }
        &::before {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 7px;
          left: 0;
          top: 0;
          background-color: rgba(0, 0, 0, .3);
        }
      }
    }
  }
  .friend-link-wrapper {
    padding: 0 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 100px;
    header {
      font-size: 35px;
      font-weight: 600;
      @include colorText($line-color);
      margin-bottom: 30px;
    }
    .links-wrapper {
      display: flex;
      width: 60%;
      margin: 0 auto;
      justify-content: center;
      flex-wrap: wrap;
      @media (max-width: 1280px) {
        width: 80%;
      }
      @media (max-width: 640px) {
        width: 100%;
      }
      .link-item {
        flex: 0 1 120px;
        border-radius: 50%;
        border: 4px solid #fff;
        margin: 30px 20px;
        overflow: hidden;
        transition: transform $animationTime $animationType;
        @media (max-width: 1280px) {
          flex: 0 1 100px;
        }
        @media (max-width: 640px) {
          flex: 0 1 80px;
          margin: 20px 10px;
        }
        img {
          width: 100%;
          object-fit: fill;
          vertical-align: top;
        }
        &:hover {
          transform: scale(1.1);
        }
      }
    }
  }
}
@media (min-width: 690px) {
  .title-section-desc {
    font-size: 30px;
  }
}
@media (max-width: 690px) {
  .title-section-desc {
    font-size: 20px;
  }
}
@media (min-width: 1280px) {
  .home {
    .home-blogs-section-list {
      padding: 20px 0px;
      justify-content: flex-start;
      .home-blogs-section-list-item {
        width: 33.33%;
        max-width: 33.33%;
      }
    }
    .home-life-section {
      .home-life-section-list-item {
        width: 45%;
        max-width: 45%;
      }
    }
  }
}
@media (max-width: 1280px) {
  .home {
    .home-blogs-section {
      width: 80%;
      justify-content: space-between;
      .home-blogs-section-list-item {
        width: 50%;
        max-width: 50%;
      }
    }
    .home-life-section {
      width: 80%;
      .home-life-section-list-item {
        width: 45%;
        max-width: 45%;
      }
    }
  }
}
@media (max-width: 640px) {
  .home {
    .home-blogs-section {
      width: 90%;
      .home-blogs-section-list {
        padding: 20px 0;
        justify-content: flex-start;
        .home-blogs-section-list-item {
          width: 100%;
          max-width: 100%;
        }
      }
    }
    .home-life-section {
      width: 90%;
      .home-life-section-list-item {
        width: 100%;
        max-width: 100%;
      }
    }
  }
}
</style>