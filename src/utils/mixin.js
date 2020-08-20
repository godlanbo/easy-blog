import { getBlogsList } from './../api/home';

export const homeMixin = {
  data() {
    return {
      blogsList: []
    }
  },
  mounted() {
    getBlogsList().then(res => {
      this.blogsList = res.data.blogsList
    })
  },
}