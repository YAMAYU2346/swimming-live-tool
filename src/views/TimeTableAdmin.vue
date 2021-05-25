<template>
  <v-container>
    <v-row class="justify-end">
      <v-col cols="8">
        <race-controller
          :race="race"
          :firstRaceNo="firstRaceNo"
          :lastRaceNo="lastRaceNo"
          @next-race="nextRace"
          @prev-race="prevRace"
      /></v-col>
      <v-col cols="4"><upload-excel-file @upload="getExcel" /></v-col>
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

type DataType={
  races:string
  race:string
  firstRaceNo:number
  lastRaceNo:number
  isNextRace:boolean
}

export default Vue.extend({
  components: {
    TimeTable,
    UploadExcelFile,
    RaceController
  },
  name: 'TimeTableAdmin',

  data () :DataType {
    return {
      races: '',
      race: 'Not Selected',
      firstRaceNo: 0,
      lastRaceNo: 0,
      isNextRace: true
    }
  },
  methods: {
    getExcel (races:string, firstRaceNo:number, lastRaceNo:number):void {
      this.firstRaceNo = firstRaceNo
      this.lastRaceNo = lastRaceNo
      this.races = races
    },
    getRace (race:string):void {
      // 競技一覧を保存
      this.race = race
    },
    nextRace ():void{
      (this.$refs.table as InstanceType<typeof TimeTable>).nextRace()
    },
    prevRace ():void{
      (this.$refs.table as InstanceType<typeof TimeTable>).prevRace()
    }
  }
})
</script>
