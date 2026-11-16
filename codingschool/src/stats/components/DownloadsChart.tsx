import { useMemo, useState } from 'react'
import {
  Bar,
  BarChart,
  Brush,
  Cell,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { DailyDownload, HotTrendDay, ReleaseEvent } from '../types'
import { COLORS, FONT } from '../data/theme'
import { formatDayShort } from '../utils/date'
import { useTranslation } from '../../i18n'
import Panel from './Panel'

interface ChartPoint {
  day: string
  label: string
  downloads: number
  delta: number | null
}

function ChartTooltip(props: Record<string, unknown>) {
  const { t } = useTranslation()
  const { active, payload } = props as {
    active?: boolean
    payload?: { payload: ChartPoint }[]
  }
  if (!active || !payload || payload.length === 0) return null
  const point = payload[0].payload
  const delta = point.delta
  const deltaColor =
    delta === null ? COLORS.muted : delta > 0 ? COLORS.green : delta < 0 ? COLORS.red : COLORS.muted
  const deltaText =
    delta === null ? t('stats.chart.noPrev') : delta === 0 ? t('stats.chart.noChange') : `${delta > 0 ? '+' : ''}${delta}`
  return (
    <div
      style={{
        background: COLORS.panelAlt,
        border: `1px solid ${COLORS.border}`,
        borderRadius: 8,
        padding: '10px 14px',
        fontSize: 12,
        boxShadow: '0 8px 24px rgba(35,30,25,0.12)',
      }}
    >
      <div style={{ color: COLORS.muted, fontFamily: FONT.mono, letterSpacing: 0.5 }}>
        {point.label}
      </div>
      <div
        style={{
          color: COLORS.text,
          fontFamily: FONT.sans,
          fontWeight: 700,
          fontSize: 16,
          marginTop: 4,
        }}
      >
        {point.downloads.toLocaleString()} <span style={{ color: COLORS.muted, fontWeight: 400 }}>{t('stats.chart.downloads')}</span>
      </div>
      <div style={{ color: deltaColor, fontFamily: FONT.mono, marginTop: 4 }}>{deltaText}</div>
    </div>
  )
}

interface DownloadsChartProps {
  data: DailyDownload[]
  releases: ReleaseEvent[]
  hotDays?: HotTrendDay[]
}

const WINDOW = 30

export default function DownloadsChart({ data, releases, hotDays = [] }: DownloadsChartProps) {
  const { t } = useTranslation()
  const points: ChartPoint[] = useMemo(() => {
    return data.map((d, i) => ({
      day: d.day,
      label: formatDayShort(d.day),
      downloads: d.downloads,
      delta: i > 0 ? d.downloads - data[i - 1].downloads : null,
    }))
  }, [data])

  const hotSet = useMemo(() => new Set(hotDays.map((d) => d.day)), [hotDays])

  const defaultStart = Math.max(0, points.length - WINDOW)
  const defaultEnd = Math.max(0, points.length - 1)
  const [range, setRange] = useState<{ start: number; end: number } | null>(null)
  const start = range?.start ?? defaultStart
  const end = range?.end ?? defaultEnd
  const isDefaultWindow = start === defaultStart && end === defaultEnd

  // ~5 evenly spaced axis labels across the visible window, always ending on the last day.
  const ticks = useMemo(() => {
    const span = end - start
    if (span <= 0) return points[start] ? [points[start].day] : []
    const step = Math.max(1, Math.ceil(span / 4))
    const out: string[] = []
    for (let i = start; i < end; i += step) {
      if (end - i >= step / 2) out.push(points[i].day)
    }
    out.push(points[end].day)
    return out
  }, [points, start, end])

  const visibleReleases = useMemo(() => {
    if (points.length === 0) return []
    const first = points[0].day
    const last = points[points.length - 1].day
    return releases.filter((r) => r.date >= first && r.date <= last)
  }, [releases, points])

  const lastDay = points.length > 0 ? points[points.length - 1].day : null

  return (
    <Panel style={{ padding: 32 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 24,
          gap: 12,
          flexWrap: 'wrap',
        }}
      >
        <div style={{ fontFamily: FONT.sans, fontSize: 18, fontWeight: 600, color: COLORS.text }}>
          {t('stats.chart.title')}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 10, height: 10, borderRadius: 3, background: COLORS.accent }} />
          <span style={{ fontFamily: FONT.mono, fontSize: 12, color: COLORS.muted }}>
            {isDefaultWindow ? `${t('stats.chart.downloads')} · ${t('stats.last30')}` : t('stats.chart.downloads')}
          </span>
        </div>
      </div>
      <div style={{ width: '100%', height: 280 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={points} margin={{ top: 0, right: 0, left: 0, bottom: 0 }} barCategoryGap="22%">
            <XAxis
              dataKey="day"
              ticks={ticks}
              interval={0}
              tick={(props: { x?: number | string; y?: number | string; payload?: { value?: unknown } }) => {
                const x = Number(props.x ?? 0)
                const y = Number(props.y ?? 0)
                const value = String(props.payload?.value ?? '')
                const anchor = value === ticks[0] ? 'start' : value === ticks[ticks.length - 1] ? 'end' : 'middle'
                // Bars are up to 28px wide; nudge the edge labels to the bar's outer edge.
                const dx = anchor === 'start' ? -14 : anchor === 'end' ? 14 : 0
                return (
                  <text x={x + dx} y={y} dy={12} textAnchor={anchor} fill={COLORS.muted} fontSize={11} fontFamily={FONT.mono}>
                    {value ? formatDayShort(value) : ''}
                  </text>
                )
              }}
              axisLine={{ stroke: COLORS.border }}
              tickLine={false}
              tickMargin={12}
              height={48}
            />
            <YAxis hide />
            <Tooltip content={<ChartTooltip />} cursor={{ fill: COLORS.accentDim }} />
            <Bar dataKey="downloads" radius={[6, 6, 0, 0]} maxBarSize={28} animationDuration={700}>
              {points.map((p) => (
                <Cell
                  key={p.day}
                  fill={p.day === lastDay ? COLORS.accent : hotSet.has(p.day) ? COLORS.barHot : COLORS.bar}
                />
              ))}
            </Bar>
            {visibleReleases.map((r) => (
              <ReferenceLine
                key={r.date}
                x={r.date}
                stroke={COLORS.accent}
                strokeDasharray="4 4"
                strokeOpacity={0.5}
                label={{
                  value: `● ${r.title}`,
                  position: 'insideTopLeft',
                  fill: COLORS.accent,
                  fontSize: 10,
                  fontFamily: FONT.mono,
                }}
              />
            ))}
            {points.length > WINDOW ? (
              <Brush
                dataKey="day"
                height={24}
                travellerWidth={8}
                stroke={COLORS.border}
                fill={COLORS.panel}
                startIndex={start}
                endIndex={end}
                onChange={(r: { startIndex?: number; endIndex?: number }) => {
                  if (r.startIndex === undefined || r.endIndex === undefined) return
                  setRange({ start: r.startIndex, end: r.endIndex })
                }}
                tickFormatter={() => ''}
              />
            ) : null}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Panel>
  )
}
