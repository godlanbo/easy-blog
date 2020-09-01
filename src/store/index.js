import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    editBlog: null
  },
  mutations: {
    SET_EDITBLOG(state, editBlog) {
      state.editBlog = editBlog
    }
  },
  actions: {
    setEditBlog({ commit }, editBlog) {
      return commit('SET_EDITBLOG', editBlog)
    }
  },
  getters: {
    editBlog: state => state.editBlog
  }
})
