<template>
  <v-container>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="eventList"
      :single-select="true"
      item-key="no"
      show-select
      class="elevation-1"
    >
    </v-data-table>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

type event = {
  no: number
  type: string
  event: string
  length: string
  category: string
  class: string
  groups: number
  date: string
  time: string
}

type DataType= {
  selected:event[]
  headers:{[key:string]:string|boolean}[]
}

export default Vue.extend({
  name: 'TimeTable',
  props: {
    events: {
      type: String,
      default: ''
    }
  },
  data () :DataType {
    return {
      selected: [],
      headers: [
        {
          text: 'No',
          align: 'start',
          sortable: false,
          value: 'no'
        },
        { text: '', sortable: false, value: 'type' },
        { text: '種目', sortable: false, value: 'event' },
        { text: '距離', sortable: false, value: 'length' },
        { text: '', sortable: false, value: 'category' },
        { text: '区分', sortable: false, value: 'class' },
        { text: '組', sortable: false, value: 'groups' },
        { text: '日付', sortable: false, value: 'date' },
        { text: '時間', sortable: false, value: 'time' }
      ]
    }
  },
  computed: {
    event ():string {
      if (this.selected.length > 0) {
        const selectedEvent:event = this.selected[0]
        return `No.${selectedEvent.no} ${selectedEvent.class}${selectedEvent.type} 
        ${selectedEvent.length}${selectedEvent.event}`
      } else {
        return 'Not Selected'
      }
    },
    eventList ():event[] {
      if (this.events !== '') { return JSON.parse(this.events) }
      return []
    }
  }
})
</script>
