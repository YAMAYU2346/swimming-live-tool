import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    captionPath: ''
  },
  getters: {
    getCaptionPath (state) {
      return state.captionPath
    }
  },
  mutations: {
    updateCaptionPath (state, path: string) {
      state.captionPath = path
    }
  },
  actions: {
    updateCaptionPath (context, path: string) {
      context.commit('updateCaptionPath', path)
    }
  },
  modules: {}
})
