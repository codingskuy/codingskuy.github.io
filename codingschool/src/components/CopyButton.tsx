import { Check, Copy } from 'lucide-react'
import { useCopyToClipboard } from './hooks'
import { useTranslation } from '../i18n'

function CopyButton({ text, className = '', dark = false }: { text: string; className?: string; dark?: boolean }) {
  const { copied, copy } = useCopyToClipboard()
  const { t } = useTranslation()
  const idle = dark ? { background: '#3A332B', color: '#C9D1D9' } : { background: 'rgba(107,97,85,0.08)', color: 'var(--muted)' }
  const done = dark ? { background: 'rgba(63, 185, 80, 0.15)', color: '#3FB950' } : { background: 'rgba(26, 143, 68, 0.12)', color: 'var(--green)' }

  return (
    <button
      onClick={() => copy(text)}
      className={className}
      style={{
        ...(copied ? done : idle),
        border: 'none',
        borderRadius: 8,
        padding: 6,
        cursor: 'pointer',
        transition: 'background 150ms, color 150ms',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      aria-label={t('common.copied')}
    >
      {copied ? <Check size={13} /> : <Copy size={13} />}
    </button>
  )
}

export default CopyButton
