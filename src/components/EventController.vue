<template>
  <v-container>
    <v-row>
      <v-col cols="1">
        <v-btn icon outlined @click="prevEvent" :disabled="disablePrevEvent">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="6">
        <v-text-field
          v-model="eventName"
          outlined
          readonly
          dense
          hide-details=""
        ></v-text-field>
      </v-col>
      <v-col cols="1">
        <v-btn icon outlined @click="nextEvent" :disabled="disableNextEvent">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="1">
        <v-btn icon outlined @click="prevGroup" :disabled="disablePrevGroup">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="2" class="">
        <v-text-field
          v-model="group"
          outlined
          readonly
          dense
          hide-details=""
          suffix="組"
        ></v-text-field>
      </v-col>
      <v-col cols="1">
        <v-btn icon outlined @click="nextGroup" :disabled="disableNextGroup">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

type DataType = {
  eventName:string,
  eventNo:number,
  groups: null | number,
  group: null | number
}

export default Vue.extend({
  name: 'EventController',
  props: {
    event: {
      type: String
    },
    firstEventNo: {
      type: Number,
      default: 0
    },
    lastEventNo: {
      type: Number,
      default: 0
    }
  },

  data () :DataType {
    return {
      eventName: '',
      eventNo: 0,
      groups: null,
      group: null
    }
  },
  methods: {
    nextEvent ():void {
      this.$emit('next-event')
    },
    prevEvent ():void {
      this.$emit('prev-event')
    },
    prevGroup ():void {
      if (this.group) {
        this.group -= 1
      } else {
        this.group = 1
      }
    },
    nextGroup ():void {
      if (this.group) {
        this.group += 1
      } else {
        this.group = 1
      }
    }
  },
  computed: {
    disableNextGroup ():boolean {
      if (this.group === this.groups || !this.group) {
        return true
      } else {
        return false
      }
    },
    disablePrevGroup ():boolean {
      if (this.group === 1 || !this.group) {
        return true
      } else {
        return false
      }
    },
    disableNextEvent ():boolean {
      if (this.lastEventNo === 0 || this.eventNo >= this.lastEventNo) {
        return true
      } else {
        return false
      }
    },
    disablePrevEvent ():boolean {
      if (this.firstEventNo === 0 || this.eventNo <= this.firstEventNo) {
        return true
      } else {
        return false
      }
    }
  },
  watch: {
    event (event:string):void {
      if (event !== 'Not Selected') {
        const selectedEvent = JSON.parse(event)
        this.eventNo = selectedEvent.no
        this.groups = selectedEvent.groups
        this.group = 1
        this.eventName = `No.${selectedEvent.no} ${selectedEvent.class}${selectedEvent.type} ` +
                `${selectedEvent.length}${selectedEvent.event} ${selectedEvent.category} `
      } else {
        this.eventName = ''
        this.group = null
      }
    }
  }
})
</script>
