import { motion, AnimatePresence } from "motion/react";
import { Languages, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLanguage, type Language } from "../contexts/LanguageContext";

const ONBOARDING_KEY = "rk-language-highlight-seen";

const copy: Record<Language, {
  label: string;
  hintTitle: string;
  hintBody: string;
  close: string;
}> = {
  id: {
    label: "Bahasa",
    hintTitle: "Pilih bahasa favoritmu",
    hintBody: "Sekarang halaman ini mendukung Indonesia, English, 中文, dan 日本語.",
    close: "Tutup",
  },
  en: {
    label: "Language",
    hintTitle: "Pick your preferred language",
    hintBody: "This page supports Indonesia, English, 中文, and 日本語.",
    close: "Close",
  },
  zh: {
    label: "语言",
    hintTitle: "选择你偏好的语言",
    hintBody: "此页面支持 Indonesia、English、中文 和 日本語。",
    close: "关闭",
  },
  ja: {
    label: "言語",
    hintTitle: "表示言語を選択",
    hintBody: "このページは Indonesia・English・中文・日本語 に対応しています。",
    close: "閉じる",
  },
};

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { language, setLanguage, options } = useLanguage();
  const [open, setOpen] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const text = copy[language];

  useEffect(() => {
    const seen = localStorage.getItem(ONBOARDING_KEY) === "1";
    if (!seen) {
      setShowIntro(true);
      localStorage.setItem(ONBOARDING_KEY, "1");
      const timer = window.setTimeout(() => setShowIntro(false), 6000);
      return () => window.clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const closeOnOutside = (event: MouseEvent) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", closeOnOutside);
    return () => document.removeEventListener("mousedown", closeOnOutside);
  }, []);

  const current = options.find((option) => option.code === language);

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      <motion.button
        type="button"
        onClick={() => {
          setOpen((prev) => !prev);
          setShowIntro(false);
        }}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={text.label}
        whileTap={{ scale: 0.96 }}
        className={`relative h-9 rounded-lg border border-slate-200 dark:border-white/[0.08] bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.06] dark:hover:bg-white/[0.12] px-3 text-xs text-slate-700 dark:text-slate-300 inline-flex items-center gap-2 transition-all ${
          showIntro ? "ring-2 ring-blue-400/80 dark:ring-blue-400/60 shadow-lg shadow-blue-500/20" : ""
        }`}
      >
        {showIntro && (
          <span className="absolute -inset-1 rounded-xl border border-blue-400/60 animate-pulse pointer-events-none" />
        )}
        <Languages className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">{text.label}</span>
        <span className="font-medium">{current?.nativeLabel ?? "Indonesia"}</span>
      </motion.button>

      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="absolute right-0 top-12 z-[60] w-72 rounded-xl border border-blue-200 dark:border-blue-500/40 bg-white dark:bg-[#0e1120] p-3 shadow-xl"
          >
            <div className="flex items-start gap-2">
              <Sparkles className="w-4 h-4 mt-0.5 text-blue-500" />
              <div>
                <p className="text-sm text-slate-900 dark:text-white">{text.hintTitle}</p>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{text.hintBody}</p>
              </div>
              <button
                type="button"
                onClick={() => setShowIntro(false)}
                aria-label={text.close}
                className="ml-auto p-1 rounded-md hover:bg-slate-100 dark:hover:bg-white/[0.06]"
              >
                <X className="w-3.5 h-3.5 text-slate-500" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-12 z-[60] min-w-[190px] rounded-xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0e1120] shadow-xl overflow-hidden"
          >
            {options.map((option) => {
              const active = option.code === language;
              return (
                <button
                  key={option.code}
                  type="button"
                  onClick={() => {
                    setLanguage(option.code);
                    setOpen(false);
                    setShowIntro(false);
                  }}
                  className={`w-full text-left px-3 py-2.5 text-sm transition-colors ${
                    active
                      ? "bg-blue-50 text-blue-700 dark:bg-blue-500/15 dark:text-blue-200"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.06]"
                  }`}
                >
                  <span>{option.nativeLabel}</span>
                  <span className="ml-2 text-xs text-slate-400">({option.label})</span>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
