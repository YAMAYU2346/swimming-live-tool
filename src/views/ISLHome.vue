<template>
  <v-container>
    <v-row dense>
      <v-col cols="12">
        <v-select
          :items="matchs"
          v-model="matchId"
          item-text="name"
          item-value="id"
          label="大会名を選択してください"
          solo
        ></v-select>
      </v-col>
      <v-col cols="11">
        <v-text-field
          label="URL"
          v-model="matchEntryURL"
          outlined
          dense
        ></v-text-field>
      </v-col>
      <v-col cols="1">
        <v-btn color="primary" @click="updateMatchURL" :disabled="canUpdate"
          >更新</v-btn
        >
      </v-col>
      <v-col cols="12">
        <v-card to="/isl">
          <v-card-title class="text-h5">
            <v-icon>mdi-trophy</v-icon>ISL Mode
          </v-card-title>
          <v-card-subtitle> ISL </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import func from '../plugins/functions'
// import {
//   doc,
//   getFirestore,
//   collection,
//   getDocs,
//   query,
//   where,
//   onSnapshot,
//   updateDoc
// } from 'firebase/firestore'

type DataType = {
  matchs: any[]
  match: {
    id: string | null
    name: string | null
    numOfTeams: number | null
    entryURL: string | null
  }
  matchId: string | null
  matchEntryURL: string | null
}

export default Vue.extend({
  name: 'ISLHome',

  components: {},
  data(): DataType {
    return {
      matchs: [],
      match: {
        id: null,
        name: null,
        numOfTeams: null,
        entryURL: null
      },
      matchId: null,
      matchEntryURL: null
    }
  },
  methods: {
    async getMatchList(): Promise<void> {
      console.log('match')
      // TODO: Add API
      this.matchs.push({
        id: '1',
        name: '盛南CUP 2022',
        numOfTeams: 4,
        entryURL: ''
      })
      if (this.$store.getters.getMatchInfo !== '') {
        this.match = this.$store.getters.getMatchInfo
        this.matchId = this.match.id
        this.matchEntryURL = this.match.entryURL
      }
      console.log(this.matchs)
    },
    async updateMatchURL(): Promise<void> {
      if (this.matchEntryURL) {
        const url = this.matchEntryURL
        console.log(url)
        this.$store.dispatch('updateMatchURL', url)
        const entryList = await func.getEntryList(url)
        console.log(entryList)
      }
    },
    change(): void {
      if (this.match) {
        console.log(this.match.id)
      }
    }
  },
  computed: {
    matchURL(): string {
      return ''
    },
    canUpdate(): boolean {
      console.log(typeof this.matchEntryURL)
      return typeof this.matchEntryURL !== 'string'
    }
  },
  mounted() {
    console.log('ISL Home')
    this.matchEntryURL = this.$store.getters.getMatchURL
  },
  watch: {
    matchId(id: string): void {
      console.log(id)
      const matchDetail = this.matchs.find(match => match.id === id)
      this.$store.dispatch('updateMatchInfo', JSON.stringify(matchDetail))
      console.log(matchDetail)
      this.matchs = []
      this.getMatchList()
    },
    matchEntryURL(url: string): void {
      this.matchEntryURL = url

      // const testResult = [
      //   [
      //     'No',
      //     '距離',
      //     '種目',
      //     'クラス',
      //     'TeamA',
      //     'TeamA',
      //     'TeamB',
      //     'TeamB',
      //     'TeamC',
      //     'TeamC',
      //     'TeamD',
      //     'TeamD'
      //   ],
      //   ['1', '50m', '自由形', '男子', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
      // ]
      //   const firstData = testResult[0]
      //   firstData.splice(0, 4)
      //   console.log(firstData)
      //   const gameReslts = []
      //   for (let i = 1; i < testResult.length; i++) {
      //     const matchResults = []
      //     console.log(testResult[i])
      //     for (let j = 4; j < testResult[i].length; j++) {
      //       const matchReslt = {
      //         team: firstData[j - 4],
      //         name: testResult[i][j],
      //         rank: null,
      //         pts: null
      //       }
      //       console.log(matchReslt)
      //       matchResults.push(matchReslt)
      //     }
      //     const result = {
      //       No: testResult[i][0],
      //       dist: testResult[i][1],
      //       match: testResult[i][2],
      //       class: testResult[i][3],
      //       results: matchResults
      //     }
      //     gameReslts.push(result)
      //   }
      //   console.log(gameReslts)
    }
  }
})
</script>
