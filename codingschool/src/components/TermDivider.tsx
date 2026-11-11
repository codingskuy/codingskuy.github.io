import { useInView } from './hooks'

function TermDivider() {
  const { ref, inView } = useInView()
  return (
    <div
      ref={ref}
      style={{
        height: 1,
        background: 'var(--border-strong)',
        margin: '64px 0',
        opacity: inView ? 1 : 0,
        transition: 'opacity 400ms ease-out',
      }}
    />
  )
}

export default TermDivider
