import { COLORS, FONT } from '../data/theme'
import Panel from './Panel'

interface StatePanelProps {
  kind: 'loading' | 'error' | 'empty'
  message?: string
  onRetry?: () => void
}

export default function StatePanel({ kind, message, onRetry }: StatePanelProps) {
  const config = {
    loading: { title: 'Fetching downloads…', emoji: '⏳' },
    error: { title: 'Failed to load data', emoji: '⚠️' },
    empty: { title: 'No data yet', emoji: '📭' },
  }[kind]

  return (
    <Panel style={{ textAlign: 'center', padding: '48px 24px' }}>
      <div style={{ fontSize: 32, marginBottom: 12 }}>{config.emoji}</div>
      <div
        style={{
          fontFamily: FONT.sans,
          fontSize: 16,
          fontWeight: 600,
          color: COLORS.text,
          marginBottom: 8,
        }}
      >
        {config.title}
      </div>
      {message ? (
        <div
          style={{
            fontFamily: FONT.mono,
            fontSize: 12,
            color: COLORS.muted,
            marginBottom: 16,
          }}
        >
          {message}
        </div>
      ) : null}
      {kind === 'loading' ? (
        <div
          style={{
            fontFamily: FONT.mono,
            fontSize: 12,
            color: COLORS.accent,
          }}
        >
          {'.'.repeat(1)}
        </div>
      ) : null}
      {kind === 'error' && onRetry ? (
        <button
          onClick={onRetry}
          style={{
            background: COLORS.accent,
            color: COLORS.bg,
            border: 'none',
            borderRadius: 8,
            padding: '8px 20px',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: FONT.sans,
          }}
        >
          Retry
        </button>
      ) : null}
    </Panel>
  )
}
