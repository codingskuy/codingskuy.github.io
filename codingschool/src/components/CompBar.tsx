import { useEffect, useRef, useState } from 'react'

interface CompetencyBar {
  label: string
  value: number
  color?: string
}

function CompBar({ label, value, color = '#FF8C42' }: CompetencyBar) {
  const ref = useRef<HTMLDivElement>(null)
  const [animated, setAnimated] = useState(false)
  const [displayCount, setDisplayCount] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimated(true) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!animated) return
    const blocks = 10
    const filled = Math.round((value / 100) * blocks)
    let current = 0
    const interval = setInterval(() => {
      current++
      setDisplayCount(current)
      if (current >= filled) clearInterval(interval)
    }, 40)
    return () => clearInterval(interval)
  }, [animated, value])

  const blocks = 10

  return (
    <div ref={ref} style={{ marginBottom: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ color: '#8B949E', fontSize: 13, fontFamily: "'JetBrains Mono', monospace" }}>{label}</span>
        <span style={{ color: '#8B949E', fontSize: 12, fontFamily: "'JetBrains Mono', monospace" }}>{animated ? value : 0}%</span>
      </div>
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 15,
          letterSpacing: 2,
          color: color,
        }}
      >
        {Array.from({ length: blocks }, (_, i) =>
          i < displayCount ? '█' : '░'
        ).join('')}
      </div>
    </div>
  )
}

export default CompBar
