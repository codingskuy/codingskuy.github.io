import { useInView } from './hooks'

function SectionLabel({ text }: { text: string }) {
  const { ref, inView } = useInView()
  return (
    <div
      ref={ref}
      style={{
        marginBottom: 16,
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(8px)',
        transition: 'opacity 300ms ease-out, transform 300ms ease-out',
      }}
    >
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 12,
          color: '#8B949E',
          letterSpacing: 1,
        }}
      >
        // {text}
      </span>
    </div>
  )
}

export default SectionLabel
