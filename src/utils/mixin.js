import { getBlogsList, getLifeList } from './../api/home';

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