import { useInView } from './hooks'

function TermDivider() {
  const { ref, inView } = useInView()
  return (
    <div
      ref={ref}
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 13,
        color: '#30363D',
        margin: '64px 0',
        letterSpacing: 1,
        userSelect: 'none',
        opacity: inView ? 1 : 0,
        transition: 'opacity 400ms ease-out',
      }}
    >
    </div>
  )
}

export default TermDivider
