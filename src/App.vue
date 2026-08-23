<script setup lang="ts">
import FuCalculator from './components/FuCalculator.vue'
import ResultPanel from './components/ResultPanel.vue'
import ScoreTable from './components/ScoreTable.vue'
import FixedTable from './components/FixedTable.vue'
import { provideCalculator } from './store'

// 状態は App の effect scope に乗せ、配下のコンポーネントへ inject で配る
provideCalculator()
</script>

<template>
  <div class="sheet">
    <FuCalculator />
    <ResultPanel />
    <ScoreTable />
    <FixedTable />

    <p class="foot">
      副底20＋各要素を合計し10符単位で切り上げ。平和ツモ（20符）・七対子（25符）は上の特例ボタンで固定。<br />
      親：下段＝子1人の支払い ／ 子：下段＝子の払い／親の払い。5翻の列＝満貫（点数は下段の表を参照）。
    </p>
  </div>
</template>
