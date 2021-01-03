<template>
  <div class="sidebar-item" v-if="!route.hidden">
    <template v-if="isSingleMenuItem()">
      <el-menu-item :index="resolvePath(singleMenuItem.path)">
        <div
          v-if="singleMenuItem.meta.icon"
          :class="`icon-${singleMenuItem.meta.icon}`"
          class="sidebar-item-icon"
        ></div>
        <span>{{ singleMenuItem.meta.title }}</span>
      </el-menu-item>
    </template>
    <el-submenu v-else :index="route.path">
      <template v-slot:title>
        <div
          v-if="route.meta.icon"
          :class="`icon-${route.meta.icon}`"
          class="sidebar-item-icon"
        ></div>
        <span>{{ route.meta.title }}</span>
      </template>
      <sidebar-item
        v-for="child in route.children"
        :key="child.path"
        :route="child"
        :base-path="resolvePath(child.path)"
        class="submenu-item"
      ></sidebar-item>
    </el-submenu>
  </div>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: {
    route: {
      type: Object,
      required: true
    },
    basePath: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      singleMenuItem: null
    }
  },
  methods: {
    isSingleMenuItem() {
      if (!this.route.children) {
        this.singleMenuItem = { ...this.route, path: '' }
        return true
      }
      if (this.route.children.length === 1) {
        this.singleMenuItem = this.route.children[0]
        return true
      }
      return false
    },
    resolvePath(routePath) {
      if (routePath) {
        return `${this.basePath}/${routePath}`
      } else {
        return `${this.basePath}`
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/style/globalScript';
</style>
