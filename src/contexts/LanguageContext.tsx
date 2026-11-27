import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Language = "id" | "en" | "zh" | "ja";

export type LanguageOption = {
  code: Language;
  label: string;
  nativeLabel: string;
};

const STORAGE_KEY = "rk-language";

const seoByLanguage: Record<Language, { title: string; description: string; ogLocale: string }> = {
  id: {
    title: "CodingSkuy! | Belajar Teknologi Harusnya Menyenangkan",
    description:
      "CodingSkuy — jurnal belajar dan repositori engineering terbuka. Tutorial, proyek nyata, dan panduan karir untuk developer Indonesia.",
    ogLocale: "id_ID",
  },
  en: {
    title: "CodingSkuy! | Learning Technology Should Be Fun",
    description:
      "CodingSkuy — an open learning journal and engineering repository. Tutorials, real projects, and career guides for Indonesian developers.",
    ogLocale: "en_US",
  },
  zh: {
    title: "CodingSkuy! | 学习技术应该很有趣",
    description: "CodingSkuy——开放的学习日志与工程知识库：教程、真实项目与开发者职业指南。",
    ogLocale: "zh_CN",
  },
  ja: {
    title: "CodingSkuy! | テクノロジー学習は楽しくあるべき",
    description: "CodingSkuy — オープンな学習ジャーナルとエンジニアリングリポジトリ。チュートリアル、実プロジェクト、キャリアガイド。",
    ogLocale: "ja_JP",
  },
};

const isLanguage = (value: string | null | undefined): value is Language =>
  value === "id" || value === "en" || value === "zh" || value === "ja";

// A saved choice wins; otherwise follow the browser so Indonesian visitors
// land on Indonesian copy instead of having to find the switcher first.
function getInitialLanguage(): Language {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (isLanguage(saved)) return saved;
  } catch {
    // Storage unavailable; fall back to the browser language.
  }
  for (const tag of navigator.languages ?? [navigator.language]) {
    const base = tag.toLowerCase().split("-")[0];
    if (isLanguage(base)) return base;
  }
  return "en";
}

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { code: "id", label: "Indonesian", nativeLabel: "Indonesia" },
  { code: "en", label: "English", nativeLabel: "English" },
  { code: "zh", label: "Chinese", nativeLabel: "中文" },
  { code: "ja", label: "Japanese", nativeLabel: "日本語" },
];

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  options: LanguageOption[];
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // Ignore: the choice still applies for this visit.
    }
    document.documentElement.lang = language;

    const seo = seoByLanguage[language];
    document.title = seo.title;

    const descriptionEl = document.querySelector('meta[name="description"]');
    if (descriptionEl) descriptionEl.setAttribute("content", seo.description);

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", seo.title);

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute("content", seo.description);

    const ogLocale = document.querySelector('meta[property="og:locale"]');
    if (ogLocale) ogLocale.setAttribute("content", seo.ogLocale);
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage: (nextLanguage: Language) => setLanguageState(nextLanguage),
      options: LANGUAGE_OPTIONS,
    }),
    [language],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
