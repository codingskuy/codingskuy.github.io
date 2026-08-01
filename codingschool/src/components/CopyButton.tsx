import { Check, Copy } from 'lucide-react'
import { useCopyToClipboard } from './hooks'

function CopyButton({ text, className = '' }: { text: string; className?: string }) {
  const { copied, copy } = useCopyToClipboard()

  return (
    <button
      onClick={() => copy(text)}
      className={className}
      style={{
        background: copied ? 'rgba(63,185,80,0.12)' : 'rgba(139,148,158,0.08)',
        border: 'none',
        borderRadius: 6,
        padding: 5,
        cursor: 'pointer',
        color: copied ? '#3FB950' : '#8B949E',
        transition: 'background 150ms, color 150ms',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      aria-label="Copy to clipboard"
    >
      {copied ? <Check size={13} /> : <Copy size={13} />}
    </button>
  )
}

export default CopyButton
