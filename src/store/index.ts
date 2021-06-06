import Vue from 'vue'
import Vuex from 'vuex'
import Store from 'electron-store'

Vue.use(Vuex)

const persistentStore = new Store()

export default new Vuex.Store({
  state: {
    captionPath: persistentStore.get('captionPath') || ''
  },
  getters: {
    getCaptionPath(state) {
      return state.captionPath
    }
  },
  mutations: {
    updateCaptionPath(state, path: string) {
      persistentStore.set('captionPath', path)
    }
  },
  actions: {
    updateCaptionPath(context, path: string) {
      context.commit('updateCaptionPath', path)
    }
  },
  modules: {}
})
