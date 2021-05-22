<template>
  <v-container>
    <v-row class="justify-end">
      <v-col cols="4"><upload-excel-file @upload="getExcel" /></v-col>
    </v-row>
    <v-row class="text-center">
      <v-col cols="12"><time-table :events="events" /></v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import TimeTable from './TimeTable.vue'
import UploadExcelFile from './UploadExcelForm.vue'

type DataType={
  events:string
}

export default Vue.extend({
  components: {
    TimeTable,
    UploadExcelFile
  },
  name: 'TimeTableAdmin',

  data () :DataType {
    return {
      events: ''
    }
  },
  methods: {
    getExcel (events:string):void {
      this.events = events
    }
  }
})
</script>
