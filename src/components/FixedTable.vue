<script setup lang="ts">
import { FIXED, RANK, RANK_ORDER } from '../data'
import { fmt } from '../scoring'
import { useCalculator } from '../store'
import type { RankKey, Role } from '../types'

const ROLES: Role[] = ['child', 'dealer']

const { pickCell, isHeaderHit } = useCalculator()

/** 子家5区分 → 親家5区分 */
const columns = ROLES.flatMap((role) =>
  RANK_ORDER.map((rank, i) => ({
    key: `${role}${rank}`,
    role,
    rank,
    edge: i === 0,
    sel: { role, kind: 'rank', val: rank } as const,
  })),
)

const label = (rank: RankKey) => RANK[rank][0]
const hanHint = (rank: RankKey) => RANK[rank][1]
</script>

<template>
  <div class="tbl-wrap">
    <table class="fixed">
      <thead>
        <tr>
          <th rowspan="3" class="midlab">5翻<br />以上</th>
          <th
            v-for="c in columns"
            :key="c.key"
            class="pick"
            :class="{ edge: c.edge, thhit: isHeaderHit(c.sel) }"
            @click="pickCell(c.sel)"
          >{{ label(c.rank) }}</th>
        </tr>
        <tr class="han-row">
          <td v-for="c in columns" :key="c.key" :class="{ edge: c.edge }">{{ hanHint(c.rank) }}</td>
        </tr>
        <tr>
          <td v-for="c in columns" :key="c.key" :class="{ edge: c.edge, cellhit: isHeaderHit(c.sel) }">
            <span class="r">{{ fmt(FIXED[c.rank][c.role].r) }}</span>
            <span class="t">{{ FIXED[c.rank][c.role].t }}</span>
          </td>
        </tr>
      </thead>
    </table>
  </div>
</template>
