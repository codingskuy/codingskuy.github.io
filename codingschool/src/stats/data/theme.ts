import type { HotBadge, TrendBucket } from '../types'

export const COLORS = {
  bg: '#0D1117',
  panel: '#161B22',
  panelAlt: '#1C2128',
  border: '#30363D',
  text: '#F0F6FC',
  muted: '#8B949E',
  accent: '#FF8C42',
  green: '#3FB950',
  red: '#F85149',
  yellow: '#D29922',
  accentDim: 'rgba(255, 140, 66, 0.12)',
  grid: '#21262D',
} as const

export const FONT = {
  sans: "'Inter', sans-serif",
  mono: "'JetBrains Mono', monospace",
} as const

export const BADGE_META: Record<HotBadge, { label: string; emoji: string; color: string }> = {
  viral: { label: 'Viral', emoji: '🚀', color: COLORS.red },
  trending: { label: 'Trending', emoji: '🔥', color: COLORS.yellow },
  peak: { label: 'Peak', emoji: '⭐', color: COLORS.accent },
}

export const TREND_META: Record<TrendBucket, { label: string; emoji: string; color: string }> = {
  'extremely-hot': { label: 'Extremely Hot', emoji: '🔥', color: COLORS.red },
  'growing-fast': { label: 'Growing Fast', emoji: '🚀', color: COLORS.accent },
  stable: { label: 'Stable', emoji: '📈', color: COLORS.yellow },
  cooling: { label: 'Cooling Down', emoji: '😴', color: COLORS.muted },
}
