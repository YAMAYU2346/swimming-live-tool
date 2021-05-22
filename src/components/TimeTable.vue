<template>
  <v-container>
    <div>{{ event }}</div>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="races"
      :single-select="true"
      item-key="name"
      show-select
      class="elevation-1"
    >
    </v-data-table>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

type race = {
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

export default Vue.extend({
  name: 'TimeTable',

  data: () => (
    {
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
      ],
      races: [
        {
          no: 1,
          type: '女子',
          event: '背泳ぎ',
          length: '100m',
          category: '予選',
          class: '無差別',
          groups: 3,
          date: '2021/05/28',
          time: '10:00'
        }
      ]
    }
  ),
  computed: {
    event () {
      if (this.selected.length > 0) {
        const selectedEvent:race = this.selected[0]
        return `No.${selectedEvent.no} ${selectedEvent.class}${selectedEvent.type} 
        ${selectedEvent.length}${selectedEvent.event}`
      } else {
        return 'Not Selected'
      }
    }
  }
})
</script>
