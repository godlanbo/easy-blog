<template>
  <header class="header-wrapper" :class="{'active-color-switch' : isSwtichHeaderBg}">
    <div class="logo-wrapper">
      <span class="icon-logo"></span>
      <span class="logo-text">GodLanBo</span>
    </div>
    <input type="checkbox" id="check" v-model="menuVisible" />
    <label class="menu" for="check">
      <span class="icon-menu"></span>
    </label>
    <div class="menu-bg" @touchmove.prevent @click="hideMenu"></div>
    <nav class="nav-wrapper" @touchmove.prevent :class="{'active-color-switch' : isSwtichHeaderBg}">
      <div class="nav-item" :class="{'active' : activeRoute === '/home'}">
        <router-link to="/home">
          <span class="nav-item-text uppercase">home</span>
        </router-link>
      </div>
      <div class="nav-item" :class="{'active' : activeRoute === '/blogs'}">
        <router-link to="/blogs">
          <span class="nav-item-text uppercase">blogs</span>
        </router-link>
      </div>
      <div class="nav-item" :class="{'active' : activeRoute === '/archive'}">
        <router-link to="/archive?time=2020">
          <span class="nav-item-text uppercase">archive</span>
        </router-link>
      </div>
      <div class="nav-item" :class="{'active' : activeRoute === '/life'}">
        <router-link to="/life">
          <span class="nav-item-text uppercase">life</span>
        </router-link>
      </div>
      <div class="nav-item">
        <a href="https://github.com/godlanbo" target="_blank">
          <span class="nav-item-text uppercase">github</span>
        </a>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      menuVisible: false,
      scrollTop: 0,
    }
  },
  computed: {
    activeRoute() {
      return this.$route.path
    },
    isSwtichHeaderBg() {
      let switchLimit = document.documentElement.clientHeight + 50
      this.scrollTop = document.documentElement.scrollTop
      return this.scrollTop >= switchLimit || this.activeRoute !== '/home'
    },
  },
  watch: {
    $route() {
      this.getScrollTop()
      this.hideMenu()
    },
  },
  methods: {
    hideMenu() {
      this.menuVisible = false
    },
    getScrollTop() {
      this.scrollTop = document.documentElement.scrollTop
    },
  },
  mounted() {
    window.addEventListener('scroll', this.getScrollTop)
  },
  destroyed() {
    window.removeEventListener('scroll', this.getScrollTop)
  },
}
</script>
<style lang="scss" scoped>
@import '@/assets/style/globalScript';
.header-wrapper {
  width: 100%;
  position: relative;
  position: fixed;
  top: 0;
  left: 0;
  backdrop-filter: saturate(180%) blur(20px);
  background-color: rgba(0, 0, 0, 0.3);
  color: #fff;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  height: 60px;
  z-index: 1999;
  transition: color $animationTime $animationType,
    background-color $animationTime $animationType;
  &.active-color-switch {
    background-color: rgba(240, 243, 246, .7);
    color: transparent;
    .nav-item-text {
      @include colorText($line-color);
    }
    .logo-wrapper {
      /* safari 浏览器兼容，块级元素无法继承background-image和background-clip属性 */
      .icon-logo, .logo-text {
        @include colorText($line-color);
      }
    }
    .menu {
      /* safari 浏览器兼容，块级元素无法继承background-image和background-clip属性 */
      .icon-menu {
        @include colorText($line-color);
      }
    }
  }
  .logo-wrapper {
    flex: 0 0 20%;
    height: 100%;
    font-weight: 800;
    color: inherit;
    @include center;
    .icon-logo {
      margin-bottom: 5px;
    }
  }
  #check {
    display: none;
  }
  .menu {
    color: inherit;
    font-size: 28px;
    position: absolute;
    top: 0;
    user-select: none;
    bottom: 0;
    right: 20px;
    @include center;
    cursor: pointer;
  }
  .menu-bg {
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.3);
    width: 100vw;
    height: 100vh;
    z-index: 4;
    display: none;
  }
  .nav-wrapper {
    flex: 1;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    &.active-color-switch {
      .nav-item a::before {
        background-image: $line-color;
      }
      .nav-item.active a::before {
        background-image: $line-color;
      }
      .nav-item a:hover::before {
        background-image: $line-color;
      }
    }
    .nav-item {
      @include center;
      height: 100%;
      margin: 0 20px;
      &.active a::before {
        @media (max-width: 690px) {
          transform: scale(0);
        }
        @media (min-width: 690px) {
          transform: scale(1);
        }
      }
      a {
        width: 100%;
        text-decoration: none;
        position: relative;
        color: inherit;
        .nav-item-text {
          width: 100%;
          color: inherit;
          font-size: 18px;
          font-weight: bold;
        }
        &::before {
          display: block;
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          width: 100%;
          bottom: -5px;
          height: 4px;
          transform: scaleX(0);
          background-color: #fff;
          transition: all $animationTime $animationType;
        }
        &:hover::before {
          transform: scaleX(1);
        }
      }
    }
  }
}
@media (min-width: 690px) {
  .header-wrapper {
    .logo-wrapper {
      margin-left: 50px;
      font-size: 32px;
    }
    .menu {
      display: none;
    }
    .menu-bg {
      display: none;
    }
  }
}
@media (max-width: 790px) {
  .nav-wrapper {
    margin-right: 20px;
  }
}
@media (min-width: 790px) {
  .nav-wrapper {
    margin-right: 50px;
  }
}
@media (max-width: 690px) {
  .header-wrapper {
    .logo-wrapper {
      margin-left: 20px;
      font-size: 28px;
    }
    .menu {
      display: flex;
    }
    #check:checked ~ .nav-wrapper {
      left: 0;
      opacity: 1;
    }
    #check:checked ~ .menu-bg {
      display: block;
    }
    .nav-wrapper {
      position: fixed;
      display: flex;
      flex-direction: column;
      width: 100%;
      box-sizing: border-box;
      padding-left: 100px;
      height: 100vh;
      background: #082634;
      text-align: center;
      transform: translateX(-100px);
      opacity: 0;
      transition: all $animationTime $animationType;
      top: 0;
      left: -100%;
      z-index: 5;
      .nav-item {
        border-bottom: 1px solid #30849a;
        color: #fff;
        a:hover::before {
          transform: scale(0);
        }
        &.active {
          color: $color-blue;
        }
      }
    }
  }
}
</style>