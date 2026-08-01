import { useMemo, useState } from 'react'
import type { DailyDownload, HotTrendDay } from '../types'
import { BADGE_META, COLORS, FONT } from '../data/theme'
import { formatDayFull, formatDayShort, parseDay, toISODate } from '../utils/date'
import Panel from './Panel'

interface CalendarViewProps {
  data: DailyDownload[]
  hotDays: HotTrendDay[]
}

interface CalendarCell {
  key: string
  day: string
  downloads: number
  inRange: boolean
  delta: number | null
}

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

export default function CalendarView({ data, hotDays }: CalendarViewProps) {
  const [selected, setSelected] = useState<string | null>(null)

  const cells = useMemo<CalendarCell[]>(() => {
    if (data.length === 0) return []
    const anchor = [...data].reverse().find((d) => d.downloads > 0) ?? data[data.length - 1]
    const ref = parseDay(anchor.day)
    const year = ref.getUTCFullYear()
    const month = ref.getUTCMonth()
    const daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate()
    const byDay = new Map(data.map((d) => [d.day, d]))
    const today = toISODate(new Date())
    const firstDate = data[0].day
    const cells: CalendarCell[] = []
    for (let d = 1; d <= daysInMonth; d++) {
      const day = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
      const entry = byDay.get(day)
      const index = entry ? data.indexOf(entry) : -1
      cells.push({
        key: day,
        day,
        downloads: entry?.downloads ?? 0,
        inRange: day >= firstDate,
        delta: index > 0 ? (entry?.downloads ?? 0) - data[index - 1].downloads : null,
      })
      void today
    }
    return cells
  }, [data])

  const selectedCell = cells.find((c) => c.key === selected) ?? null
  const selectedHot = selectedCell ? hotDays.find((h) => h.day === selectedCell.key) ?? null : null
  const selectedDelta = selectedCell?.delta ?? null

  const firstDayOffset = cells.length > 0
    ? parseDay(cells[0].key).getUTCDay()
    : 0

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
        Calendar View
      </div>
      <div className="stats-calendar">
        {WEEKDAYS.map((w) => (
          <div
            key={w}
            style={{
              fontFamily: FONT.mono,
              fontSize: 10,
              color: COLORS.muted,
              textAlign: 'center',
            }}
          >
            {w}
          </div>
        ))}
        {Array.from({ length: firstDayOffset }, (_, i) => (
          <div key={`blank-${i}`} />
        ))}
        {cells.map((c) => {
          const hot = c.inRange && hotDays.some((h) => h.day === c.key)
          const isSelected = c.key === selected
          return (
            <button
              key={c.key}
              onClick={() => setSelected(isSelected ? null : c.key)}
              disabled={!c.inRange}
              style={{
                background: isSelected ? COLORS.accent : hot ? COLORS.accentDim : COLORS.panelAlt,
                border: isSelected
                  ? `1px solid ${COLORS.accent}`
                  : hot
                    ? `1px solid ${COLORS.accent}`
                    : `1px solid ${COLORS.border}`,
                color: isSelected ? COLORS.bg : c.inRange ? COLORS.text : COLORS.muted,
                borderRadius: 8,
                height: 40,
                cursor: c.inRange ? 'pointer' : 'default',
                opacity: c.inRange ? 1 : 0.35,
                fontFamily: FONT.sans,
                fontSize: 13,
                fontWeight: 600,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'transform 120ms ease-out',
              }}
              onMouseEnter={(e) => {
                if (c.inRange) e.currentTarget.style.transform = 'scale(1.06)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
              }}
            >
              <span style={{ fontSize: 11, opacity: 0.85 }}>{Number(c.key.slice(8))}</span>
              <span style={{ fontSize: 9, opacity: 0.7 }}>
                {c.inRange ? c.downloads : ''}
              </span>
            </button>
          )
        })}
      </div>

      {selectedCell ? (
        <div
          style={{
            marginTop: 16,
            background: COLORS.panelAlt,
            border: `1px solid ${COLORS.border}`,
            borderRadius: 10,
            padding: '14px 16px',
          }}
        >
          <div
            style={{
              fontFamily: FONT.sans,
              fontSize: 14,
              fontWeight: 600,
              color: COLORS.text,
              marginBottom: 6,
            }}
          >
            {formatDayFull(selectedCell.day)}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: FONT.mono, fontSize: 13, color: COLORS.text }}>
              <span style={{ color: COLORS.accent }}>{selectedCell.downloads}</span> downloads
            </span>
            <span
              style={{
                fontFamily: FONT.mono,
                fontSize: 12,
                color:
                  selectedDelta === null
                    ? COLORS.muted
                    : selectedDelta > 0
                      ? COLORS.green
                      : selectedDelta < 0
                        ? COLORS.red
                        : COLORS.muted,
              }}
            >
              {selectedDelta === null
                ? 'first day'
                : selectedDelta === 0
                  ? 'no change'
                  : `${selectedDelta > 0 ? '+' : ''}${selectedDelta} vs prev`}
            </span>
            {selectedHot ? (
              <span
                style={{
                  background: `${BADGE_META[selectedHot.badge].color}1f`,
                  color: BADGE_META[selectedHot.badge].color,
                  border: `1px solid ${BADGE_META[selectedHot.badge].color}55`,
                  borderRadius: 999,
                  padding: '3px 10px',
                  fontSize: 11,
                  fontWeight: 600,
                  fontFamily: FONT.sans,
                }}
              >
                {BADGE_META[selectedHot.badge].emoji} {BADGE_META[selectedHot.badge].label}
              </span>
            ) : null}
            {selectedCell.inRange ? (
              <span style={{ fontFamily: FONT.mono, fontSize: 11, color: COLORS.muted }}>
                {formatDayShort(selectedCell.day)}
              </span>
            ) : null}
          </div>
        </div>
      ) : null}
    </Panel>
  )
}
