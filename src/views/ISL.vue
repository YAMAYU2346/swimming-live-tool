<template>
  <v-container>
    <v-row class="justify-end">
      <v-col v-show="alert" cols="12" class="py-0">
        <v-alert :value="alert" dense outlined type="error" hide-detail>
          {{ errorMessage }}
          <!-- {{ errorMessage}}<v-btn dense @click="alert = !alert">OK</v-btn> -->
        </v-alert>
      </v-col>
      <v-col>
        <race-controller
          :race="race"
          :firstRaceNo="firstRaceNo"
          :lastRaceNo="lastRaceNo"
          :show="false"
          @next-race="nextRace"
          @prev-race="prevRace"
          @alert="onAlert"
      /></v-col>
      <v-col cols="2" class="py-6">
        <v-btn>setting</v-btn>
      </v-col>
    </v-row>
    <v-divider class="py-4"></v-divider>
    <v-row class="text-center">
      <v-col cols="9">
        <v-row class="text-center">
          <v-col :cols="12 / teamNum">
            <v-row class="text-center">
              <v-col cols="12" class="py-0">
                <v-text-field v-model="teamName1" outlined dense hide-details>
                </v-text-field>
              </v-col>
              <v-col cols="12">
                略称
                <v-text-field
                  v-model="teamShortName1"
                  outlined
                  dense
                  hide-details
                >
                </v-text-field>
              </v-col>
              <v-col cols="12">
                <v-row align="center" justify="space-around">
                  <v-btn>1</v-btn>
                  <v-btn>2</v-btn>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
          <v-col :cols="12 / teamNum">
            <v-row class="text-center">
              <v-col cols="12" class="py-0">
                <v-text-field v-model="teamName2" outlined dense hide-details>
                </v-text-field>
              </v-col>
              <v-col>
                略称
                <v-text-field
                  v-model="teamShortName2"
                  outlined
                  dense
                  hide-details
                >
                </v-text-field>
              </v-col>
              <v-col cols="12">
                <v-row align="center" justify="space-around">
                  <v-btn>3</v-btn>
                  <v-btn>4</v-btn>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
          <v-col :cols="12 / teamNum">
            <v-row class="text-center">
              <v-col cols="12" class="py-0">
                <v-text-field v-model="teamName3" outlined dense hide-details>
                </v-text-field>
              </v-col>
              <v-col>
                略称
                <v-text-field
                  v-model="teamShortName3"
                  outlined
                  dense
                  hide-details
                >
                </v-text-field>
              </v-col>
              <v-col cols="12">
                <v-row align="center" justify="space-around">
                  <v-btn>5</v-btn>
                  <v-btn>6</v-btn>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="3" v-if="teamNum == 4">
            <v-row class="text-center">
              <v-col cols="12" class="py-0">
                <v-text-field v-model="teamName4" outlined dense hide-details>
                </v-text-field>
              </v-col>
              <v-col>
                略称
                <v-text-field
                  v-model="teamShortName4"
                  outlined
                  dense
                  hide-details
                >
                </v-text-field>
              </v-col>
              <v-col cols="12">
                <v-row align="center" justify="space-around">
                  <v-btn>7</v-btn>
                  <v-btn>8</v-btn>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12">
            <v-row>
              <v-col cols="6">
                <h2>{{ jackpod }}</h2>
              </v-col>
              <v-col cols="3">
                <v-select
                  :items="pulldownList"
                  v-model="jackpod"
                  label="Jackpod"
                  outlined
                  dense
                  hide-details
                  clearable
                ></v-select>
              </v-col>
              <v-col cols="3">
                <v-select
                  :items="pulldownList"
                  label="Penalty"
                  outlined
                  dense
                  hide-details
                ></v-select>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="1" class="px-0">
            <v-simple-table dense>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th>Rank</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>PTS</td>
                  </tr>
                  <tr>
                    <td>Rane</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-col>
          <v-col cols="11">
            <v-simple-table dense>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th
                      v-for="n of teamNum * 2"
                      :key="n"
                      class="text-center"
                      v-bind:class="losePoint(n)"
                    >
                      {{ n }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td v-for="n in pointList(jackpod)" :key="n">{{ n }}</td>
                  </tr>
                  <draggable v-model="items" tag="tr">
                    <td v-for="n in items" :key="n">
                      <v-chip label>{{ n }}</v-chip>
                    </td>
                  </draggable>
                </tbody>
              </template>
            </v-simple-table>
          </v-col>
        </v-row>
      </v-col>
      <v-divider vertical></v-divider>
      <v-col cols="3">
        <v-simple-table dense>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left"></th>
                <th class="text-left">TEAM</th>
                <th class="text-left">POINT</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in ranking" :key="item.name">
                <td>{{ item.rank }}</td>
                <td>{{ item.shortName }}</td>
                <td>{{ item.point }}PTS</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import draggable from 'vuedraggable'
import RaceController from '../components/RaceController.vue'

type DataType = {
  races: string
  race: string
  firstRaceNo: number
  lastRaceNo: number
  isNextRace: boolean
  alert: boolean
  errorMessage: string
  teamNum: number
  jackpod: number | null

  ranking: any
  teamName1: string
  teamShortName1: string
  teamName2: string
  teamShortName2: string
  teamName3: string
  teamShortName3: string
  teamName4: string
  teamShortName4: string
  items: any
}

export default Vue.extend({
  components: {
    draggable,
    RaceController
  },
  name: 'ISL',

  data(): DataType {
    return {
      races: '',
      race: 'Not Selected',
      firstRaceNo: 0,
      lastRaceNo: 0,
      isNextRace: true,
      alert: false,
      errorMessage: 'message',
      teamNum: 4,
      jackpod: null,
      ranking: [
        {
          name: 'Team A',
          shortName: 'A',
          point: 159,
          rank: 1
        },
        {
          name: 'Team B',
          shortName: 'B',
          point: 237,
          rank: 2
        },
        {
          name: 'Team C',
          shortName: 'C',
          point: 159,
          rank: 3
        },
        {
          name: 'Team D',
          shortName: 'D',
          point: 237,
          rank: 4
        }
      ],
      teamName1: 'TEAM A',
      teamShortName1: 'A',
      teamName2: 'TEAM B',
      teamShortName2: 'B',
      teamName3: 'TEAM C',
      teamShortName3: 'C',
      teamName4: 'TEAM D',
      teamShortName4: 'D',
      items: [1, 2, 3, 4, 5, 6, 7, 8]
    }
  },
  methods: {
    getExcel(timetable: string, firstRaceNo: number, lastRaceNo: number): void {
      this.firstRaceNo = firstRaceNo
      this.lastRaceNo = lastRaceNo
      this.races = timetable
      this.$store.commit('updateRaceInfo', {
        timetable,
        firstRaceNo,
        lastRaceNo
      })
      this.alert = false
    },
    getRace(race: string): void {
      // 競技一覧を保存
      this.race = race
    },
    nextRace(): void {
      // (this.$refs.table as InstanceType<typeof TimeTable>).nextRace()
      this.alert = false
    },
    prevRace(): void {
      // (this.$refs.table as InstanceType<typeof TimeTable>).prevRace()
      this.alert = false
    },
    onAlert(message: string): void {
      this.errorMessage = message
      this.alert = true
    },
    pointList(jackpod: number | null): number[] {
      const points = [9, 7, 6, 5, 4, 3, 2, 1]
      const list = []
      for (let index = 0; index < this.teamNum * 2; index++) {
        if (index === 0 && jackpod) {
          let point = points[0]
          for (let index = jackpod - 1; index < this.teamNum * 2; index++) {
            point = point + points[index]
          }
          list.push(point)
        } else if (jackpod && index > jackpod - 2) {
          list.push(0)
        } else {
          list.push(points[index])
        }
      }
      return list
    },
    losePoint(rank: number): string {
      if (this.jackpod && this.jackpod <= rank) {
        return 'lose-point'
      }
      return ''
    }
  },
  computed: {
    pulldownList(): number[] {
      const list = []
      for (let index = 2; index <= this.teamNum * 2; index++) {
        list.push(index)
      }
      return list
    }
  },
  mounted() {
    console.log('view')
    const info = this.$store.getters.getTimeTableInfo
    this.races = info.timetable
    console.log(info)
    this.firstRaceNo = info.firstRaceNo
    this.lastRaceNo = info.lastRaceNo
  }
})
</script>
<style scoped>
.lose-point {
  background-color: red;
}
</style>
