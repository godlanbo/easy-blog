<template>
  <div id="app">
    <transition name="slide-up" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>
<script>
export default {
  metaInfo: {
    meta: [
      { name: 'author', content: 'godlanbo' },
      { hid: 'keywords', name: 'keywords', content: '个人，博客' },
      {
        hid: 'description',
        name: 'description',
        content:
          '这是一个我的个人网站，用于放置我的一些生活上的趣事和一些学习路上的总结'
      },
      { name: 'application-name', content: 'godlanbo的个人博客' }
    ]
  },
  async mounted() {
    await this.$store.dispatch('getBlogsList')
    await this.$store.dispatch('getLifeList')
    this.$store.commit('setInfoStatus', true)
    let e = new Event('img-ready')
    window.dispatchEvent(e)
    e = new Event('page-ready')
    window.dispatchEvent(e)
  }
}
</script>
<style lang="scss"></style>
