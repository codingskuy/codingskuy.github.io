import type { CSSProperties, ReactNode } from 'react'
import { COLORS } from '../data/theme'

interface PanelProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
}

export default function Panel({ children, className, style }: PanelProps) {
  return (
    <div
      className={className}
      style={{
        background: COLORS.panel,
        border: `1px solid ${COLORS.border}`,
        borderRadius: 12,
        padding: 20,
        ...style,
      }}
    >
      {children}
    </div>
  )
}
