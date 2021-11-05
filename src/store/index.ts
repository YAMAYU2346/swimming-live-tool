import Vue from 'vue'
import Vuex from 'vuex'
import Store from 'electron-store'

Vue.use(Vuex)

const persistentStore = new Store()

export default new Vuex.Store({
  state: {
    timeTableFile: persistentStore.get('timeTableFile') || '',
    timetable: '',
    firstRaceNo: 0,
    lastRaceNo: 0,
    recordAbbr1: persistentStore.get('recordAbbr1') || '',
    recordAbbr2: persistentStore.get('recordAbbr2') || '',
    record1: (persistentStore.get('record1') as string) || '',
    record2: (persistentStore.get('record2') as string) || '',
    recordFile1: (persistentStore.get('recordFile1') as File) || null,
    recordFile2: (persistentStore.get('recordFile2') as File) || null
  },
  getters: {
    getTimeTableFile(state) {
      return state.timeTableFile
    },
    getTimeTableInfo(state) {
      return {
        timetable: state.timetable,
        firstRaceNo: state.firstRaceNo,
        lastRaceNo: state.lastRaceNo
      }
    },
    getRecords(state) {
      return {
        record1: state.record1,
        record2: state.record2
      }
    },
    getRecord1: state => (type: string, race: string, length: string) => {
      if (state.record1 === '') {
        return ''
      }
      const json = JSON.parse(state.record1)
      const typeNum = type === '男子' ? '1' : '2'
      const record1 = json.find(
        (record: any) =>
          record.性別 === typeNum &&
          record.種目 === race &&
          record.距離 === length
      )
      if (record1) {
        return state.recordAbbr1 + ' ' + record1.記録
      } else {
        return ''
      }
    },
    getRecord2: state => (type: string, race: string, length: string) => {
      if (state.record2 === '') {
        return ''
      }
      const json = JSON.parse(state.record2)
      const typeNum = type === '男子' ? '1' : '2'
      const record2 = json.find(
        (record: any) =>
          record.性別 === typeNum &&
          record.種目 === race &&
          record.距離 === length
      )
      if (record2) {
        return state.recordAbbr2 + ' ' + record2.記録
      } else {
        return ''
      }
    },
    getRecordInfo(state) {
      console.log(state.recordFile1)
      return {
        recordAbbr1: state.recordAbbr1,
        recordAbbr2: state.recordAbbr2,
        recordFile1: state.recordFile1,
        recordFile2: state.recordFile2
      }
    }
  },
  mutations: {
    updateTimeTableFile(state, timeTableFile: File) {
      persistentStore.set('timeTableFile', timeTableFile)
    },
    updateRaceInfo(state, { timetable, firstRaceNo, lastRaceNo }) {
      state.timetable = timetable
      state.firstRaceNo = firstRaceNo
      state.lastRaceNo = lastRaceNo
    },
    updateRecord1(state, { record }) {
      state.record1 = record
      persistentStore.set('record1', record)
    },
    updateRecord2(state, { record }) {
      state.record2 = record
      persistentStore.set('record2', record)
    },
    updateRecordAbbr(state, { recordAbbr1, recordAbbr2 }) {
      state.recordAbbr1 = recordAbbr1
      state.recordAbbr2 = recordAbbr2
      persistentStore.set('recordAbbr1', recordAbbr1)
      persistentStore.set('recordAbbr2', recordAbbr2)
    },
    updateRecordFile(state, { recordFile, num }) {
      if (recordFile && num === 1) {
        console.log('filename')
        state.recordFile1 = recordFile
        // persistentStore.set('recordFile1', recordFile)
      } else if (recordFile && num === 2) {
        state.recordFile2 = recordFile
        // persistentStore.set('recordFile1', recordFile)
      }
    }
  },
  actions: {
    updateTimeTableFile(context, timeTableFile: File) {
      context.commit('updateTimeTableFile', timeTableFile)
    },
    updateRaceInfo(context, { timetable, firstRaceNo, lastRaceNo }) {
      context.commit('updateRaceInfo', {
        timetable,
        firstRaceNo,
        lastRaceNo
      })
    },
    updateRecord(context, { record, num }) {
      console.log(record)
      console.log(num)
      if (num === 1) {
        context.commit('updateRecord1', {
          record
        })
      } else {
        context.commit('updateRecord2', {
          record
        })
      }
    },
    updateRecordAbbr(context, { recordAbbr1, recordAbbr2 }) {
      context.commit('updateRecordAbbr', {
        recordAbbr1,
        recordAbbr2
      })
    },
    updateRecordFile(context, { recordFile, num }) {
      context.commit('updateRecordFile', {
        recordFile,
        num
      })
    }
  },
  modules: {}
})
