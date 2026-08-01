import type { TrendScore as TrendScoreType } from '../types'
import { COLORS, FONT, TREND_META } from '../data/theme'
import Panel from './Panel'

const R = 54
const C = 2 * Math.PI * R

interface TrendScoreProps {
  score: TrendScoreType
}

export default function TrendScore({ score }: TrendScoreProps) {
  const meta = TREND_META[score.bucket]
  const pct = Math.round(score.value * 100)
  return (
    <Panel style={{ display: 'flex', alignItems: 'center', gap: 28, flexWrap: 'wrap' }}>
      <svg width={140} height={140} viewBox="0 0 140 140">
        <circle
          cx={70}
          cy={70}
          r={R}
          fill="none"
          stroke={COLORS.panelAlt}
          strokeWidth={12}
        />
        <circle
          cx={70}
          cy={70}
          r={R}
          fill="none"
          stroke={meta.color}
          strokeWidth={12}
          strokeDasharray={`${C * score.value} ${C}`}
          strokeLinecap="round"
          transform="rotate(-90 70 70)"
          style={{ transition: 'stroke-dasharray 900ms ease-out' }}
        />
        <text
          x={70}
          y={64}
          textAnchor="middle"
          style={{
            fill: COLORS.text,
            fontFamily: FONT.sans,
            fontSize: 26,
            fontWeight: 700,
          }}
        >
          {pct}
        </text>
        <text
          x={70}
          y={82}
          textAnchor="middle"
          style={{
            fill: COLORS.muted,
            fontFamily: FONT.mono,
            fontSize: 10,
            letterSpacing: 2,
          }}
        >
          TREND
        </text>
      </svg>
      <div>
        <div style={{ fontSize: 30, marginBottom: 6 }}>{meta.emoji}</div>
        <div
          style={{
            fontFamily: FONT.sans,
            fontSize: 20,
            fontWeight: 700,
            color: meta.color,
          }}
        >
          {meta.label}
        </div>
        <div
          style={{
            fontFamily: FONT.mono,
            fontSize: 11,
            color: COLORS.muted,
            marginTop: 8,
            lineHeight: 1.7,
          }}
        >
          growth {Math.round(score.growth * 100)}% · moving avg {Math.round(score.movingAverage * 100)}% · peak{' '}
          {Math.round(score.peak * 100)}%
        </div>
        <div
          style={{
            fontFamily: FONT.mono,
            fontSize: 10,
            color: COLORS.muted,
            opacity: 0.8,
          }}
        >
          0.5·growth + 0.3·avg + 0.2·peak
        </div>
      </div>
    </Panel>
  )
}
