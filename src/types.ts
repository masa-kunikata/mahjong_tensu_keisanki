/** 子家 / 親家 */
export type Role = 'child' | 'dealer'

/** 満貫以上の固定点数の区分 */
export type RankKey = 'mangan' | 'hane' | 'bai' | 'sanbai' | 'yakuman'

/** 上がり方 */
export type AgariKey = 'menzenRon' | 'ron' | 'kuipinfu' | 'tsumo'

/** 符が固定される特例 */
export type SpecialKey = 'pinfuTsumo' | 'chiitoi'

/** 面子の種類（_c = 中張 / _t = 么九） */
export type MeldId =
  | 'mk_c' | 'mk_t'
  | 'ak_c' | 'ak_t'
  | 'mg_c' | 'mg_t'
  | 'ag_c' | 'ag_t'

export type HeadKey = 'none' | 'y1' | 'y2'
export type WaitKey = 'none' | 'kan' | 'pen' | 'tan'

/** ラベルと符を持つ選択肢の共通形 */
export interface FuOption<K extends string> {
  k: K
  l: string
  fu: number
}

export interface MeldOption {
  id: MeldId
  l: string
  fu: number
}

export interface SpecialOption {
  k: SpecialKey
  l: string
  /** この特例を選んだときに固定される符 */
  fixed: number
}

/** 符の内訳1行 */
export interface FuLine {
  label: string
  fu: number
  /** 同じ要素の個数（2以上のときだけ「×n」表示） */
  n?: number
}

export interface FuResult {
  /** 切り上げ後の符 */
  fu: number
  /** 切り上げ前の合計 */
  sum: number
  /** 特例で固定された符かどうか */
  fixed?: boolean
  lines: FuLine[]
}

/** 早見表の1マス。null = 該当なし、'man' = 満貫 */
export type ScoreCell = { ron: number; tsumo: string } | 'man' | null

/** 見出しクリックで選択された対象。'han' = 符×翻、'rank' = 満貫以上 */
export type Selection =
  | { role: Role; kind: 'han'; val: number }
  | { role: Role; kind: 'rank'; val: RankKey }
  | null
