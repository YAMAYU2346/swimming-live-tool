<template>
  <v-container>
    <v-row class="justify-end">
      <v-col v-show="alert" cols="12" class="py-0">
        <v-alert :value="alert" dense outlined type="error" hide-detail>
          {{ errorMessage }}
          <!-- {{ errorMessage}}<v-btn dense @click="alert = !alert">OK</v-btn> -->
        </v-alert>
      </v-col>
      <v-col cols="8">
        <race-controller
          :race="race"
          :firstRaceNo="firstRaceNo"
          :lastRaceNo="lastRaceNo"
          @next-race="nextRace"
          @prev-race="prevRace"
          @alert="onAlert"
      /></v-col>
      <v-col cols="4"
        ><upload-excel-file @upload="getExcel" @alert="onAlert"
      /></v-col>
    </v-row>
    <v-row class="text-center">
      <v-col cols="12"
        ><time-table
          :races="races"
          :firstRaceNo="firstRaceNo"
          :isNextRace="isNextRace"
          @updateRace="getRace"
          ref="table"
      /></v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import TimeTable from '../components/TimeTable.vue'
import UploadExcelFile from '../components/UploadExcelForm.vue'
import RaceController from '../components/RaceController.vue'

type DataType = {
  races: string
  race: string
  firstRaceNo: number
  lastRaceNo: number
  isNextRace: boolean
  alert: boolean
  errorMessage: string
}

export default Vue.extend({
  components: {
    TimeTable,
    UploadExcelFile,
    RaceController
  },
  name: 'TimeTableAdmin',

  data(): DataType {
    return {
      races: '',
      race: 'Not Selected',
      firstRaceNo: 0,
      lastRaceNo: 0,
      isNextRace: true,
      alert: false,
      errorMessage: 'message'
    }
  },
  methods: {
    getExcel(timetable: string, firstRaceNo: number, lastRaceNo: number): void {
      this.firstRaceNo = firstRaceNo
      this.lastRaceNo = lastRaceNo
      this.races = timetable
      this.$store.commit('updateRaceInfo', { timetable, firstRaceNo, lastRaceNo })
      this.alert = false
    },
    getRace(race: string): void {
      // 競技一覧を保存
      this.race = race
    },
    nextRace(): void {
      (this.$refs.table as InstanceType<typeof TimeTable>).nextRace()
      this.alert = false
    },
    prevRace(): void {
      (this.$refs.table as InstanceType<typeof TimeTable>).prevRace()
      this.alert = false
    },
    onAlert(message: string): void {
      this.errorMessage = message
      this.alert = true
    }
  },
  mounted() {
    console.log('view')
    const info = this.$store.getters.getTimeTableInfo
    this.races = info.timetable
    console.log(info)
    this.firstRaceNo = info.firstRaceNo
    this.lastRaceNo = info.lastRaceNo
  }
})
</script>
