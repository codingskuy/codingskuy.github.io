import { useState, useRef, useEffect } from 'react'
import { useTranslation, LOCALES, Locale } from './i18n'
import { Globe, ChevronDown } from 'lucide-react'

export function LanguageSwitcher() {
  const { locale, setLocale } = useTranslation()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const current = LOCALES.find((l) => l.code === locale)!

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          background: open ? '#1C2128' : 'transparent',
          border: '1px solid #30363D',
          borderRadius: 8,
          padding: '6px 10px',
          cursor: 'pointer',
          color: '#8B949E',
          fontSize: 13,
          fontFamily: "'JetBrains Mono', monospace",
          transition: 'background 150ms, color 150ms, border-color 150ms',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = '#FF8C4244'
          e.currentTarget.style.color = '#F0F6FC'
        }}
        onMouseLeave={(e) => {
          if (!open) {
            e.currentTarget.style.borderColor = '#30363D'
            e.currentTarget.style.color = '#8B949E'
          }
        }}
      >
        <Globe size={14} />
        <span>{current.flag}</span>
        <ChevronDown size={12} style={{ transform: open ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 200ms' }} />
      </button>

      {open && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            right: 0,
            marginTop: 6,
            background: '#161B22',
            border: '1px solid #30363D',
            borderRadius: 8,
            padding: '4px',
            minWidth: 180,
            zIndex: 200,
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            animation: 'slide-in-right 150ms ease-out',
          }}
        >
          {LOCALES.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                setLocale(l.code as Locale)
                setOpen(false)
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                width: '100%',
                background: locale === l.code ? 'rgba(255,140,66,0.1)' : 'transparent',
                border: 'none',
                borderRadius: 6,
                padding: '8px 12px',
                cursor: 'pointer',
                color: locale === l.code ? '#FF8C42' : '#8B949E',
                fontSize: 13,
                fontFamily: "'JetBrains Mono', monospace",
                textAlign: 'left',
                transition: 'background 150ms, color 150ms',
              }}
              onMouseEnter={(e) => {
                if (locale !== l.code) {
                  e.currentTarget.style.background = '#1C2128'
                  e.currentTarget.style.color = '#F0F6FC'
                }
              }}
              onMouseLeave={(e) => {
                if (locale !== l.code) {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = '#8B949E'
                }
              }}
            >
              <span>{l.flag}</span>
              <span>{l.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
