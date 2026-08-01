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
      style={{
        display: 'flex',
        gap: 20,
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(12px)',
        transition: `opacity 300ms ease-out ${index * 80}ms, transform 300ms ease-out ${index * 80}ms`,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div
          style={{
            width: 36,
            height: 36,
            border: '1px solid #30363D',
            borderRadius: '50%',
            background: '#161B22',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            transition: 'border-color 200ms ease-out, box-shadow 200ms ease-out',
          }}
        >
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#FF8C42' }}>
            {step}
          </span>
        </div>
        {!isLast && (
          <div
            style={{
              width: 1,
              flex: 1,
              background: inView ? '#FF8C42' : '#30363D',
              margin: '6px 0',
              minHeight: 40,
              transition: 'background 400ms ease-out',
            }}
          />
        )}
      </div>
      <div style={{ paddingBottom: isLast ? 0 : 32 }}>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 14,
            color: '#F0F6FC',
            marginBottom: 6,
          }}
        >
          {label}
        </div>
        <div style={{ color: '#8B949E', fontSize: 14, lineHeight: 1.6 }}>{desc}</div>
      </div>
    </div>
  )
}

export default JourneyStep
