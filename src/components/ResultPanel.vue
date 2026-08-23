<script setup lang="ts">
import { useCalculator } from '../store'

const { fuResult, hanPanel, reset } = useCalculator()
</script>

<template>
  <div class="result">
    <button class="reset" @click="reset()">リセット</button>

    <div class="half fu-half">
      <div class="fu-main">
        <div class="line"><span class="n">{{ fuResult.fu }}</span><span class="u">符</span></div>
        <div class="sum">{{ fuResult.fixed ? '（固定）' : `（合計 ${fuResult.sum}符）` }}</div>
      </div>
      <div class="brk" :class="{ grid4: fuResult.lines.length >= 3 }">
        <div v-for="(l, idx) in fuResult.lines" :key="idx" class="bl">
          <span>{{ l.label }}{{ l.n && l.n > 1 ? ` ×${l.n}` : '' }}</span>
          <span class="v">{{ l.fu }}符</span>
        </div>
      </div>
    </div>

    <div class="half han-half">
      <div v-if="!hanPanel.show" class="hh-hint">上の見出し（翻）をクリックして選択</div>
      <div v-else>
        <div class="hh-lab">選択したハン</div>
        <div class="hh-top">
          <span class="hh-big">{{ hanPanel.big }}</span>
          <span class="hh-role">{{ hanPanel.roleJP }}</span>
        </div>
        <div class="hh-pt">
          <template v-if="hanPanel.points"
            >{{ hanPanel.prefix }}ロン <span class="pt">{{ hanPanel.points.ron }}</span> ／ ツモ
            <span class="pt">{{ hanPanel.points.tsumo }}</span></template
          >
          <template v-else>{{ hanPanel.prefix }}</template>
        </div>
      </div>
    </div>
  </div>
</template>
