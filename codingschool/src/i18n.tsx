import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import en from './locales/en'

export type Locale = 'en' | 'id' | 'ja' | 'zh'

type Dict = Record<string, string>

// Only English ships in the main bundle; other locales are split into their own chunks
const loaders: Record<Exclude<Locale, 'en'>, () => Promise<{ default: Dict }>> = {
  id: () => import('./locales/id'),
  ja: () => import('./locales/ja'),
  zh: () => import('./locales/zh'),
}

const translations: Partial<Record<Locale, Dict>> = { en }

const LOCALE_KEY = 'codingschool-locale'
const DEFAULT_LOCALE: Locale = 'en'

function isLocale(v: string): v is Locale {
  return v === 'en' || v in loaders
}

function getInitialLocale(): Locale {
  try {
    const saved = localStorage.getItem(LOCALE_KEY)
    if (saved && isLocale(saved)) return saved
  } catch {}
  return DEFAULT_LOCALE
}

interface I18nContextValue {
  locale: Locale
  setLocale: (l: Locale) => void
  t: (key: string, vars?: Record<string, string | number>) => string
}

const I18nContext = createContext<I18nContextValue>({
  locale: DEFAULT_LOCALE,
  setLocale: () => {},
  t: (k) => k,
})

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale)
  // Bumped when a locale chunk finishes loading so consumers re-render
  const [, setLoaded] = useState(0)

  useEffect(() => {
    document.documentElement.lang = locale
    if (translations[locale] || locale === 'en') return
    let cancelled = false
    loaders[locale]().then((mod) => {
      translations[locale] = mod.default
      if (!cancelled) setLoaded((n) => n + 1)
    })
    return () => {
      cancelled = true
    }
  }, [locale])

  const setLocale = (l: Locale) => {
    setLocaleState(l)
    try { localStorage.setItem(LOCALE_KEY, l) } catch {}
  }

  const t = (key: string, vars?: Record<string, string | number>): string => {
    let str = translations[locale]?.[key] ?? en[key] ?? key
    if (vars) {
      for (const [k, v] of Object.entries(vars)) {
        str = str.replaceAll(`{${k}}`, String(v))
      }
    }
    return str
  }

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useTranslation() {
  return useContext(I18nContext)
}

export const LOCALES: { code: Locale; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'id', label: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
  { code: 'zh', label: '中文', flag: '🇨🇳' },
]
