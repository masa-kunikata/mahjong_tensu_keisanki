<script setup lang="ts">
import { FU, HAN_COLUMNS, HIGH_FU } from '../data'
import { calc, fmt } from '../scoring'
import { useCalculator } from '../store'
import type { Role, ScoreCell, Selection } from '../types'

const ROLES: Role[] = ['child', 'dealer']

const { expanded, fuRow, pickCell, isHeaderHit } = useCalculator()

/** 5翻の列は符に依らず満貫なので、下の固定点数表と同じ選択として扱う */
function headerSel(role: Role, han: number): NonNullable<Selection> {
  return han === 5 ? { role, kind: 'rank', val: 'mangan' } : { role, kind: 'han', val: han }
}

/** 子家5列 → 親家5列。edge は各グループ先頭の太い区切り線 */
const headers = ROLES.flatMap((role) =>
  HAN_COLUMNS.map((han, i) => ({ role, han, edge: i === 0, sel: headerSel(role, han) })),
)

/** 表は静的なので描画前に一度だけ組み立てる */
const rows = FU.map((fu) => ({
  fu,
  cells: headers.map(({ role, han, edge }) => ({
    key: `${role}${han}`,
    role,
    han,
    edge,
    value: han === 5 ? ('man' as ScoreCell) : calc(fu, han, role),
  })),
}))
</script>

<template>
  <div class="tbl-wrap">
    <table class="main" :class="{ collapsed: !expanded }">
      <thead>
        <tr>
          <th class="fucol" rowspan="2">符</th>
          <th class="side" colspan="5">子家（下段＝子／親）</th>
          <th class="side" colspan="5">親家（下段＝子1人の支払い）</th>
        </tr>
        <tr>
          <th
            v-for="h in headers"
            :key="`${h.role}${h.han}`"
            class="hn pick"
            :class="{ edge: h.edge, thhit: isHeaderHit(h.sel) }"
            @click="pickCell(h.sel)"
          >{{ h.han }}翻</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row.fu" :class="{ hifu: row.fu >= HIGH_FU, rowhit: row.fu === fuRow }">
          <td class="fucol">{{ row.fu }}</td>
          <td
            v-for="c in row.cells"
            :key="c.key"
            :class="{
              man: c.han === 5,
              edge: c.edge,
              cellhit:
                c.han !== 5 &&
                row.fu === fuRow &&
                isHeaderHit({ role: c.role, kind: 'han', val: c.han }),
            }"
          >
            <span v-if="c.value === null" class="r na">—</span>
            <template v-else-if="c.value === 'man'">満貫</template>
            <template v-else>
              <span class="r">{{ fmt(c.value.ron) }}</span>
              <span class="t">{{ c.value.tsumo }}</span>
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <button class="toggle70" @click="expanded = !expanded">
    {{ expanded ? '70符以上を隠す ▲' : '70符以上を表示 ▼' }}
  </button>
</template>
