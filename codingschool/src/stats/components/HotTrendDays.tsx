import type { HotTrendDay } from '../types'
import { BADGE_META, COLORS, FONT } from '../data/theme'
import { formatDayShort } from '../utils/date'
import { useTranslation } from '../../i18n'
import Panel from './Panel'

interface HotTrendDaysProps {
  days: HotTrendDay[]
}

export default function HotTrendDays({ days }: HotTrendDaysProps) {
  const { t } = useTranslation()
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
        {t('stats.hot.title')}
      </div>
      {days.length === 0 ? (
        <div style={{ fontFamily: FONT.mono, fontSize: 12, color: COLORS.muted }}>
          {t('stats.hot.empty')}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {days.map((d, i) => {
            const meta = BADGE_META[d.badge]
            return (
              <div
                key={d.day}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '12px 0',
                  borderTop: i === 0 ? 'none' : `1px solid ${COLORS.border}`,
                }}
              >
                <div style={{ fontFamily: FONT.mono, fontSize: 12, color: COLORS.muted, width: 64 }}>
                  {formatDayShort(d.day)}
                </div>
                <div
                  style={{
                    fontFamily: FONT.sans,
                    fontSize: 18,
                    fontWeight: 700,
                    color: COLORS.text,
                    width: 64,
                    textAlign: 'right',
                  }}
                >
                  {d.downloads}
                </div>
                <div
                  style={{
                    fontFamily: FONT.mono,
                    fontSize: 11,
                    color: COLORS.green,
                    width: 70,
                    textAlign: 'right',
                  }}
                >
                  {d.growthPct !== null && d.growthPct > 0 ? `+${Math.round(d.growthPct)}%` : ''}
                </div>
                <span
                  style={{
                    marginLeft: 'auto',
                    background: `${meta.color}1f`,
                    color: meta.color,
                    border: `1px solid ${meta.color}55`,
                    borderRadius: 999,
                    padding: '3px 10px',
                    fontSize: 11,
                    fontFamily: FONT.sans,
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {meta.emoji} {t(`stats.hot.badge.${meta.badge}`)}
                </span>
              </div>
            )
          })}
        </div>
      )}
    </Panel>
  )
}
