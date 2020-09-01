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