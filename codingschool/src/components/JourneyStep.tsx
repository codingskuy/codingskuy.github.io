import { useInView } from './hooks'

function JourneyStep({
  step,
  label,
  desc,
  highlight = false,
  index = 0,
}: {
  step: string
  label: string
  desc: string
  highlight?: boolean
  index?: number
}) {
  const { ref, inView } = useInView()

  return (
    <div
      ref={ref}
      className="glow-border"
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 20,
        padding: '24px 28px 24px 24px',
        background: 'var(--surface)',
        border: `1px solid ${highlight ? 'color-mix(in srgb, var(--accent) 35%, transparent)' : 'var(--border)'}`,
        borderRadius: 16,
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(12px)',
        transition: `opacity 300ms ease-out ${index * 80}ms, transform 300ms ease-out ${index * 80}ms, box-shadow 250ms ease-out, border-color 250ms ease-out`,
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          background: highlight ? 'var(--accent)' : 'var(--surface-2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 14,
          fontWeight: 700,
          color: highlight ? '#FBF7F1' : 'var(--text)',
        }}
      >
        {step}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 0 }}>
        <div style={{ fontSize: 18, fontWeight: 600, color: 'var(--text)', lineHeight: 1.2 }}>{label}</div>
        <div style={{ color: 'var(--muted)', fontSize: 15, lineHeight: 1.55 }}>{desc}</div>
      </div>
    </div>
  )
}

export default JourneyStep
