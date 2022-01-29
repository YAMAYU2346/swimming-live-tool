<template>
  <v-container>
    <v-row>
      <v-col cols="8">
        <v-row>
          <v-col class="px-1" cols="1">
            <v-btn
              height="100%"
              class="px-0"
              block
              color="primary"
              @click="prevRace"
              :disabled="disablePrevRace"
            >
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
          </v-col>
          <v-col class="px-0" cols="10">
            <v-text-field
              v-model="raceName"
              outlined
              readonly
              dense
              hide-details=""
            ></v-text-field>
          </v-col>
          <v-col class="px-1" cols="1">
            <v-btn
              height="100%"
              class="px-0"
              block
              color="primary"
              @click="nextRace"
              :disabled="disableNextRace"
            >
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="4">
        <v-row>
          <v-col class="px-1" cols="2">
            <v-btn
              height="100%"
              class="px-0"
              block
              color="primary"
              @click="prevGroup"
              :disabled="disablePrevGroup"
            >
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
          </v-col>
          <v-col class="px-0" cols="8">
            <v-text-field
              v-model="group"
              outlined
              readonly
              dense
              hide-details=""
              suffix="組"
            ></v-text-field>
          </v-col>
          <v-col class="px-1" cols="2">
            <v-btn
              height="100%"
              class="px-0"
              block
              color="primary"
              @click="nextGroup"
              :disabled="disableNextGroup"
            >
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import path from 'path'

type DataType = {
  raceName: string
  record1: string
  record2: string
  raceNo: number
  groups: null | number
  group: null | number
  isFinal: boolean
}

export default Vue.extend({
  name: 'RaceController',
  props: {
    race: {
      type: String
    },
    firstRaceNo: {
      type: Number,
      default: 0
    },
    lastRaceNo: {
      type: Number,
      default: 0
    }
  },
  data(): DataType {
    return {
      raceName: '',
      record1: '',
      record2: '',
      raceNo: 0,
      groups: null,
      group: null,
      isFinal: false
    }
  },
  methods: {
    // 次のレース
    nextRace(): void {
      this.$emit('next-race')
    },
    // 前のレース
    prevRace(): void {
      this.$emit('prev-race')
    },
    // 前の組
    prevGroup(): void {
      if (this.group) {
        this.group -= 1
      } else {
        this.group = 1
      }
    },
    // 次の組
    nextGroup(): void {
      if (this.group) {
        this.group += 1
      } else {
        this.group = 1
      }
    },
    // レースタイトル・記録の書き込み
    readFile(): void {
      // レースタイトル更新
      const writeTitleToFileSync = (filepath: string, content: string) => {
        if (window && window.require) {
          const fs = window.require('fs')
          const filePathNew = path.join(
            path.dirname(__dirname),
            'race-caption/caption.html'
          )
          const beforContent = fs.readFileSync(filePathNew, 'utf8')
          const afterContent = beforContent.replace(
            /<h2 id="text">.+<\/h2>/g,
            `<h2 id="text"> ${content} </h2>`
          )
          fs.writeFileSync(filePathNew, afterContent)
        }
      }
      // 記録更新
      // TODO 可変式
      const writeRecordToFileSync = (record1: string, record2: string) => {
        if (window && window.require) {
          const fs = window.require('fs')
          const filePathNew = path.join(
            path.dirname(__dirname),
            'records/records.html'
          )
          console.log(record1)
          const beforContent = fs.readFileSync(filePathNew, 'utf8')
          let afterContent = beforContent.replace(
            /<span id="record1">.*<\/span>/g,
            `<span id="record1"> ${record1} </span>`
          )
          afterContent = afterContent.replace(
            /<span id="record2">.*<\/span>/g,
            `<span id="record2"> ${record2} </span>`
          )
          console.log(afterContent)
          fs.writeFileSync(filePathNew, afterContent)
        }
      }
      try {
        // 決勝判定
        if (this.isFinal) {
          // 決勝の場合、組数表示なし（タイム決勝は除く）
          writeTitleToFileSync(
            this.$store.getters.getCaptionPath,
            `${this.raceName}`
          )
        } else {
          // 予選・タイム決勝の場合、組数を表示
          writeTitleToFileSync(
            this.$store.getters.getCaptionPath,
            `${this.raceName} ${this.group}組`
          )
        }
        // レコードを更新
        writeRecordToFileSync(this.record1, this.record2)
      } catch (error) {
        // HTMLファイルの指定が不要になったので、削除予定
        console.log(error)
        this.$emit(
          'alert',
          '編集するHTMLファイルが指定されていません。設定画面を確認してください。'
        )
      }
    }
  },
  computed: {
    // ボタン有効無効管理（次の組がない場合等）
    // 最終組かどうか判定し、次の組ボタンを制御
    disableNextGroup(): boolean {
      if (this.group === this.groups || !this.group) {
        return true
      } else {
        return false
      }
    },
    // 1組目があるかどうか判定し、前の組ボタンを制御
    disablePrevGroup(): boolean {
      if (this.group === 1 || !this.group) {
        return true
      } else {
        return false
      }
    },
    // 最終競技かどうか判定し、次の組ボタンを制御
    disableNextRace(): boolean {
      if (this.lastRaceNo === 0 || this.raceNo >= this.lastRaceNo) {
        return true
      } else {
        return false
      }
    },
    // 最初の競技かどうか判定し、次の組ボタンを制御
    disablePrevRace(): boolean {
      if (this.firstRaceNo === 0 || this.raceNo <= this.firstRaceNo) {
        return true
      } else {
        return false
      }
    }
  },
  watch: {
    // 競技に応じて変数や表示名や表示する記録を調整
    race(race: string): void {
      if (race !== 'Not Selected') {
        const selectedRace = JSON.parse(race)
        console.log(selectedRace)
        this.raceNo = selectedRace.no
        this.groups = selectedRace.groups
        this.group = 1
        // カテゴリーが決勝の場合、決勝フラグを立てる
        if (selectedRace.category === '決勝') {
          this.isFinal = true
        } else {
          this.isFinal = false
        }
        // タイトル表示の形を作る（例：No.1 学童男子 50m自由形 予選）
        this.raceName =
          `No.${selectedRace.no} ${selectedRace.class}${selectedRace.type} ` +
          `${selectedRace.length}${selectedRace.race} ${selectedRace.category}`
        // 性別・種目・距離に応じて記録（県記録・標準記録）を取得する
        this.record1 = this.$store.getters.getRecord1(
          selectedRace.type,
          selectedRace.race,
          selectedRace.length
        )
        this.record2 = this.$store.getters.getRecord2(
          selectedRace.type,
          selectedRace.race,
          selectedRace.length
        )
        this.readFile()
      } else {
        this.raceName = ''
        this.group = null
      }
    },
    group(): void {
      this.readFile()
    }
  }
})
</script>
