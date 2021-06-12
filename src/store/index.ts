import Vue from 'vue'
import Vuex from 'vuex'
import Store from 'electron-store'

Vue.use(Vuex)

const persistentStore = new Store()

export default new Vuex.Store({
  state: {
    captionPath: persistentStore.get('captionPath') || '',
    timetable: '',
    firstRaceNo: 0,
    lastRaceNo: 0
  },
  getters: {
    getCaptionPath(state) {
      return state.captionPath
    },
    getTimeTableInfo(state) {
      return {
        timetable: state.timetable,
        firstRaceNo: state.firstRaceNo,
        lastRaceNo: state.lastRaceNo
      }
    }
  },
  mutations: {
    updateCaptionPath(state, path: string) {
      persistentStore.set('captionPath', path)
    },
    updateRaceInfo(state, { timetable, firstRaceNo, lastRaceNo }) {
      state.timetable = timetable
      state.firstRaceNo = firstRaceNo
      state.lastRaceNo = lastRaceNo
    }
  },
  actions: {
    updateCaptionPath(context, path: string) {
      context.commit('updateCaptionPath', path)
    },
    updateRaceInfo(context, { timetable, firstRaceNo, lastRaceNo }) {
      context.commit('updateRaceInfo', {
        timetable,
        firstRaceNo,
        lastRaceNo
      })
    }
  },
  modules: {}
})
