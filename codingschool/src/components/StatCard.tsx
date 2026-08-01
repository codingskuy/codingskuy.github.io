import { type ReactNode } from 'react'
import { useCounter, useInView } from './hooks'

interface StatCardProps {
  icon: ReactNode
  label: string
  numVal: number
  suffix: string
}

function StatCard({ icon, label, numVal, suffix }: StatCardProps) {
  const { ref, inView } = useInView()
  const { ref: counterRef, count } = useCounter(numVal, 800)

  return (
    <div ref={ref} className="glow-border" style={{ background: '#161B22', border: '1px solid #30363D', borderRadius: 10, padding: '24px', textAlign: 'center', opacity: inView ? 1 : 0, transform: inView ? 'scale(1)' : 'scale(0.95)', transition: 'opacity 300ms ease-out, transform 300ms ease-out, box-shadow 250ms ease-out, border-color 250ms ease-out' }}>
      <div style={{ color: '#FF8C42', marginBottom: 12 }}>{icon}</div>
      <div ref={counterRef} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 24, fontWeight: 600, color: '#F0F6FC', marginBottom: 4 }}>
        {numVal > 0 ? `${count.toLocaleString()}${suffix}` : suffix}
      </div>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#8B949E' }}>
        {label}
      </div>
    </div>
  )
}

export default StatCard
