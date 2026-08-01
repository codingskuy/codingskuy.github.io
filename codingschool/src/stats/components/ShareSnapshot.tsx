import { useState, type RefObject } from 'react'
import { toPng } from 'html-to-image'
import { Camera, Check } from 'lucide-react'
import { COLORS, FONT } from '../data/theme'
import { useTranslation } from '../../i18n'

interface ShareSnapshotProps {
  node: RefObject<HTMLElement | null>
}

export default function ShareSnapshot({ node }: ShareSnapshotProps) {
  const { t } = useTranslation()
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState(false)

  const handleClick = async (): Promise<void> => {
    const el = node.current
    if (!el || busy) return
    setBusy(true)
    try {
      const dataUrl = await toPng(el, {
        backgroundColor: COLORS.bg,
        pixelRatio: 2,
      })
      const link = document.createElement('a')
      link.download = `codingschool-stats-${new Date().toISOString().slice(0, 10)}.png`
      link.href = dataUrl
      link.click()
      setDone(true)
      setTimeout(() => setDone(false), 2500)
    } catch (e) {
      console.error('Failed to export snapshot', e)
    } finally {
      setBusy(false)
    }
  }

  return (
    <button
      onClick={() => void handleClick()}
      disabled={busy}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        background: done ? 'rgba(63,185,80,0.15)' : COLORS.accent,
        color: done ? COLORS.green : COLORS.bg,
        border: done ? `1px solid ${COLORS.green}` : 'none',
        borderRadius: 8,
        padding: '8px 16px',
        fontSize: 13,
        fontWeight: 600,
        cursor: busy ? 'default' : 'pointer',
        fontFamily: FONT.sans,
        transition: 'filter 150ms ease-out',
        opacity: busy ? 0.7 : 1,
      }}
    >
      {done ? <Check size={14} /> : <Camera size={14} />}
      {busy ? t('stats.share.busy') : done ? t('stats.share.saved') : t('stats.share')}
    </button>
  )
}
