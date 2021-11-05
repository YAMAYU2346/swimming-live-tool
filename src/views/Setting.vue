<template>
  <v-container>
    <v-row>
      <v-col cols="12"><h3>地区記録・大会記録</h3></v-col>
    </v-row>
    <v-row class="text-center">
      <v-col cols="1"><v-subheader>1</v-subheader></v-col>
      <v-col cols="2">
        <v-text-field
          label="表示名"
          v-model="recordAbbr1"
          outlined
          dense
          hide-details
          @change="applyChanges"
          @blur="applyChanges"
        ></v-text-field>
      </v-col>
      <v-col cols="9">
        <v-file-input
          label="記録ファイル（.txt)"
          v-model="file1"
          outlined
          dense
          truncate-length="50"
          accept=".txt"
          @change="uploadRecordFile1"
          :messages="recordsample1"
        ></v-file-input>
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col cols="1"><v-subheader>2</v-subheader></v-col>
      <v-col cols="2">
        <v-text-field
          label="表示名"
          v-model="recordAbbr2"
          outlined
          dense
          hide-details
          @change="applyChanges"
          @blur="applyChanges"
        ></v-text-field>
      </v-col>
      <v-col cols="9">
        <v-file-input
          label="記録ファイル（.txt)"
          v-model="file2"
          outlined
          dense
          truncate-length="50"
          @change="uploadRecordFile2"
          :messages="recordsample2"
        ></v-file-input>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

type DataType = {
  recordAbbr1: string
  recordAbbr2: string
  file1: File | null
  file2: File | null
  recordsample1: string
  recordsample2: string
}

export default Vue.extend({
  components: {},
  name: 'Setting',

  data(): DataType {
    return {
      recordAbbr1: '',
      recordAbbr2: '',
      file1: null,
      file2: null,
      recordsample1: '',
      recordsample2: ''
    }
  },
  methods: {
    uploadRecordFile1(file: File): void {
      this.loadRecordFile(file, 1)
      this.$store.dispatch('updateRecordFile', {
        recordFile: file,
        num: 1
      })
    },
    uploadRecordFile2(file: File): void {
      this.loadRecordFile(file, 2)
      this.$store.dispatch('updateRecordFile', {
        recordFile: file,
        num: 2
      })
    },
    loadRecordFile(file: File, num: number) {
      if (file) {
        const fileReader = new FileReader()
        fileReader.readAsText(file, 'Shift_JIS')

        fileReader.onload = () => {
          const lines = (fileReader.result as string).split('\n')
          lines.shift()
          const linesArr = []
          for (let i = 0; i < lines.length; i++) {
            const line = lines[i].split(',')
            if (line[0] === '') {
              continue
            }
            const object = {
              性別: line[0].trim(),
              種目: line[1].trim(),
              距離: line[2].trim(),
              記録: line[3].trim()
            }
            linesArr[i] = object
          }
          if (num === 1) {
            this.recordsample1 =
              '入力データ（先頭）: ' + JSON.stringify(linesArr[0])
          } else {
            this.recordsample2 =
              '入力データ（先頭）: ' + JSON.stringify(linesArr[0])
          }
          const record = JSON.stringify(linesArr)
          this.$store.dispatch('updateRecord', {
            record,
            num
          })
        }
      }
    },
    applyChanges() {
      const recordAbbr1 = this.recordAbbr1
      const recordAbbr2 = this.recordAbbr2
      this.$store.dispatch('updateRecordAbbr', { recordAbbr1, recordAbbr2 })
    }
  },
  mounted: function() {
    const recordInfo = this.$store.getters.getRecordInfo
    console.log(recordInfo)
    this.recordAbbr1 = recordInfo.recordAbbr1
    this.recordAbbr2 = recordInfo.recordAbbr2
    this.file1 = recordInfo.recordFile1
    this.file2 = recordInfo.recordFile2
    this.recordsample1 = '登録済みファイル: ' + recordInfo.recordFileName1
    this.recordsample2 = '登録済みファイル: ' + recordInfo.recordFileName2
  }
})
</script>
