import type { HotBadge } from '../types'

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

export const BADGE_META: Record<HotBadge, { label: string; emoji: string; color: string; badge: HotBadge }> = {
  viral: { label: 'Viral', emoji: '🚀', color: COLORS.red, badge: 'viral' },
  trending: { label: 'Trending', emoji: '🔥', color: COLORS.yellow, badge: 'trending' },
  peak: { label: 'Peak', emoji: '⭐', color: COLORS.accent, badge: 'peak' },
}
