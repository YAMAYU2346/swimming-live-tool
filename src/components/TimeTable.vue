<template>
  <v-container>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="eventList"
      :single-select="true"
      item-key="no"
      show-select
      hide-default-footer
      :items-per-page="1000"
      dense
      fixed-header
      class="elevation-1"
      :height="height"
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
  event:string
  eventNo:number
  height:number
  selected:event[]
  headers:{[key:string]:string|boolean}[]
}

export default Vue.extend({
  name: 'TimeTable',
  props: {
    events: {
      type: String,
      default: ''
    },
    firstEventNo: {
      type: Number,
      default: 1
    },
    isNextEvent: {
      type: Boolean,
      default: true
    }
  },
  data () :DataType {
    return {
      event: 'Not Selected',
      eventNo: 0,
      height: window.innerHeight - 260,
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
  methods: {
    updateEvent (selected:event[]):void {
      if (selected.length > 0) {
        this.eventNo = selected[0].no
        this.event = JSON.stringify(selected[0])
      } else {
        this.event = 'Not Selected'
      }
      this.$emit('updateEvent', this.event)
    },
    nextEvent ():void{
      const eventIndex = this.eventList.findIndex((event) => {
        return event.no === this.eventNo
      })
      this.selected = [this.eventList[eventIndex + 1]]
    },
    prevEvent ():void{
      const eventIndex = this.eventList.findIndex((event) => {
        return event.no === this.eventNo
      })
      this.selected = [this.eventList[eventIndex - 1]]
    },
    handleResize: function () {
      this.height = window.innerHeight - 260
    }
  },
  mounted: function () {
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy: function () {
    window.removeEventListener('resize', this.handleResize)
  },
  computed: {
    eventList ():event[] {
      if (this.events !== '') { return JSON.parse(this.events) }
      return []
    }
  },
  watch: {
    selected (selected:event[]):void {
      this.updateEvent(selected)
    }
  }
})
</script>
