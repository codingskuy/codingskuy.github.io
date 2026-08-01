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
              letterSpacing: 1,
              marginBottom: 12,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span style={{ color: COLORS.accent }}>{`{ }`}</span>
            {label}
          </div>
          <h2
            style={{
              fontFamily: FONT.sans,
              fontSize: 32,
              fontWeight: 700,
              color: COLORS.text,
              margin: 0,
            }}
          >
            {title}
          </h2>
          {subtitle ? (
            <p
              style={{
                fontFamily: FONT.sans,
                fontSize: 15,
                color: COLORS.muted,
                margin: '10px 0 0',
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
