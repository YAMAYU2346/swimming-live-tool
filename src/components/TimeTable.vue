<template>
  <v-container>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="raceList"
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

type race = {
  no: number
  type: string
  race: string
  length: string
  category: string
  class: string
  groups: number
  date: string
  time: string
}

type DataType= {
  race:string
  raceNo:number
  height:number
  selected:race[]
  headers:{[key:string]:string|boolean}[]
}

export default Vue.extend({
  name: 'TimeTable',
  props: {
    races: {
      type: String,
      default: ''
    },
    firstRaceNo: {
      type: Number,
      default: 1
    },
    isNextRace: {
      type: Boolean,
      default: true
    }
  },
  data () :DataType {
    return {
      race: 'Not Selected',
      raceNo: 0,
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
        { text: '種目', sortable: false, value: 'race' },
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
    updateRace (selected:race[]):void {
      if (selected.length > 0) {
        this.raceNo = selected[0].no
        this.race = JSON.stringify(selected[0])
      } else {
        this.race = 'Not Selected'
      }
      this.$emit('updateRace', this.race)
    },
    nextRace ():void{
      const raceIndex = this.raceList.findIndex((race) => {
        return race.no === this.raceNo
      })
      this.selected = [this.raceList[raceIndex + 1]]
    },
    prevRace ():void{
      const raceIndex = this.raceList.findIndex((race) => {
        return race.no === this.raceNo
      })
      this.selected = [this.raceList[raceIndex - 1]]
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
    raceList ():race[] {
      if (this.races !== '') { return JSON.parse(this.races) }
      return []
    }
  },
  watch: {
    selected (selected:race[]):void {
      this.updateRace(selected)
    }
  }
})
</script>
