import { useMemo } from 'react'
import {
  Area,
  AreaChart,
  Brush,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { DailyDownload, ReleaseEvent } from '../types'
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
        boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
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
}

export default function DownloadsChart({ data, releases }: DownloadsChartProps) {
  const { t } = useTranslation()
  const points: ChartPoint[] = useMemo(() => {
    return data.map((d, i) => ({
      day: d.day,
      label: formatDayShort(d.day),
      downloads: d.downloads,
      delta: i > 0 ? d.downloads - data[i - 1].downloads : null,
    }))
  }, [data])

  const visibleReleases = useMemo(() => {
    if (points.length === 0) return []
    const first = points[0].day
    const last = points[points.length - 1].day
    return releases.filter((r) => r.date >= first && r.date <= last)
  }, [releases, points])

  return (
    <Panel>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
          gap: 12,
          flexWrap: 'wrap',
        }}
      >
        <div style={{ fontFamily: FONT.sans, fontSize: 15, fontWeight: 600, color: COLORS.text }}>
          {t('stats.chart.title')}
        </div>
        {visibleReleases.length > 0 ? (
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            {visibleReleases.map((r) => (
              <span key={r.date} style={{ fontFamily: FONT.mono, fontSize: 11, color: COLORS.muted }}>
                <span style={{ color: COLORS.accent }}>│</span> {r.title}
              </span>
            ))}
          </div>
        ) : null}
      </div>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={points} margin={{ top: 12, right: 12, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="statsAreaFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={COLORS.accent} stopOpacity={0.45} />
                <stop offset="100%" stopColor={COLORS.accent} stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke={COLORS.grid} strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fill: COLORS.muted, fontSize: 11, fontFamily: FONT.mono }}
              axisLine={{ stroke: COLORS.border }}
              tickLine={false}
              minTickGap={24}
            />
            <YAxis
              tick={{ fill: COLORS.muted, fontSize: 11, fontFamily: FONT.mono }}
              axisLine={false}
              tickLine={false}
              width={40}
            />
            <Tooltip content={<ChartTooltip />} cursor={{ stroke: COLORS.muted, strokeDasharray: '3 3' }} />
            <Area
              type="monotone"
              dataKey="downloads"
              stroke={COLORS.accent}
              strokeWidth={2}
              fill="url(#statsAreaFill)"
              animationDuration={700}
            />
            {visibleReleases.map((r) => (
              <ReferenceLine
                key={r.date}
                x={formatDayShort(r.date)}
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
            <Brush
              dataKey="label"
              height={28}
              travellerWidth={8}
              stroke={COLORS.border}
              fill={COLORS.panel}
              tickFormatter={() => ''}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Panel>
  )
}
