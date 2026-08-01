import { useState, type ReactNode } from 'react'
import { Check } from 'lucide-react'

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
  items?: string[]
}

function FeatureCard({ icon, title, description, items }: FeatureCardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? '#1C2128' : '#161B22',
        border: `1px solid ${hovered ? '#FF8C4233' : '#30363D'}`,
        borderRadius: 10,
        padding: '28px 28px 32px',
        transition: 'background 200ms ease-out, border-color 250ms ease-out, transform 200ms ease-out, box-shadow 250ms ease-out',
        cursor: 'default',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: hovered ? '0 0 24px rgba(255, 140, 66,0.08)' : '0 0 0 rgba(255, 140, 66,0)',
      }}
    >
      <div style={{ width: 40, height: 40, background: '#0D1117', border: '1px solid #30363D', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, color: '#FF8C42', transition: 'transform 200ms ease-out', transform: hovered ? 'scale(1.08)' : 'scale(1)' }}>
        {icon}
      </div>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 500, color: '#F0F6FC', marginBottom: 10 }}>
        {title}
      </div>
      <div style={{ color: '#8B949E', fontSize: 14, lineHeight: 1.65, marginBottom: items ? 20 : 0 }}>
        {description}
      </div>
      {items && (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {items.map((item, i) => (
            <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#8B949E', fontSize: 13, marginTop: 8, fontFamily: "'JetBrains Mono', monospace" }}>
              <Check size={13} style={{ color: '#3FB950', flexShrink: 0 }} />
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default FeatureCard
