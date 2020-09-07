<template>
  <div class="sidebar-container">
    <el-menu
      class="sidebar-menu"
      :background-color="style.menuBg"
      :text-color="style.menuText"
      :active-text-color="style.menuActiveText"
      :router="true"
      :default-active="activeMenu"
    >
      <sidebar-item
        v-for="route in routes"
        :key="route.path"
        :route="route"
        :base-path="route.path"
      ></sidebar-item>
    </el-menu>
  </div>
</template>

<script>
import style from '@/assets/style/globalScript.scss'
import SidebarItem from './SideBarItem'
export default {
  components: {
    SidebarItem,
  },
  data() {
    return {
      activeMenu: '',
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler(val) {
        this.activeMenu = val.path
      },
    },
  },
  computed: {
    style() {
      return style
    },
    routes() {
      return this.$router.options.routes.filter((route) => {
        return !route.hidden
      })
    },
  },
}
</script>
<style lang="scss" scoped>
@import '@/assets/style/globalScript';
.sidebar-container {
  width: 210px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  height: 100vh;
  background: $menuBg;
  .sidebar-menu {
    width: 100%;
    border: none;
    /deep/ .el-submenu {
      &.is-active > .el-submenu__title {
        color: $subMenuActiveText !important;
      }
      .el-menu-item {
        background-color: $subMenuBg !important;
        &:hover {
          background-color: $subMenuHover !important;
        }
      }
    }
    .sidebar-item /deep/ {
      & > .el-menu-item {
        &:hover {
          background-color: $menuHover !important;
        }
      }
      .sidebar-item-icon {
        line-height: 0;
        font-size: 14px;
        margin-right: 16px;
        display: inline-block;
        width: 14px;
        height: 14px;
        vertical-align: baseline;
      }
    }
  }
}
</style>