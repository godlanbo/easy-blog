import Vue from 'vue'
import Vuex from 'vuex'
import { getBlogsList, getCommentsList, getLifeList } from '../api'
import { getYear, normalizeMDContent } from '../utils'
import mavonEditor from 'mavon-editor'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    blogs: {},
    lifeList: [],
    isLoadInfo: false,
    commentsList: {}
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
      return state.blogs[id]
    },
    async getCommentsList({ commit, state }, { id, force }) {
      if (state.blogs[id].commentsLoaded && !force) {
        return Promise.resolve({ commentsList: state.blogs[id].comments })
      } else {
        let resComment = await getCommentsList(id)
        state.blogs[id].comments = [] // 如果是强制刷新，可能导致blog的comments列表重复
        commit('setCommentsList', {
          list: resComment.data.commentsList,
          blogId: id
        })
        return resComment.data
      }
    }
  },
  mutations: {
    setBlogsList(state, list) {
      list.forEach(blog => {
        blog.comments = []
        blog.commentsLoaded = false
        // 为了使getter更新
        Vue.set(state.blogs, blog.id, blog)
      })
    },
    setLifeList(state, list) {
      state.lifeList = list
    },
    setInfoStatus(state, status) {
      state.isLoadInfo = status
    },
    setCommentsList(state, { list, blogId }) {
      list.forEach(comment => {
        comment.content = mavonEditor.markdownIt.render(normalizeMDContent(comment.content))
        Vue.set(state.commentsList, comment.cid, comment)
        state.blogs[blogId].comments.push(comment.cid)
      })
      state.blogs[blogId].commentsLoaded = true
    }
  },
  getters: {
    blogsList: (state) => {
      return Object.keys(state.blogs).map(key => {
        if (state.blogs.hasOwnProperty(key)) {
          return state.blogs[key]
        }
      }).reverse()
    },
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
    },
    getCommentsList: (state) => (id) => {
      return state.blogs[id].comments.map(cid => state.commentsList[cid])
    }
  }
})
