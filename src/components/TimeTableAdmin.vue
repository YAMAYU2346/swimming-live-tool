<template>
  <v-container>
    <v-row class="justify-end">
      <v-col cols="4"><upload-excel-file /></v-col>
    </v-row>
    <v-row class="text-center">
      <v-col cols="12"><TimeTable></TimeTable></v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import TimeTable from './TimeTable.vue'
import UploadExcelFile from './UploadExcelForm.vue'

export default Vue.extend({
  components: {
    TimeTable,
    UploadExcelFile
  },
  name: 'TimeTableAdmin',

  data: () => ({

  })
})
</script>
