import { useEffect } from 'react'
import { Check } from 'lucide-react'

function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 2200)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 32,
        right: 32,
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 10,
        padding: '12px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 13,
        color: 'var(--text)',
        zIndex: 200,
        animation: 'slide-in-right 200ms ease-out',
        boxShadow: '0 8px 32px rgba(35,30,25,0.12)',
      }}
    >
      <Check size={14} style={{ color: 'var(--green)' }} />
      {message}
    </div>
  )
}

export default Toast
