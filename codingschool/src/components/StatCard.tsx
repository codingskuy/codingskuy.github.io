import { type ReactNode } from 'react'
import { useCounter, useInView } from './hooks'

interface StatCardProps {
  icon: ReactNode
  iconBg: string
  iconColor: string
  label: string
  numVal: number
  suffix: string
}

function StatCard({ icon, iconBg, iconColor, label, numVal, suffix }: StatCardProps) {
  const { ref, inView } = useInView()
  const { ref: counterRef, count } = useCounter(numVal, 800)

  return (
    <div ref={ref} className="glow-border" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 24, opacity: inView ? 1 : 0, transform: inView ? 'scale(1)' : 'scale(0.95)', transition: 'opacity 300ms ease-out, transform 300ms ease-out, box-shadow 250ms ease-out, border-color 250ms ease-out' }}>
      <div style={{ width: 36, height: 36, borderRadius: 10, background: iconBg, color: iconColor, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>{icon}</div>
      <div ref={counterRef} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 36, fontWeight: 700, color: 'var(--text)', lineHeight: 1.1, marginBottom: 6 }}>
        {numVal > 0 ? `${count.toLocaleString()}${suffix}` : suffix}
      </div>
      <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--muted)' }}>
        {label}
      </div>
    </div>
  )
}

export default StatCard
