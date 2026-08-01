import { useEffect, useRef, useState } from 'react'
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  CalendarDays,
  Clock,
  Download,
  Flame,
  TrendingUp,
} from 'lucide-react'
import type { DailyDownload, DailyStats } from '../types'
import { COLORS, FONT } from '../data/theme'
import Panel from './Panel'

interface StatCardProps {
  icon: React.ReactNode
  label: string
  value: number
  precision?: number
  hint?: string
  accent?: string
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

function StatCard({ icon, label, value, precision = 0, hint, accent = COLORS.accent }: StatCardProps) {
  const { ref, display } = useCountUp(value, 900, precision)
  return (
    <Panel style={{ padding: 18 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <span style={{ color: accent, display: 'flex' }}>{icon}</span>
        <span
          style={{
            fontFamily: FONT.mono,
            fontSize: 11,
            color: COLORS.muted,
            letterSpacing: 0.5,
            textTransform: 'uppercase',
          }}
        >
          {label}
        </span>
      </div>
      <div
        ref={ref}
        style={{
          fontFamily: FONT.sans,
          fontSize: 28,
          fontWeight: 700,
          color: COLORS.text,
          lineHeight: 1.1,
        }}
      >
        {display}
      </div>
      {hint ? (
        <div
          style={{
            fontFamily: FONT.mono,
            fontSize: 11,
            color: COLORS.muted,
            marginTop: 8,
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
  const lastDay = stats.lastDay?.day ?? ''
  const currentMonth = lastDay.slice(0, 7)
  const thisWeek = data.slice(-7).reduce((a, d) => a + d.downloads, 0)
  const thisMonth = data
    .filter((d) => d.day.startsWith(currentMonth))
    .reduce((a, d) => a + d.downloads, 0)
  const today = stats.lastDay?.downloads ?? 0
  const growth = currentGrowth(data)
  const growthPct = growth === null ? null : Math.abs(growth * 100)

  return (
    <div className="stats-hero-grid">
      <StatCard
        icon={<Download size={14} />}
        label="Total Downloads"
        value={stats.total}
        hint={`since ${lastDay || 'release'}`}
      />
      <StatCard icon={<Flame size={14} />} label="Downloads Today" value={today} />
      <StatCard icon={<TrendingUp size={14} />} label="This Week" value={thisWeek} />
      <StatCard icon={<CalendarDays size={14} />} label="This Month" value={thisMonth} />
      <StatCard
        icon={<Clock size={14} />}
        label="Days Since Release"
        value={stats.daysSinceRelease}
        hint="since 15 Jul 2026"
      />
      <StatCard
        icon={<BarChart3 size={14} />}
        label="Avg Downloads / Day"
        value={stats.avgPerDay}
        precision={1}
      />
      <StatCard
        icon={
          growth === null || growth >= 0 ? (
            <ArrowUpRight size={14} />
          ) : (
            <ArrowDownRight size={14} />
          )
        }
        label="Current Growth"
        value={growthPct ?? 0}
        precision={1}
        hint={growth === null ? 'need 2 weeks of data' : '7d vs prev 7d'}
        accent={growth === null ? COLORS.muted : growth >= 0 ? COLORS.green : COLORS.red}
      />
      <StatCard
        icon={<TrendingUp size={14} />}
        label="Avg Downloads / Week"
        value={stats.avgPerWeek}
        precision={1}
      />
    </div>
  )
}
