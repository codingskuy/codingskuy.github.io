import { useEffect, useRef, useState } from 'react'
import type { DailyDownload, DailyStats } from '../types'
import { COLORS, FONT } from '../data/theme'
import { RELEASE_DATE } from '../data/config'
import { parseDay } from '../utils/date'
import { useTranslation } from '../../i18n'
import Panel from './Panel'

interface StatCardProps {
  label: string
  value: number
  precision?: number
  hint?: string
  hintColor?: string
  dark?: boolean
}

function useCountUp(target: number, duration = 900, precision = 0) {
  const ref = useRef<HTMLDivElement>(null)
  const [value, setValue] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        const start = performance.now()
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - p, 3)
          setValue(target * eased)
          if (p < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.3 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [target, duration])

  const display = value.toLocaleString('en-US', {
    maximumFractionDigits: precision,
    minimumFractionDigits: precision,
  })

  return { ref, display }
}

function StatCard({ label, value, precision = 0, hint, hintColor, dark = false }: StatCardProps) {
  const { ref, display } = useCountUp(value, 900, precision)
  const muted = dark ? '#8B949E' : COLORS.muted
  return (
    <Panel
      style={{
        padding: 28,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        ...(dark ? { background: 'var(--total-bg)', border: '1px solid var(--total-border)' } : {}),
      }}
    >
      <div
        style={{
          fontFamily: FONT.mono,
          fontSize: 12,
          color: muted,
        }}
      >
        {label}
      </div>
      <div
        ref={ref}
        style={{
          fontFamily: FONT.mono,
          fontSize: 40,
          fontWeight: 700,
          letterSpacing: '-0.03em',
          color: dark ? '#FF8C42' : COLORS.text,
          lineHeight: 1.3,
        }}
      >
        {display}
      </div>
      {hint ? (
        <div
          style={{
            fontFamily: FONT.sans,
            fontSize: 13,
            fontWeight: 500,
            color: hintColor ?? muted,
          }}
        >
          {hint}
        </div>
      ) : null}
    </Panel>
  )
}

function currentGrowth(data: DailyDownload[]): number | null {
  if (data.length < 8) return null
  const recent = data.slice(-7).reduce((a, d) => a + d.downloads, 0) / 7
  const prev = data.slice(-14, -7).reduce((a, d) => a + d.downloads, 0) / 7
  if (prev === 0) return recent > 0 ? 1 : 0
  return (recent - prev) / prev
}

interface HeroCardsProps {
  data: DailyDownload[]
  stats: DailyStats
}

export default function HeroCards({ data, stats }: HeroCardsProps) {
  const { t } = useTranslation()
  const thisWeek = data.slice(-7).reduce((a, d) => a + d.downloads, 0)
  const thisMonth = data.slice(-30).reduce((a, d) => a + d.downloads, 0)
  const today = stats.lastDay?.downloads ?? 0
  const growth = currentGrowth(data)
  const growthPct = growth === null ? null : Math.abs(growth * 100)
  const releaseLabel = parseDay(RELEASE_DATE).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  })

  return (
    <div className="stats-hero-grid">
      <StatCard
        label={t('stats.total')}
        value={stats.total}
        hint={t('stats.since', { date: releaseLabel })}
        dark
      />
      <StatCard label={t('stats.today')} value={today} />
      <StatCard label={t('stats.week')} value={thisWeek} />
      <StatCard label={t('stats.month')} value={thisMonth} hint={t('stats.last30')} />
      <StatCard
        label={t('stats.daysSinceRelease')}
        value={stats.daysSinceRelease}
        hint={t('stats.since', { date: releaseLabel })}
      />
      <StatCard
        label={t('stats.avgDay')}
        value={stats.avgPerDay}
        precision={1}
      />
      <StatCard
        label={t('stats.growth')}
        value={growthPct ?? 0}
        precision={1}
        hint={growth === null ? t('stats.need2weeks') : `${growth >= 0 ? '▲' : '▼'} ${t('stats.prev7')}`}
        hintColor={growth === null ? undefined : growth >= 0 ? COLORS.green : COLORS.red}
      />
      <StatCard
        label={t('stats.avgWeek')}
        value={stats.avgPerWeek}
        precision={1}
      />
    </div>
  )
}
