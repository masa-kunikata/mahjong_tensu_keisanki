import type {
  AgariKey,
  FuOption,
  HeadKey,
  MeldOption,
  RankKey,
  Role,
  SpecialOption,
  WaitKey,
} from './types'

/** 早見表の符の行 */
export const FU = [20, 25, 30, 40, 50, 60, 70, 80, 90, 100, 110] as const

/** 早見表に並べる翻の列 */
export const HAN_COLUMNS = [1, 2, 3, 4, 5] as const

/** これ以上の符の行は初期状態で隠す */
export const HIGH_FU = 70

export const AGARI: FuOption<AgariKey>[] = [
  { k: 'menzenRon', l: '面前ロン', fu: 10 },
  { k: 'ron', l: 'ロン(鳴き)', fu: 0 },
  { k: 'kuipinfu', l: '食い平和', fu: 10 },
  { k: 'tsumo', l: 'ツモ', fu: 2 },
]

export const MELDS: MeldOption[] = [
  { id: 'mk_c', l: '明刻 中張', fu: 2 },
  { id: 'mk_t', l: '明刻 么九', fu: 4 },
  { id: 'ak_c', l: '暗刻 中張', fu: 4 },
  { id: 'ak_t', l: '暗刻 么九', fu: 8 },
  { id: 'mg_c', l: '明槓 中張', fu: 8 },
  { id: 'mg_t', l: '明槓 么九', fu: 16 },
  { id: 'ag_c', l: '暗槓 中張', fu: 16 },
  { id: 'ag_t', l: '暗槓 么九', fu: 32 },
]

/** 手牌に持てる面子の上限 */
export const MELD_LIMIT = 4

export const HEAD: FuOption<HeadKey>[] = [
  { k: 'none', l: 'クリア', fu: 0 },
  { k: 'y1', l: '役牌の頭', fu: 2 },
  { k: 'y2', l: '連風牌の頭', fu: 4 },
]

export const WAIT: FuOption<WaitKey>[] = [
  { k: 'none', l: 'クリア', fu: 0 },
  { k: 'kan', l: 'カンチャン', fu: 2 },
  { k: 'pen', l: 'ペンチャン', fu: 2 },
  { k: 'tan', l: 'タンキ', fu: 2 },
]

export const SPECIAL: SpecialOption[] = [
  { k: 'pinfuTsumo', l: '平和ツモ', fixed: 20 },
  { k: 'chiitoi', l: '七対子', fixed: 25 },
]

/** [表示名, 翻数の目安] */
export const RANK: Record<RankKey, readonly [string, string]> = {
  mangan: ['満貫', '5翻'],
  hane: ['跳満', '6～7翻'],
  bai: ['倍満', '8～10翻'],
  sanbai: ['三倍満', '11翻～'],
  yakuman: ['役満', '役満'],
}

/** 満貫以上の固定点数。r = ロン、t = ツモの表示文字列 */
export const FIXED: Record<RankKey, Record<Role, { r: number; t: string }>> = {
  mangan: { dealer: { r: 12000, t: '4000' }, child: { r: 8000, t: '2000/4000' } },
  hane: { dealer: { r: 18000, t: '6000' }, child: { r: 12000, t: '3000/6000' } },
  bai: { dealer: { r: 24000, t: '8000' }, child: { r: 16000, t: '4000/8000' } },
  sanbai: { dealer: { r: 36000, t: '12000' }, child: { r: 24000, t: '6000/12000' } },
  yakuman: { dealer: { r: 48000, t: '16000' }, child: { r: 32000, t: '8000/16000' } },
}

export const RANK_ORDER: RankKey[] = ['mangan', 'hane', 'bai', 'sanbai', 'yakuman']
