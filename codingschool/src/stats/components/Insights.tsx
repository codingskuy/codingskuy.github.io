import type { Insight } from '../types'
import { COLORS, FONT } from '../data/theme'

const TONE_COLOR = {
  positive: COLORS.green,
  neutral: COLORS.yellow,
  info: COLORS.accent,
} as const

const TONE_ICON = {
  positive: '▲',
  neutral: '◆',
  info: '●',
} as const

interface InsightsProps {
  insights: Insight[]
}

export default function Insights({ insights }: InsightsProps) {
  return (
    <div>
      <div
        style={{
          fontFamily: FONT.sans,
          fontSize: 15,
          fontWeight: 600,
          color: COLORS.text,
          marginBottom: 16,
        }}
      >
        Interesting Insights
      </div>
      <div className="stats-2col">
        {insights.map((i) => {
          const color = TONE_COLOR[i.tone]
          return (
            <div
              key={i.id}
              style={{
                background: COLORS.panel,
                border: `1px solid ${COLORS.border}`,
                borderLeft: `3px solid ${color}`,
                borderRadius: 10,
                padding: '14px 16px',
                fontFamily: FONT.sans,
                fontSize: 13.5,
                color: COLORS.text,
                lineHeight: 1.55,
                display: 'flex',
                gap: 12,
                alignItems: 'flex-start',
              }}
            >
              <span style={{ color, fontSize: 12, marginTop: 2, fontFamily: FONT.mono }}>
                {TONE_ICON[i.tone]}
              </span>
              {i.text}
            </div>
          )
        })}
      </div>
    </div>
  )
}
