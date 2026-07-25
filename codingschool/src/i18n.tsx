import { createContext, useContext, useState, ReactNode } from 'react'
import en from './locales/en'
import id from './locales/id'
import ja from './locales/ja'
import zh from './locales/zh'

export type Locale = 'en' | 'id' | 'ja' | 'zh'

const translations: Record<Locale, Record<string, string>> = { en, id, ja, zh }

const LOCALE_KEY = 'codingschool-locale'
const DEFAULT_LOCALE: Locale = 'en'

function getInitialLocale(): Locale {
  try {
    const saved = localStorage.getItem(LOCALE_KEY)
    if (saved && saved in translations) return saved as Locale
  } catch {}
  return DEFAULT_LOCALE
}

interface I18nContextValue {
  locale: Locale
  setLocale: (l: Locale) => void
  t: (key: string) => string
}

const I18nContext = createContext<I18nContextValue>({
  locale: DEFAULT_LOCALE,
  setLocale: () => {},
  t: (k) => k,
})

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale)

  const setLocale = (l: Locale) => {
    setLocaleState(l)
    try { localStorage.setItem(LOCALE_KEY, l) } catch {}
  }

  const t = (key: string): string => {
    return translations[locale]?.[key] ?? translations.en[key] ?? key
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
