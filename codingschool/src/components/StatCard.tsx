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

const compact = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, '')}k` : String(n))

function StatCard({ icon, iconBg, iconColor, label, numVal, suffix }: StatCardProps) {
  const { ref, inView } = useInView()
  const { ref: counterRef, count } = useCounter(numVal, 800)

  return (
    <div ref={ref} className="glow-border" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 28, display: 'flex', flexDirection: 'column', gap: 16, minWidth: 0, opacity: inView ? 1 : 0, transform: inView ? 'scale(1)' : 'scale(0.95)', transition: 'opacity 300ms ease-out, transform 300ms ease-out, box-shadow 250ms ease-out, border-color 250ms ease-out' }}>
      <div style={{ width: 36, height: 36, borderRadius: 10, background: iconBg, color: iconColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {icon}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div ref={counterRef} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 36, fontWeight: 700, color: 'var(--text)', lineHeight: 1.33, letterSpacing: '-0.03em' }}>
          {numVal > 0 ? `${compact(count)}${suffix}` : suffix}
        </div>
        <div style={{ color: 'var(--muted)', fontSize: 14, fontWeight: 500 }}>{label}</div>
      </div>
    </div>
  )
}

export default StatCard
