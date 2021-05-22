<template>
  <v-container>
    <v-file-input
      label="File input"
      outlined
      dense
      @change="uploadExcelFile"
    ></v-file-input>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import XLSX from 'xlsx'

type DataType = {
  workbook: string|ArrayBuffer
}

export default Vue.extend({
  name: 'UploadExcelForm',

  data () :DataType {
    return {
      workbook: ''
    }
  },
  methods: {
    uploadExcelFile: (file:File) => {
      if (file) {
        const fileReader = new FileReader()
        fileReader.onload = function (event:Event) {
        // 読み込んだエクセルファイル(ArrayBuffer)をUint8Array配列にし、XLSX.readに渡します。
          const data = new Uint8Array(fileReader.result as ArrayBuffer)
          const workbook = XLSX.read(data, { type: 'array' })
          console.log(workbook.Sheets['Table 1']['!ref'])
        }
        fileReader.readAsArrayBuffer(file)
      }
    }
  }
})
</script>
