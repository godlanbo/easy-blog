import Vue from 'vue'
import Vuex from 'vuex'
import { getBlogsList, getCommentsList, getLifeList } from '../api'
import { getYear, normalizeMDContent } from '../utils'
import mavonEditor from 'mavon-editor'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    blogs: {},
    blogsListArr: [],
    currentBlogIndex: -1,
    lifeList: [],
    isLoadInfo: false,
    commentsList: {},
    toolListVisible: false,
    messageBoardVisible: false
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
    getBlogsDetail({ state, commit }, id) {
      commit(
        'setCurrentBlogIndex',
        state.blogsListArr.findIndex(bid => bid === +id)
      )
      return state.blogs[id]
    },
    async getCommentsList({ commit, state }, { id, force }) {
      // 读取判断的时候评论未加载，会导致 state.blogs[id] 为空 ?.
      if (!force && state.blogs[id]?.commentsLoaded) {
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
    toggleMessageBoard(state) {
      state.messageBoardVisible = !state.messageBoardVisible
    },
    setToolListVisible(state, newStatus) {
      state.toolListVisible = newStatus
    },
    setBlogsList(state, list) {
      let tempIdList = []
      list.forEach(blog => {
        blog.comments = []
        blog.commentsLoaded = false
        // 为了使getter更新
        Vue.set(state.blogs, blog.id, blog)
        tempIdList.push(blog.id)
      })
      state.blogsListArr = tempIdList
    },
    setLifeList(state, list) {
      state.lifeList = list
    },
    setInfoStatus(state, status) {
      state.isLoadInfo = status
    },
    setCommentsList(state, { list, blogId }) {
      list.forEach(comment => {
        comment.content = mavonEditor.markdownIt.render(
          normalizeMDContent(comment.content)
        )
        Vue.set(state.commentsList, comment.cid, comment)
        state.blogs[blogId].comments.push(comment.cid)
      })
      state.blogs[blogId].commentsLoaded = true
    },
    setCurrentBlogIndex(state, index) {
      state.currentBlogIndex = index
    }
  },
  getters: {
    blogsList: state => {
      return Object.keys(state.blogs)
        .map(key => {
          if (state.blogs.hasOwnProperty(key)) {
            return state.blogs[key]
          }
        })
        .reverse()
    },
    blogsListArr: state => state.blogsListArr,
    currentBlogIndex: state => state.currentBlogIndex,
    getBlogsDetail: state => id => {
      return state.blogs[id]
    },
    lifeList: state => state.lifeList,
    isLoadInfo: state => state.isLoadInfo,
    lifeItemList: state => {
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
    getCommentsList: state => id => {
      // 读取的时候，评论可能未加载 ?.
      return state.blogs[id]?.comments.map(cid => state.commentsList[cid]) || []
    },
    toolListVisible: state => state.toolListVisible,
    messageBoardVisible: state => state.messageBoardVisible
  }
})
