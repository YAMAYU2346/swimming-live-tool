<template>
  <v-container>
    <v-row class="justify-end">
      <v-col cols="8">
        <event-controller
          :event="event"
          :firstEventNo="firstEventNo"
          :lastEventNo="lastEventNo"
          @next-event="nextEvent"
          @prev-event="prevEvent"
      /></v-col>
      <v-col cols="4"><upload-excel-file @upload="getExcel" /></v-col>
    </v-row>
    <v-row class="text-center">
      <v-col cols="12"
        ><time-table
          :events="events"
          :firstEventNo="firstEventNo"
          :isNextEvent="isNextEvent"
          @updateEvent="getEvent"
          ref="table"
      /></v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import TimeTable from '../components/TimeTable.vue'
import UploadExcelFile from '../components/UploadExcelForm.vue'
import EventController from '../components/EventController.vue'

type DataType={
  events:string
  event:string
  firstEventNo:number
  lastEventNo:number
  isNextEvent:boolean
}

export default Vue.extend({
  components: {
    TimeTable,
    UploadExcelFile,
    EventController
  },
  name: 'TimeTableAdmin',

  data () :DataType {
    return {
      events: '',
      event: 'Not Selected',
      firstEventNo: 0,
      lastEventNo: 0,
      isNextEvent: true
    }
  },
  methods: {
    getExcel (events:string, firstEventNo:number, lastEventNo:number):void {
      this.firstEventNo = firstEventNo
      this.lastEventNo = lastEventNo
      this.events = events
    },
    getEvent (event:string):void {
      this.event = event
    },
    nextEvent ():void{
      (this.$refs.table as InstanceType<typeof TimeTable>).nextEvent()
    },
    prevEvent ():void{
      (this.$refs.table as InstanceType<typeof TimeTable>).prevEvent()
    }
  }
})
</script>
