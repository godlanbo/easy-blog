import { getBlogsList, getLifeList } from './../api/index';

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