import type { ReactNode } from 'react'
import { COLORS, FONT } from '../data/theme'

interface SectionShellProps {
  id?: string
  label: string
  title: string
  subtitle?: string
  action?: ReactNode
  children: ReactNode
}

export default function SectionShell({
  id,
  label,
  title,
  subtitle,
  action,
  children,
}: SectionShellProps) {
  return (
    <section
      id={id}
      style={{
        padding: '96px 24px',
        maxWidth: 1160,
        margin: '0 auto',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          gap: 24,
          flexWrap: 'wrap',
          marginBottom: 40,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: FONT.mono,
              fontSize: 12,
              color: COLORS.muted,
              marginBottom: 20,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: COLORS.panel,
              border: `1px solid ${COLORS.border}`,
              borderRadius: 999,
              padding: '6px 12px 6px 10px',
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: COLORS.accent }} />
            // {label}
          </div>
          <h2
            style={{
              fontFamily: FONT.sans,
              fontSize: 'clamp(28px, 4vw, 44px)',
              fontWeight: 700,
              color: COLORS.text,
              margin: 0,
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
            }}
          >
            {title}
          </h2>
          {subtitle ? (
            <p
              style={{
                fontFamily: FONT.sans,
                fontSize: 18,
                color: COLORS.muted,
                margin: '16px 0 0',
                maxWidth: 640,
                lineHeight: 1.6,
              }}
            >
              {subtitle}
            </p>
          ) : null}
        </div>
        {action ? <div>{action}</div> : null}
      </div>
      {children}
    </section>
  )
}
