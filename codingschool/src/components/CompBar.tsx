import { useEffect, useRef, useState } from 'react'

interface CompetencyBar {
  label: string
  value: number
  color?: string
}

function CompBar({ label, value, color = 'var(--accent)' }: CompetencyBar) {
  const ref = useRef<HTMLDivElement>(null)
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimated(true) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} style={{ marginBottom: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <span style={{ color: 'var(--text)', fontSize: 14, fontWeight: 500 }}>{label}</span>
        <span style={{ color: 'var(--muted)', fontSize: 13, fontFamily: "'JetBrains Mono', monospace" }}>{animated ? value : 0}%</span>
      </div>
      <div style={{ height: 8, background: 'var(--track)', borderRadius: 999, overflow: 'hidden' }}>
        <div
          style={{
            height: '100%',
            width: animated ? `${value}%` : 0,
            background: color,
            borderRadius: 999,
            transition: 'width 700ms cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        />
      </div>
    </div>
  )
}

export default CompBar
