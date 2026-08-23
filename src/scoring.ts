import type { Role, ScoreCell } from './types'

const ceil100 = (n: number): number => Math.ceil(n / 100) * 100

export const fmt = (n: number): string => n.toLocaleString('ja-JP')

/**
 * 符・翻・親子から点数を求める。
 * 20符/25符の1翻は成立しないので null、基本点2000以上は満貫（'man'）。
 */
export function calc(fu: number, han: number, role: Role): ScoreCell {
  if ((fu === 20 || fu === 25) && han === 1) return null

  const base = fu * Math.pow(2, 2 + han)
  if (base >= 2000) return 'man'

  if (role === 'dealer') {
    return { ron: ceil100(base * 6), tsumo: fmt(ceil100(base * 2)) }
  }
  // 子はツモの支払いが「子／親」で異なる
  return {
    ron: ceil100(base * 4),
    tsumo: `${fmt(ceil100(base * 1))}/${fmt(ceil100(base * 2))}`,
  }
}
