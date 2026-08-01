import { useEffect, useMemo, useRef, useState } from 'react'
import { RefreshCw } from 'lucide-react'
import type { HotTrendDay, Milestone } from './types'
import {
  computeDailyStats,
  computeHotTrendDays,
  computeMilestones,
} from './lib/analytics'
import { useStatsData } from './lib/useStatsData'
import { RELEASES } from './data/releases'
import { COLORS, FONT } from './data/theme'
import SectionShell from './components/SectionShell'
import Reveal from './components/Reveal'
import StatePanel from './components/StatePanel'
import HeroCards from './components/HeroCards'
import DownloadsChart from './components/DownloadsChart'
import HotTrendDays from './components/HotTrendDays'
import Milestones from './components/Milestones'
import ShareSnapshot from './components/ShareSnapshot'
import './stats.css'

interface Computed {
  stats: ReturnType<typeof computeDailyStats> | null
  hotDays: HotTrendDay[]
  milestones: Milestone[]
}

function compute(data: ReturnType<typeof computeDailyStats>['data']): Computed {
  const stats = computeDailyStats(data)
  const milestones = computeMilestones(data)
  return {
    stats,
    hotDays: computeHotTrendDays(data, stats),
    milestones,
  }
}

export default function StatsSection() {
  const rootRef = useRef<HTMLDivElement>(null)
  const snapshotRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null)

  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true)
          io.disconnect()
        }
      },
      { rootMargin: '300px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const { status, data, lastUpdated, error, refetch } = useStatsData(active)

  const computed = useMemo<Computed>(
    () => (data.length > 0 ? compute(data) : {
      stats: null,
      hotDays: [],
      milestones: computeMilestones([]),
    }),
    [data],
  )

  const handleRefetch = (): void => {
    refetch()
    setLastRefresh(new Date())
  }

  return (
    <section
      ref={rootRef}
      style={{
        background: COLORS.bg,
        borderTop: `1px solid ${COLORS.border}`,
        borderBottom: `1px solid ${COLORS.border}`,
      }}
    >
      <SectionShell
        id="stats"
        label="npm analytics"
        title="CodingSchool Package Analytics"
        subtitle={`Live downloads for ${'@codingskuy/coding-school'} since launch on 13 Jul 2026, computed from the npm download API.`}
        action={
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button
              onClick={handleRefetch}
              title="Refresh data"
              aria-label="Refresh data"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: 'transparent',
                color: COLORS.muted,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 8,
                padding: '8px 12px',
                fontSize: 13,
                cursor: 'pointer',
                fontFamily: FONT.sans,
                transition: 'color 150ms ease-out, border-color 150ms ease-out',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = COLORS.text
                e.currentTarget.style.borderColor = COLORS.muted
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = COLORS.muted
                e.currentTarget.style.borderColor = COLORS.border
              }}
            >
              <RefreshCw size={13} />
              Refresh
            </button>
            <ShareSnapshot node={snapshotRef} />
          </div>
        }
      >
        {status === 'loading' && data.length === 0 ? (
          <StatePanel kind="loading" />
        ) : status === 'error' && data.length === 0 ? (
          <StatePanel kind="error" message={error ?? undefined} onRetry={handleRefetch} />
        ) : computed.stats === null ? (
          <StatePanel kind="empty" />
        ) : (
          <div ref={snapshotRef}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 12,
                flexWrap: 'wrap',
                marginBottom: 20,
              }}
            >
              {lastUpdated ? (
                <span
                  style={{
                    fontFamily: FONT.mono,
                    fontSize: 11,
                    color: COLORS.muted,
                  }}
                >
                  ● live · updated {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  {lastRefresh ? ' · refreshed' : ''}
                </span>
              ) : (
                <span />
              )}
            </div>

            <Reveal>
              <HeroCards data={data} stats={computed.stats} />
            </Reveal>

            <div style={{ marginTop: 16 }}>
              <Reveal delay={80}>
                <DownloadsChart data={data} releases={RELEASES} />
              </Reveal>
            </div>

            <div className="stats-2col" style={{ marginTop: 16 }}>
              <Reveal delay={40}>
                <HotTrendDays days={computed.hotDays} />
              </Reveal>
              <Reveal delay={120}>
                <Milestones milestones={computed.milestones} />
              </Reveal>
            </div>
          </div>
        )}
      </SectionShell>
    </section>
  )
}
