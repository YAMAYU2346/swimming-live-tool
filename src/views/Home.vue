<template>
  <time-table-admin />
</template>

<script lang="ts">
import Vue from 'vue'
import TimeTableAdmin from '../components/TimeTableAdmin.vue'

export default Vue.extend({
  name: 'Home',

  components: {
    TimeTableAdmin
  }
})
</script>
