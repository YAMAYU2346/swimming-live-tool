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
      const events = []
      let firstEventNo = 0
      let lastEventNo = 0
      for (let index = 1; index < range; index++) {
        if (!data[`A${index}`] || data[`A${index}`].t !== 'n') {
          continue
        }
        if (firstEventNo === 0) {
          firstEventNo = data[`A${index}`].v
        }
        const event = {
          no: data[`A${index}`].v,
          type: this.replaceText(data[`B${index}`].v),
          event: this.replaceText(data[`C${index}`].v),
          length: data[`E${index}`] ? data[`E${index}`].v : this.replaceText(data[`D${index}`].v),
          category: this.replaceText(data[`F${index}`].v),
          class: this.replaceText(data[`G${index}`].v),
          groups: data[`H${index}`].v,
          date: data[`I${index}`].w,
          time: data[`J${index}`].w
        }
        lastEventNo = data[`A${index}`].v
        events.push(event)
      }
      this.$emit('upload', JSON.stringify(events), firstEventNo, lastEventNo)
    }

  }
})
</script>
