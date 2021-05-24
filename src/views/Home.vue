<template>
  <v-container>
    <v-row dense>
      <v-col cols="12">
        <v-card to='/time-table'>
          <v-card-title class="text-h5">
            <v-icon>mdi-calendar</v-icon>Time Table
          </v-card-title>
          <v-card-subtitle>
            試合の競技一覧を取得・選択し、OBSのテロップに反映させます
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Home',

  components: {}
})
</script>
