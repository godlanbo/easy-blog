import { getBlogsList, getLifeList } from './../api/index';
import { mapActions, mapGetters } from 'vuex';

export const homeMixin = {
  data() {
    return {
      blogsList: [],
      lifeList: [],
    }
  },
  mounted() {
    getBlogsList().then(res => {
      this.blogsList = res.data.blogsList
    })
    getLifeList().then((res) => {
      this.lifeList = res.data.lifeList
    })
  },
}

export const adminMixin = {
  computed: {
    ...mapGetters([
      'editBlog'
    ])
  },
  methods: {
    ...mapActions([
      'setEditBlog'
    ])
  },
}

export const lazyImgMixin = {
  mounted() {
    let observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(item => {
        if (item.isIntersecting) {
          let el = item.target
          if (el.tagName === 'IMG') {
            el.setAttribute('src', el.dataset.src)
          } else {
            el.style.backgroundImage = el.dataset.src
          }
          observer.unobserve(item.target)
        }
      })
    })
    setTimeout(() => {
      let imgs = document.querySelectorAll('figure img')
      let bgs = document.querySelectorAll('.home-life-section-list-item')
      imgs.forEach(img => {
        observer.observe(img)
      })
      bgs.forEach(bg => {
        observer.observe(bg)
      })
    }, 800)
  },
}