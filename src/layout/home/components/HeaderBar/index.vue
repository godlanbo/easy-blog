<template>
  <header
    class="header-wrapper"
    :class="{ 'active-color-switch': isSwtichHeaderBg }"
  >
    <div
      class="logo-wrapper ml-12 lg:ml-8 md:ml-6 text-3xl sm:text-2xl h-full font-extrabold text-current flex justify-center items-center"
    >
      <span class="icon-logo"></span>
      <span class="logo-text">GodLanBo</span>
    </div>
    <input type="checkbox" class="hidden" id="check" v-model="menuVisible" />
    <label
      class="menu hidden md:flex md:items-center md:justify-center text-current absolute top-0 select-none bottom-0 right-5 cursor-pointer"
      for="check"
    >
      <span class="icon-menu"></span>
    </label>
    <div
      class="menu-bg fixed top-0 left-0 bg-opacity-30 bg-black w-screen h-screen z-10 hidden"
      @touchmove.prevent
      @click="hideMenu"
    ></div>
    <nav
      class="nav-wrapper mr-12 lg:mr-8 md:mr-6 flex-1 h-full flex justify-end"
      @touchmove.prevent
      :class="{ 'active-color-switch': isSwtichHeaderBg }"
    >
      <router-link
        to="/home"
        class="nav-item"
        :class="{ active: activeRoute === '/home' }"
      >
        <a>
          <span class="nav-item-text uppercase">home</span>
        </a>
      </router-link>
      <router-link
        to="/blogs"
        class="nav-item"
        :class="{ active: activeRoute === '/blogs' }"
      >
        <a>
          <span class="nav-item-text uppercase">blogs</span>
        </a>
      </router-link>
      <router-link
        :to="archiveTarget"
        class="nav-item"
        :class="{ active: activeRoute === '/archive' }"
      >
        <a>
          <span class="nav-item-text uppercase">archive</span>
        </a>
      </router-link>
      <router-link
        to="/life"
        class="nav-item"
        :class="{ active: activeRoute === '/life' }"
      >
        <a>
          <span class="nav-item-text uppercase">life</span>
        </a>
      </router-link>
      <a href="https://github.com/godlanbo" target="_blank" class="nav-item">
        <a>
          <span class="nav-item-text uppercase">github</span>
        </a>
      </a>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      menuVisible: false,
      scrollTop: 0
    }
  },
  computed: {
    activeRoute() {
      return this.$route.path
    },
    isSwtichHeaderBg() {
      let switchLimit = document.documentElement.clientHeight + 50
      return this.scrollTop >= switchLimit || this.activeRoute !== '/home'
    },
    archiveTarget() {
      const now = new Date()
      return `/archive?time=${now.getFullYear()}-${now.getMonth() + 1}`
    }
  },
  watch: {
    $route() {
      this.getScrollTop()
      this.hideMenu()
    }
  },
  methods: {
    hideMenu() {
      this.menuVisible = false
    },
    getScrollTop() {
      this.scrollTop = document.documentElement.scrollTop
    }
  },
  mounted() {
    window.addEventListener('scroll', this.getScrollTop)
  },
  destroyed() {
    window.removeEventListener('scroll', this.getScrollTop)
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/style/globalScript';
.header-wrapper {
  width: 100%;
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
    background-color: rgba(240, 243, 246, 0.7);
    color: transparent;
    .nav-item-text {
      @include colorText($line-color);
    }
    .logo-wrapper {
      /* safari 浏览器兼容，块级元素无法继承background-image和background-clip属性 */
      .icon-logo,
      .logo-text {
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
    .icon-logo {
      margin-bottom: 5px;
    }
  }
  .menu {
    font-size: 28px;
  }
  .nav-wrapper {
    > a {
      text-decoration: none;
    }
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
      color: inherit;
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
@screen md {
  .header-wrapper {
    #check:checked ~ .nav-wrapper {
      left: 0;
      opacity: 1;
    }
    #check:checked ~ .menu-bg {
      display: block;
    }
    .nav-wrapper {
      @apply fixed flex flex-col transform w-full z-20 -left-full top-0;
      @apply opacity-0 text-center h-screen pl-24 bg-theme-menu;
      @apply transition-all duration-primary ease-primary -translate-x-24;
      .nav-item {
        @apply border-b border-solid text-white-default border-theme-primary;
        a:hover::before {
          @apply transform scale-0;
        }
        &.active {
          @apply text-blue-5;
        }
      }
    }
  }
}
</style>
