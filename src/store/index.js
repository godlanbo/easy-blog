import Vue from 'vue'
import Vuex from 'vuex'
import { getBlogsList, getLifeList } from '../api'
import { getYear } from '../utils'

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
      commit('setBlogsList', resBlog.data.blogsList)
      return resBlog.data
    },
    async getLifeList({ commit }) {
      let resLife = await getLifeList()
      commit('setLifeList', resLife.data.lifeList)
      return resLife.data
    },
    getBlogsDetail({ state }, id) {
      id = +id
      return state.blogsList.find(blog => blog.id === +id)
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
    },
    getBlogsDetail(state, id) {
      return state.blogsList.find(blog => blog.id === id)
    }
  },
  getters: {
    blogsList: state => state.blogsList,
    lifeList: state => state.lifeList,
    isLoadInfo: state => state.isLoadInfo,
    lifeItemList: (state) => {
      let lifeList = []
      let item = {}
      item.itemList = []
      let tempLifeList = [].concat(state.lifeList)
      tempLifeList.sort((a, b) => b.time - a.time)
      for (let i = 0; i < tempLifeList.length; i++) {
        if (item.year && getYear(tempLifeList[i].time) == item.year) {
          item.itemList.push(tempLifeList[i])
        } else if (item.year && getYear(tempLifeList[i].time) != item.year) {
          lifeList.push(item)
          item = {}
          item.itemList = []
          item.year = getYear(tempLifeList[i].time)
          item.itemList.push(tempLifeList[i])
        } else {
          item.year = getYear(tempLifeList[i].time)
          item.itemList.push(tempLifeList[i])
        }
      }
      lifeList.push(item)
      return lifeList
    }
  }
})
