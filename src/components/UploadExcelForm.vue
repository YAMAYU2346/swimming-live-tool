<template>
  <v-container>
    <v-file-input
      label="File input"
      outlined
      dense
      hide-details
      accept=".xlsx"
      @change="uploadExcelFile"
    ></v-file-input>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import XLSX from 'xlsx'

export default Vue.extend({
  name: 'UploadExcelForm',
  methods: {
    uploadExcelFile (file:File):void {
      if (file) {
        const fileReader = new FileReader()
        fileReader.onload = () => {
        // 読み込んだエクセルファイル(ArrayBuffer)をUint8Array配列にし、XLSX.readに渡します。
          const data = new Uint8Array(fileReader.result as ArrayBuffer)
          const workbook = XLSX.read(data, { type: 'array' })
          this.excelToJson(workbook.Sheets)
        }
        fileReader.readAsArrayBuffer(file)
      }
    },
    replaceText (text:string):string {
      return text.replace(/[1-9]+:/g, '')
    },
    excelToJson (sheets:{[sheet: string]: XLSX.WorkSheet}):void {
      const range = Number(sheets['Table 1']['!ref']?.slice(-2))
      const data = sheets['Table 1']
      const races = []
      let firstRaceNo = 0
      let lastRaceNo = 0
      for (let index = 1; index <= range; index++) {
        if (!data[`A${index}`] || data[`A${index}`].t !== 'n') {
          continue
        }
        if (firstRaceNo === 0) {
          firstRaceNo = data[`A${index}`].v
        }
        const race = {
          no: data[`A${index}`].v,
          type: this.replaceText(data[`B${index}`].v),
          race: this.replaceText(data[`C${index}`].v),
          length: data[`E${index}`] ? data[`E${index}`].v : this.replaceText(data[`D${index}`].v),
          category: this.replaceText(data[`F${index}`].v),
          class: this.replaceText(data[`G${index}`].v),
          groups: data[`H${index}`].v,
          date: data[`I${index}`].w,
          time: data[`J${index}`].w
        }
        lastRaceNo = data[`A${index}`].v
        races.push(race)
      }
      this.$emit('upload', JSON.stringify(races), firstRaceNo, lastRaceNo)
    }

  }
})
</script>
