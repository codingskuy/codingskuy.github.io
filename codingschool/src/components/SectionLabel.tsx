import { useInView } from './hooks'

function SectionLabel({ text, dot = 'var(--accent)' }: { text: string; dot?: string }) {
  const { ref, inView } = useInView()
  return (
    <div
      ref={ref}
      style={{
        marginBottom: 20,
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(8px)',
        transition: 'opacity 300ms ease-out, transform 300ms ease-out',
      }}
    >
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 999,
          padding: '6px 12px 6px 10px',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 12,
          color: 'var(--muted)',
        }}
      >
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: dot, flexShrink: 0 }} />
        // {text}
      </span>
    </div>
  )
}

export default SectionLabel
