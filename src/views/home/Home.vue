<template>
  <div class="home">
    <section class="home-title-section">
      <div class="title-section-background-img" />
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
    <!-- <section class="home-blogs-section">
      <div class="home-blogs-section-header">
        <span class="title">New Blogs</span>
        <div class="more-link-btn" @click="linkTo('blogs')">
          <span>More Blogs</span>
        </div>
      </div>
      <div class="home-blogs-section-list">
        <div class="home-blogs-section-list-item" v-for="item in blogsList" :key="item.id">
          <card-item :data="item"></card-item>
        </div>
      </div>
    </section>-->
    <section-item
      title="New Blogs"
      btnText="More Blogs"
      linkToAddress="/blogs"
      class="home-blogs-section"
    >
      <div class="home-blogs-section-list">
        <div class="home-blogs-section-list-item" v-for="item in blogsList" :key="item.id">
          <card-item :data="item"></card-item>
        </div>
      </div>
    </section-item>
    <section-item
      title="My Life"
      btnText="More Life"
      linkToAddress="/life"
      class="home-life-section"
    >
      <div class="home-life-section-list">
        <div
          class="home-life-section-list-item"
          v-for="item in lifeList"
          :key="item.id"
          :style="{'background-image': `url(${item.cover})`}"
        >
          <span class="title">{{item.title}}</span>
          <span class="time">{{item.time | dateformat}}</span>
        </div>
      </div>
    </section-item>
  </div>
</template>

<script>
import AvatarDetail from './components/Avatar/index'
import CardItem from '@/components/CardItem/index'
import SectionItem from './components/SectionItem/index'
import { blogsList, lifeList } from '../../utils/mock'
import VanillaTilt from 'vanilla-tilt'
export default {
  components: {
    AvatarDetail,
    CardItem,
    SectionItem,
  },
  data() {
    return {
      blogsList: blogsList,
      lifeList: lifeList,
    }
  },
  methods: {
    linkTo(type) {
      if (type === 'blogs') {
        this.$router.push('/blogs')
      }
    },
  },
  mounted() {
    VanillaTilt.init(
      document.querySelectorAll('.home-life-section-list-item'),
      {
        glare: true,
        reverse: true,
        scale: 1.1,
        max: 10,
        'max-glare': 0.7,
      }
    )
  },
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
      background-image: url('/image/head.png');
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
      box-sizing: border-box;
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
      box-sizing: border-box;
      display: flex;
      flex-flow: row wrap;
      .home-blogs-section-list-item {
        margin-bottom: 20px;
        padding: 0 10px;
        box-sizing: border-box;
      }
    }
  }
  .home-life-section {
    margin-top: 15px !important;
    margin-bottom: 70px;
    .home-life-section-list {
      width: 100%;
      box-sizing: border-box;
      padding: 20px 0px;
      display: flex;
      flex-flow: row wrap;
      justify-content: space-around;
      .home-life-section-list-item {
        transform-style: preserve-3d;
        transform: perspective(1000px);
        // box-shadow: 0 4px 8px 0 rgba(28, 31, 33, 0.1);
        box-shadow: 26px 26px 52px #bbbec0, -26px -26px 52px #ffffff;
        overflow: hidden;
        border-radius: 7px;
        position: relative;
        height: 240px;
        width: 100%;
        margin-bottom: 20px;
        padding: 0 20px;
        box-sizing: border-box;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
        color: #fff;
        .title {
          position: absolute;
          right: 25px;
          bottom: 65px;
          font-size: 22px;
          font-weight: 600;
          transform: translateZ(40px);
        }
        .time {
          position: absolute;
          right: 25px;
          bottom: 25px;
          font-size: 22px;
          font-weight: 600;
          transform: translateZ(40px);
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
@media (min-width: 1024px) {
  .home {
    .home-blogs-section-list {
      padding: 20px 20px;
      justify-content: flex-start;
      .home-blogs-section-list-item {
        max-width: 33.33%;
      }
    }
    .home-life-section {
      .home-life-section-list-item {
        max-width: 45%;
      }
    }
  }
}
@media (max-width: 1024px) {
  .home {
    .home-blogs-section {
      width: 80%;
      justify-content: space-between;
      .home-blogs-section-list-item {
        max-width: 50%;
      }
    }
    .home-life-section {
      width: 80%;
      .home-life-section-list-item {
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
          max-width: 100%;
        }
      }
    }
    .home-life-section {
      width: 90%;
      .home-life-section-list-item {
        max-width: 100%;
      }
    }
  }
}
</style>