import Vue from 'vue'
import Vuex from 'vuex'
import { getBlogsList, getLifeList } from '../api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    blogsList: [],
    lifeList: [],
    isLoadInfo: false
  },
  actions: {
    async getBlogsList({ commit }) {
      let resBlog = await getBlogsList()
      return commit('setBlogsList', resBlog.data.blogsList)
    },
    async getLifeList({ commit }) {
      let resLife = await getLifeList()
      return commit('setLifeList', resLife.data.lifeList)
    }
  },
  mutations: {
    setBlogsList(state, list) {
      state.blogsList = list
    },
    setLifeList(state, list) {
      state.lifeList = list
    },
    setInfoStatus(state, status) {
      state.isLoadInfo = status
    }
  },
  getters: {
    blogsList: state => state.blogsList,
    lifeList: state => state.lifeList,
    isLoadInfo: state => state.isLoadInfo
  }
})
