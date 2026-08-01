import type { Milestone } from '../types'
import { COLORS, FONT } from '../data/theme'
import { formatDayShort } from '../utils/date'
import Panel from './Panel'

const MEDALS: Record<number, string> = {
  100: '🥉',
  500: '🥈',
  1000: '🥇',
  5000: '💎',
  10000: '👑',
}

interface MilestonesProps {
  milestones: Milestone[]
}

export default function Milestones({ milestones }: MilestonesProps) {
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
        Milestones
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {milestones.map((m, i) => {
          const reached = m.reachedAt !== null
          const color = reached ? COLORS.green : COLORS.muted
          return (
            <div
              key={m.threshold}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                padding: '12px 0',
                borderTop: i === 0 ? 'none' : `1px solid ${COLORS.border}`,
              }}
            >
              <span style={{ fontSize: 20 }}>{MEDALS[m.threshold] ?? '🏆'}</span>
              <div
                style={{
                  fontFamily: FONT.sans,
                  fontSize: 15,
                  fontWeight: 600,
                  color: COLORS.text,
                  width: 90,
                }}
              >
                {m.threshold.toLocaleString()}
              </div>
              <div
                style={{
                  flex: 1,
                  fontFamily: FONT.mono,
                  fontSize: 12,
                  color,
                  textAlign: 'right',
                }}
              >
                {reached
                  ? `${formatDayShort(m.reachedAt as string)} · day ${m.daysToReach}`
                  : 'In progress'}
              </div>
            </div>
          )
        })}
      </div>
    </Panel>
  )
}
