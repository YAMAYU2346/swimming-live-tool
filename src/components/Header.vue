<template>
  <v-container>
    <v-app-bar app color="#00022b" dark clipped-left>
      <div class="d-flex align-center">
        <v-img
          alt="Admin Logo"
          class="shrink mr-2"
          contain
          src="../assets/mmst_logo_small.png"
          transition="scale-transition"
          width="40"
        />
        <v-app-bar-title>SWIMMING LIVE ADMIN</v-app-bar-title>
      </div>

      <v-spacer></v-spacer>
      {{ time }}
    </v-app-bar>
    <v-navigation-drawer app clipped permanent expand-on-hover>
      <v-list nav dense>
        <v-list-item link to="/">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
        <v-list-item link to="/time-table">
          <v-list-item-icon>
            <v-icon>mdi-calendar</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Time Table</v-list-item-title>
        </v-list-item>
        <v-list-item link to="/setting">
          <v-list-item-icon>
            <v-icon>mdi-cog-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Settng</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

type DataType={
  time:string
}

export default Vue.extend({
  name: 'Header',

  data: ():DataType => ({
    time: ''
  }),
  mounted: function () {
    this.updateTime()
    const timerID = setInterval(this.updateTime, 10000)
  },

  methods: {
    updateTime ():void {
      const currentdate = new Date()
      this.time = `${this.zeroPadding(currentdate.getHours(), 2)}:${this.zeroPadding(currentdate.getMinutes(), 2)}`
    },
    zeroPadding (num:number, len:number):string {
      let zero = ''

      // 0の文字列を作成
      for (var i = 0; i < len; i++) {
        zero += '0'
      }

      // zeroの文字列と、数字を結合し、後ろ２文字を返す
      return (zero + num).slice(-len)
    }
  }
})
</script>
