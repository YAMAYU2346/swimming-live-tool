<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="4">
        <v-file-input
          label="競技名テロップHTMLファイルを選択してください"
          outlined
          dense
          hide-details
          @change="getCaptionPath"
        ></v-file-input>
      </v-col>
      <v-col cols="8">
        <v-text-field
          label="ファイルパス名"
          v-model="path"
          outlined
          dense
          hide-details
        ></v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

type DataType = {
  path: string
}

export default Vue.extend({
  components: {},
  name: 'Setting',

  data (): DataType {
    return {
      path: ''
    }
  },
  methods: {
    getCaptionPath (file:File): void {
      this.$store.dispatch('updateCaptionPath', file.path)
    }
  },
  mounted: function () {
    this.path = this.$store.getters.getCaptionPath
  }
})
</script>
