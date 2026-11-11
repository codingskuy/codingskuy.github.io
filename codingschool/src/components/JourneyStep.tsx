import { useInView } from './hooks'

function JourneyStep({
  step,
  label,
  desc,
  isLast,
  index = 0,
}: {
  step: string
  label: string
  desc: string
  isLast?: boolean
  index?: number
}) {
  const { ref, inView } = useInView()

  return (
    <div
      ref={ref}
      className="interact-hover"
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 18,
        background: 'var(--surface)',
        border: `1px solid ${isLast ? 'rgba(232, 101, 15, 0.35)' : 'var(--border)'}`,
        borderRadius: 16,
        padding: '20px 22px',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(12px)',
        transition: `opacity 300ms ease-out ${index * 80}ms, transform 300ms ease-out ${index * 80}ms`,
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 12,
          background: isLast ? 'var(--accent)' : 'var(--surface-2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, fontWeight: 700, color: isLast ? '#FBF7F1' : 'var(--text)' }}>
          {step}
        </span>
      </div>
      <div>
        <div style={{ fontSize: 18, fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>{label}</div>
        <div style={{ color: 'var(--muted)', fontSize: 15, lineHeight: 1.6 }}>{desc}</div>
      </div>
    </div>
  )
}

export default JourneyStep
