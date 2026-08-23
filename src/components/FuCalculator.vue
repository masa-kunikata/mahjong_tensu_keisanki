<script setup lang="ts">
import MeldGroup from './MeldGroup.vue'
import { AGARI, HEAD, SPECIAL, WAIT } from '../data'
import { useCalculator } from '../store'

const {
  agari,
  special,
  headSel,
  waitSel,
  meldsC,
  meldsT,
  pickAgari,
  pickSpecial,
  pickHead,
  pickWait,
} = useCalculator()
</script>

<template>
  <div class="calc">
    <div class="col">
      <div class="cgrp">
        <h2>上がり方</h2>
        <div class="body">
          <div class="tog">
            <button
              v-for="a in AGARI"
              :key="a.k"
              :class="{ on: agari === a.k && !special }"
              @click="pickAgari(a.k)"
            >{{ a.l }}<em>+{{ a.fu }}</em></button>
          </div>
        </div>
      </div>
      <div class="cgrp">
        <h2>特例（押すと固定）</h2>
        <div class="body">
          <div class="tog">
            <button
              v-for="s in SPECIAL"
              :key="s.k"
              :class="{ on: special === s.k }"
              @click="pickSpecial(s.k)"
            >{{ s.l }}<em>{{ s.fixed }}符</em></button>
          </div>
        </div>
      </div>
    </div>

    <MeldGroup title="面子の符（中張）" :items="meldsC" />
    <MeldGroup title="面子の符（么九）" :items="meldsT" />

    <div class="col">
      <div class="cgrp">
        <h2>頭の符</h2>
        <div class="body">
          <div class="tog">
            <button
              v-for="h in HEAD"
              :key="h.k"
              :class="{ on: headSel === h.k && !special }"
              @click="pickHead(h.k)"
            >{{ h.l }}<em>{{ h.fu > 0 ? `+${h.fu}` : '0' }}</em></button>
          </div>
        </div>
      </div>
      <div class="cgrp">
        <h2>待ちの符</h2>
        <div class="body">
          <div class="tog">
            <button
              v-for="w in WAIT"
              :key="w.k"
              :class="{ on: waitSel === w.k && !special }"
              @click="pickWait(w.k)"
            >{{ w.l }}<em>{{ w.fu > 0 ? `+${w.fu}` : '0' }}</em></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
