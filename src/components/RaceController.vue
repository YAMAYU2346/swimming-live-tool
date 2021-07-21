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
              @click="prevRace"
              :disabled="disablePrevRace"
            >
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
          </v-col>
          <v-col class="px-0" cols="10">
            <v-text-field
              v-model="raceName"
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
              @click="nextRace"
              :disabled="disableNextRace"
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
import path from 'path'

type DataType = {
  raceName: string
  raceNo: number
  groups: null | number
  group: null | number
  isFinal: boolean
}

export default Vue.extend({
  name: 'RaceController',
  props: {
    race: {
      type: String
    },
    firstRaceNo: {
      type: Number,
      default: 0
    },
    lastRaceNo: {
      type: Number,
      default: 0
    }
  },
  data (): DataType {
    return {
      raceName: '',
      raceNo: 0,
      groups: null,
      group: null,
      isFinal: false
    }
  },
  methods: {
    nextRace (): void {
      this.$emit('next-race')
    },
    prevRace (): void {
      this.$emit('prev-race')
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
          const filePathNew = path.join(path.dirname(__dirname), 'race-caption/caption.html')
          const beforContent = fs.readFileSync(filePathNew, 'utf8')
          const afterContent = beforContent.replace(
            /<h2 id="text">.+<\/h2>/g,
            `<h2 id="text"> ${content} </h2>`
          )
          fs.writeFileSync(filePathNew, afterContent)
        }
      }
      try {
        if (this.isFinal) {
          writeToFileSync(this.$store.getters.getCaptionPath, `${this.raceName}`)
        } else {
          writeToFileSync(this.$store.getters.getCaptionPath, `${this.raceName} ${this.group}組`)
        }
      } catch (error) {
        console.log(error)
        this.$emit('alert', '編集するHTMLファイルが指定されていません。設定画面を確認してください。')
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
    disableNextRace (): boolean {
      if (this.lastRaceNo === 0 || this.raceNo >= this.lastRaceNo) {
        return true
      } else {
        return false
      }
    },
    disablePrevRace (): boolean {
      if (this.firstRaceNo === 0 || this.raceNo <= this.firstRaceNo) {
        return true
      } else {
        return false
      }
    }
  },
  watch: {
    race (race: string): void {
      if (race !== 'Not Selected') {
        const selectedRace = JSON.parse(race)
        console.log(selectedRace)
        this.raceNo = selectedRace.no
        this.groups = selectedRace.groups
        this.group = 1
        if (selectedRace.category === '決勝') {
          this.isFinal = true
        } else {
          this.isFinal = false
        }
        this.raceName =
          `No.${selectedRace.no} ${selectedRace.class}${selectedRace.type} ` +
          `${selectedRace.length}${selectedRace.race} ${selectedRace.category}`

        this.readFile()
      } else {
        this.raceName = ''
        this.group = null
      }
    },
    group (): void {
      this.readFile()
    }
  }
})
</script>
