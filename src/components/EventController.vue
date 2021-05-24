<template>
  <v-container>
    <v-row>
      <v-col cols="8">
        <v-row>
          <v-col class="px-1" cols="1">
            <v-btn
              height="100%"
              class="px-0"
              block
              color="primary"
              @click="prevEvent"
              :disabled="disablePrevEvent"
            >
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
          </v-col>
          <v-col class="px-0" cols="10">
            <v-text-field
              v-model="eventName"
              outlined
              readonly
              dense
              hide-details=""
            ></v-text-field>
          </v-col>
          <v-col class="px-1" cols="1">
            <v-btn
              height="100%"
              class="px-0"
              block
              color="primary"
              @click="nextEvent"
              :disabled="disableNextEvent"
            >
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="4">
        <v-row>
          <v-col class="px-1" cols="2">
            <v-btn
              height="100%"
              class="px-0"
              block
              color="primary"
              @click="prevGroup"
              :disabled="disablePrevGroup"
            >
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
          </v-col>
          <v-col class="px-0" cols="8">
            <v-text-field
              v-model="group"
              outlined
              readonly
              dense
              hide-details=""
              suffix="組"
            ></v-text-field>
          </v-col>
          <v-col class="px-1" cols="2">
            <v-btn
              height="100%"
              class="px-0"
              block
              color="primary"
              @click="nextGroup"
              :disabled="disableNextGroup"
            >
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

type DataType = {
  eventName: string
  eventNo: number
  groups: null | number
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
  data (): DataType {
    return {
      eventName: '',
      eventNo: 0,
      groups: null,
      group: null
    }
  },
  methods: {
    nextEvent (): void {
      this.$emit('next-event')
    },
    prevEvent (): void {
      this.$emit('prev-event')
    },
    prevGroup (): void {
      if (this.group) {
        this.group -= 1
      } else {
        this.group = 1
      }
    },
    nextGroup (): void {
      if (this.group) {
        this.group += 1
      } else {
        this.group = 1
      }
    },
    readFile (): void {
      const writeToFileSync = (filepath: string, content: string) => {
        if (window && window.require) {
          const fs = window.require('fs')
          const beforContent = fs.readFileSync(filepath, 'utf8')
          const afterContent = beforContent.replace(
            /<p id="text">.+<\/p>/g,
            `<p id="text"> ${content} </p>`
          )
          fs.writeFileSync(filepath, afterContent)
        }
      }
      try {
        writeToFileSync('event.html', ` ${this.eventName} ${this.group}組 `)
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed: {
    disableNextGroup (): boolean {
      if (this.group === this.groups || !this.group) {
        return true
      } else {
        return false
      }
    },
    disablePrevGroup (): boolean {
      if (this.group === 1 || !this.group) {
        return true
      } else {
        return false
      }
    },
    disableNextEvent (): boolean {
      if (this.lastEventNo === 0 || this.eventNo >= this.lastEventNo) {
        return true
      } else {
        return false
      }
    },
    disablePrevEvent (): boolean {
      if (this.firstEventNo === 0 || this.eventNo <= this.firstEventNo) {
        return true
      } else {
        return false
      }
    }
  },
  watch: {
    event (event: string): void {
      if (event !== 'Not Selected') {
        const selectedEvent = JSON.parse(event)
        this.eventNo = selectedEvent.no
        this.groups = selectedEvent.groups
        this.group = 1
        this.eventName =
          `No.${selectedEvent.no} ${selectedEvent.class}${selectedEvent.type} ` +
          `${selectedEvent.length}${selectedEvent.event} ${selectedEvent.category}`
        this.readFile()
      } else {
        this.eventName = ''
        this.group = null
      }
    },
    group (): void {
      this.readFile()
    }
  }
})
</script>
