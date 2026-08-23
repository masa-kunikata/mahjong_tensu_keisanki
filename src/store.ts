import { computed, inject, provide, ref, watch, type InjectionKey } from 'vue'
import {
  AGARI,
  FIXED,
  FU,
  HEAD,
  HIGH_FU,
  MELDS,
  MELD_LIMIT,
  RANK,
  SPECIAL,
  WAIT,
} from './data'
import { calc, fmt } from './scoring'
import type {
  AgariKey,
  FuResult,
  HeadKey,
  MeldId,
  Selection,
  SpecialKey,
  WaitKey,
} from './types'

/** 右側パネルに出す「選択したハン」の表示内容 */
export interface HanPanel {
  show: boolean
  big: string
  roleJP: string
  /** 「30符　」「30符・満貫　」など点数の前に付く説明 */
  prefix: string
  /** 該当なしの場合は null */
  points: { ron: string; tsumo: string } | null
}

const HIDDEN_PANEL: HanPanel = { show: false, big: '', roleJP: '', prefix: '', points: null }

/**
 * 符計算の状態一式を作る。内部の watch は呼び出し元コンポーネントの
 * effect scope に乗るので、必ず provideCalculator() 経由で App から呼ぶこと。
 * （テストから直接呼んでもよい）
 */
export function createCalculator() {
  const agari = ref<AgariKey>('menzenRon')
  const special = ref<SpecialKey | null>(null)
  const counts = ref<Record<MeldId, number>>(
    Object.fromEntries(MELDS.map((m) => [m.id, 0])) as Record<MeldId, number>,
  )
  const headSel = ref<HeadKey>('none')
  const waitSel = ref<WaitKey>('none')
  const selection = ref<Selection>(null)
  const expanded = ref(false)

  const meldsC = computed(() => MELDS.filter((m) => m.id.endsWith('_c')))
  const meldsT = computed(() => MELDS.filter((m) => m.id.endsWith('_t')))
  const meldTotal = computed(() => MELDS.reduce((s, m) => s + counts.value[m.id], 0))

  const fuResult = computed<FuResult>(() => {
    if (special.value) {
      const s = SPECIAL.find((x) => x.k === special.value)!
      return { fu: s.fixed, sum: s.fixed, fixed: true, lines: [{ label: s.l, fu: s.fixed }] }
    }

    // 副底20符に各要素を加算し、最後に10符単位で切り上げる
    let raw = 20
    const lines: FuResult['lines'] = [{ label: '副底', fu: 20 }]

    const ag = AGARI.find((a) => a.k === agari.value)!
    if (ag.fu > 0) {
      raw += ag.fu
      lines.push({ label: ag.l, fu: ag.fu })
    }
    for (const it of MELDS) {
      const n = counts.value[it.id]
      if (n > 0) {
        raw += it.fu * n
        lines.push({ label: it.l, fu: it.fu * n, n })
      }
    }
    const h = HEAD.find((x) => x.k === headSel.value)
    if (h && h.fu > 0) {
      raw += h.fu
      lines.push({ label: h.l, fu: h.fu })
    }
    const w = WAIT.find((x) => x.k === waitSel.value)
    if (w && w.fu > 0) {
      raw += w.fu
      lines.push({ label: w.l, fu: w.fu })
    }

    return { fu: Math.ceil(raw / 10) * 10, sum: raw, lines }
  })

  /** 早見表でハイライトする行（表に無い符は 20〜110 に丸める） */
  const fuRow = computed(() => {
    const f = fuResult.value.fu
    return (FU as readonly number[]).includes(f) ? f : Math.min(110, Math.max(20, f))
  })

  const hanPanel = computed<HanPanel>(() => {
    const sel = selection.value
    if (!sel) return HIDDEN_PANEL

    const roleJP = sel.role === 'dealer' ? '親家' : '子家'

    if (sel.kind === 'rank') {
      const v = FIXED[sel.val][sel.role]
      return {
        show: true,
        big: RANK[sel.val][0],
        roleJP,
        prefix: '',
        points: { ron: fmt(v.r), tsumo: v.t },
      }
    }

    const big = `${sel.val}翻`
    const r = calc(fuRow.value, sel.val, sel.role)
    if (r === null) {
      return { show: true, big, roleJP, prefix: `${fuRow.value}符 → 該当なし`, points: null }
    }
    if (r === 'man') {
      const v = FIXED.mangan[sel.role]
      return {
        show: true,
        big,
        roleJP,
        prefix: `${fuRow.value}符・満貫　`,
        points: { ron: fmt(v.r), tsumo: v.t },
      }
    }
    return {
      show: true,
      big,
      roleJP,
      prefix: `${fuRow.value}符　`,
      points: { ron: fmt(r.ron), tsumo: r.tsumo },
    }
  })

  function pickAgari(k: AgariKey) {
    agari.value = k
    special.value = null
  }

  /** 同じ特例をもう一度押すと解除 */
  function pickSpecial(k: SpecialKey) {
    special.value = special.value === k ? null : k
  }

  function addMeld(id: MeldId) {
    if (meldTotal.value >= MELD_LIMIT) return
    counts.value[id]++
    special.value = null
  }

  function subMeld(id: MeldId) {
    if (counts.value[id] > 0) counts.value[id]--
  }

  function pickHead(k: HeadKey) {
    headSel.value = k
    special.value = null
  }

  function pickWait(k: WaitKey) {
    waitSel.value = k
    special.value = null
  }

  function pickCell(sel: NonNullable<Selection>) {
    selection.value = sel
  }

  function isHeaderHit(sel: NonNullable<Selection>): boolean {
    const cur = selection.value
    return !!cur && cur.role === sel.role && cur.kind === sel.kind && cur.val === sel.val
  }

  function reset() {
    for (const m of MELDS) counts.value[m.id] = 0
    agari.value = 'menzenRon'
    special.value = null
    headSel.value = 'none'
    waitSel.value = 'none'
    selection.value = null
    expanded.value = false
  }

  // 高い符に到達したら隠れている70符以上の行を自動で開く
  watch(fuRow, (v, o) => {
    if (v >= HIGH_FU && o < HIGH_FU) expanded.value = true
  })

  return {
    agari,
    special,
    counts,
    headSel,
    waitSel,
    selection,
    expanded,
    meldsC,
    meldsT,
    meldTotal,
    fuResult,
    fuRow,
    hanPanel,
    pickAgari,
    pickSpecial,
    addMeld,
    subMeld,
    pickHead,
    pickWait,
    pickCell,
    isHeaderHit,
    reset,
  }
}

export type Calculator = ReturnType<typeof createCalculator>

const CALCULATOR_KEY: InjectionKey<Calculator> = Symbol('calculator')

/** ルート（App.vue）で1回だけ呼び、配下のコンポーネントに状態を配る */
export function provideCalculator(): Calculator {
  const calculator = createCalculator()
  provide(CALCULATOR_KEY, calculator)
  return calculator
}

/** provideCalculator() した親の配下で共有状態を受け取る */
export function useCalculator(): Calculator {
  const calculator = inject(CALCULATOR_KEY)
  if (!calculator) {
    throw new Error('useCalculator(): provideCalculator() を呼ぶ親の内側で使ってください')
  }
  return calculator
}
