<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12"><TimeTable></TimeTable></v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import TimeTable from './TimeTable.vue'

export default Vue.extend({
  components: {
    TimeTable
  },
  name: 'TimeTableAdmin',

  data: () => ({

  })
})
</script>
