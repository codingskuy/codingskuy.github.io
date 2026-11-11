import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTranslation } from './i18n'

type Theme = 'light' | 'dark'
const STORAGE_KEY = 'cs-theme'

function getInitialTheme(): Theme {
  const attr = document.documentElement.dataset.theme
  if (attr === 'dark' || attr === 'light') return attr
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function ThemeToggle() {
  const { t } = useTranslation()
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      // storage unavailable (private mode) — theme still applies for this visit
    }
  }, [theme])

  const isDark = theme === 'dark'
  const label = isDark ? t('aria.themeLight') : t('aria.themeDark')

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={label}
      title={label}
      className="interact-press"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 34,
        height: 34,
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 999,
        cursor: 'pointer',
        color: 'var(--muted)',
        transition: 'background 150ms, color 150ms, border-color 150ms',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(232,101,15,0.35)'
        e.currentTarget.style.color = 'var(--text)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--border)'
        e.currentTarget.style.color = 'var(--muted)'
      }}
    >
      {isDark ? <Sun size={15} /> : <Moon size={15} />}
    </button>
  )
}

export default ThemeToggle
