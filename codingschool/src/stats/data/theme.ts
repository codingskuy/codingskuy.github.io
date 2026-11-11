import type { HotBadge } from '../types'

export const COLORS = {
  bg: 'var(--bg)',
  panel: 'var(--surface)',
  panelAlt: 'var(--surface-2)',
  border: 'var(--border)',
  borderStrong: 'var(--border-strong)',
  text: 'var(--text)',
  muted: 'var(--muted)',
  accent: 'var(--accent)',
  green: 'var(--green)',
  red: 'var(--red)',
  yellow: 'var(--yellow)',
  accentDim: 'rgba(232, 101, 15, 0.12)',
  grid: 'var(--track)',
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
