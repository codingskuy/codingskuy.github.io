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
        background: '#161B22',
        border: '1px solid #30363D',
        borderRadius: 10,
        padding: '12px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 13,
        color: '#F0F6FC',
        zIndex: 200,
        animation: 'slide-in-right 200ms ease-out',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
      }}
    >
      <Check size={14} style={{ color: '#3FB950' }} />
      {message}
    </div>
  )
}

export default Toast
