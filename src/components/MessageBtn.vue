<template>
  <v-btn @click="send">aaa</v-btn>
</template>

<script lang="ts">
import Vue from 'vue'
import sendMessage from '../functions/youtube'
// import path from 'path'

// declare const __static: string

export default Vue.extend({
  name: 'MessageBtn',
  //   props: {
  //     races: {
  //       type: String,
  //       default: ''
  //     },
  //     firstRaceNo: {
  //       type: Number,
  //       default: 1
  //     },
  //     isNextRace: {
  //       type: Boolean,
  //       default: true
  //     }
  //   },
  data () {
    return {

    }
  },
  methods: {
    send (): void {
      console.log('send')
      sendMessage('https://youtu.be/OIAU9pCoEtc')
    }
  }
  //   mounted: function () {
  //   },
  //   beforeDestroy: function () {
  //   },
  //   computed: {

  //   },
  //   watch: {

//   }
})
</script>
