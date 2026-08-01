import { useMemo } from 'react'
import type { DailyDownload } from '../types'
import { COLORS, FONT } from '../data/theme'
import { parseDay } from '../utils/date'
import Panel from './Panel'

interface HeatmapProps {
  data: DailyDownload[]
}

function heatColor(downloads: number, max: number): string {
  if (downloads === 0) return COLORS.panelAlt
  const intensity = downloads / max
  return `rgba(255, 140, 66, ${0.18 + 0.82 * intensity})`
}

export default function Heatmap({ data }: HeatmapProps) {
  const { weeks, max } = useMemo(() => {
    const max = Math.max(1, ...data.map((d) => d.downloads))
    const byDay = new Map(data.map((d) => [d.day, d]))
    const weeks: (DailyDownload | null)[][] = []
    let current: (DailyDownload | null)[] = []
    if (data.length > 0) {
      const first = parseDay(data[0].day)
      for (let i = 0; i < first.getUTCDay(); i++) current.push(null)
      for (const d of data) {
        current.push(d)
        if (current.length === 7) {
          weeks.push(current)
          current = []
        }
      }
      if (current.length > 0) weeks.push(current)
    }
    void byDay
    return { weeks, max }
  }, [data])

  if (weeks.length === 0) {
    return (
      <Panel>
        <div style={{ fontFamily: FONT.mono, fontSize: 12, color: COLORS.muted }}>
          No data to display.
        </div>
      </Panel>
    )
  }

  return (
    <Panel>
      <div
        style={{
          fontFamily: FONT.sans,
          fontSize: 15,
          fontWeight: 600,
          color: COLORS.text,
          marginBottom: 16,
        }}
      >
        Download Heatmap
      </div>
      <div style={{ display: 'flex', gap: 4, overflowX: 'auto', paddingBottom: 8 }}>
        {weeks.map((week, wi) => {
          const firstDay = week.find((d) => d !== null)
          const month = firstDay
            ? parseDay(firstDay.day).toLocaleDateString('en-US', { month: 'short', timeZone: 'UTC' })
            : ''
          return (
            <div key={wi} className="stats-heatmap-week">
              <div style={{ fontFamily: FONT.mono, fontSize: 9, color: COLORS.muted, height: 12 }}>
                {month}
              </div>
              {Array.from({ length: 7 }, (_, row) => {
                const cell = week[row]
                return (
                  <div
                    key={row}
                    title={
                      cell
                        ? `${cell.day} · ${cell.downloads} downloads`
                        : undefined
                    }
                    style={{
                      width: 14,
                      height: 14,
                      borderRadius: 3,
                      background: cell ? heatColor(cell.downloads, max) : 'transparent',
                      border: cell ? '1px solid rgba(255,255,255,0.05)' : 'none',
                    }}
                  />
                )
              })}
            </div>
          )
        })}
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          marginTop: 12,
          fontFamily: FONT.mono,
          fontSize: 10,
          color: COLORS.muted,
        }}
      >
        Less
        {[0, 0.25, 0.5, 0.75, 1].map((t) => (
          <span
            key={t}
            style={{
              width: 12,
              height: 12,
              borderRadius: 3,
              background:
                t === 0
                  ? COLORS.panelAlt
                  : `rgba(255, 140, 66, ${0.18 + 0.82 * t})`,
            }}
          />
        ))}
        More
      </div>
    </Panel>
  )
}
