<script setup lang="ts">
import { useCalculator } from '../store'
import type { MeldOption } from '../types'
import { MELD_LIMIT } from '../data'

defineProps<{ title: string; items: MeldOption[] }>()

const { counts, special, meldTotal, addMeld, subMeld } = useCalculator()
</script>

<template>
  <div class="cgrp">
    <h2>{{ title }}</h2>
    <div class="body">
      <div
        v-for="it in items"
        :key="it.id"
        class="item"
        :class="{
          zero: counts[it.id] === 0,
          active: counts[it.id] > 0 && !special,
          maxed: meldTotal >= MELD_LIMIT,
        }"
      >
        <button class="add" @click="addMeld(it.id)">{{ it.l }}<em>+{{ it.fu }}</em></button>
        <span class="cnt">×{{ counts[it.id] }}</span>
        <button class="sub" @click="subMeld(it.id)">−</button>
      </div>
    </div>
  </div>
</template>
