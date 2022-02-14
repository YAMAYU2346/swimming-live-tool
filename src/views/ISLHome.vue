<template>
  <v-container>
    <v-row dense>
      <v-col cols="12">
        <v-select
          :items="events"
          v-model="eventId"
          item-text="name"
          item-value="id"
          label="大会名を選択してください"
          solo
        ></v-select>
        <v-text-field v-model="eventEntryURL" outlined></v-text-field>
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
import {
  doc,
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  onSnapshot,
  updateDoc
} from 'firebase/firestore'

type DataType = {
  events: any[]
  eventId: string | null
  eventEntryURL: string | null
  teamNumber: number | null
}

export default Vue.extend({
  name: 'ISLHome',

  components: {},
  data(): DataType {
    return {
      events: [],
      eventId: null,
      eventEntryURL: null,
      teamNumber: null
    }
  },
  methods: {
    async getEventList(): Promise<void> {
      console.log('event')
      const db = getFirestore()
      const querySnapshot = await getDocs(collection(db, 'events'))
      querySnapshot.forEach(doc => {
        this.events.push({
          name: `${doc.data().name}`,
          id: doc.id,
          teamNumber: doc.data().teamNumber,
          eventEntryURL: doc.data().url
        })
        console.log(`${doc.id} => ${doc.data()}`)
      })
      console.log(this.events)
    },
    async updateEventURL(): Promise<void> {
      console.log('eventUpdate')
      console.log(this.eventId)
      const db = getFirestore()
      const docRef = doc(db, `events/${this.eventId}`)
      await updateDoc(docRef, {
        url: this.eventEntryURL
      })
      console.log(this.events)
    },
    change(): void {
      console.log(this.eventId)
    }
  },
  computed: {
    eventUrl(): string {
      return ''
    }
  },
  mounted() {
    this.getEventList()
  },
  watch: {
    eventId(eventId: string): void {
      console.log(eventId)
      const eventDetail = this.events.find(event => event.id === eventId)
      console.log(eventDetail)
      this.eventEntryURL = eventDetail.eventEntryURL
      this.events = []
      this.getEventList()

      const testResult = [
        [
          'No',
          '距離',
          '種目',
          'クラス',
          'TeamA',
          'TeamA',
          'TeamB',
          'TeamB',
          'TeamC',
          'TeamC',
          'TeamD',
          'TeamD'
        ],
        [
          '1',
          '50m',
          '自由形',
          '男子',
          'A',
          'B',
          'C',
          'D',
          'E',
          'F',
          'G',
          'H'
        ]
      ]
      const firstData = testResult[0]
      firstData.splice(0, 4)
      console.log(firstData)
      const gameReslts = []
      for (let i = 1; i < testResult.length; i++) {
        const eventResults = []
        console.log(testResult[i])
        for (let j = 4; j < testResult[i].length; j++) {
          const eventReslt = {
            team: firstData[j - 4],
            name: testResult[i][j],
            rank: null,
            pts: null
          }
          console.log(eventReslt)
          eventResults.push(eventReslt)
        }
        const result = {
          No: testResult[i][0],
          dist: testResult[i][1],
          event: testResult[i][2],
          class: testResult[i][3],
          results: eventResults
        }
        gameReslts.push(result)
      }
      console.log(gameReslts)
    }
  }
})
</script>
