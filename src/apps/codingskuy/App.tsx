import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { MotionConfig } from "motion/react";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { JourneySection } from "./components/JourneySection";
import { useUi } from "./components/uiStrings";

const BelowFold = lazy(() => import("./components/BelowFold"));

const THEME_KEY = "cs-theme";

function getInitialDarkMode() {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === "dark") return true;
    if (saved === "light") return false;
  } catch {
    // Storage can be unavailable (private mode); fall through to the system setting.
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

// Sections below the fold mount after the first paint, so a link like
// /#community has nothing to land on until they exist.
function useDeferredHashScroll(ready: boolean) {
  useEffect(() => {
    if (!ready) return;
    const id = window.location.hash.slice(1);
    if (!id || id.startsWith("/")) return;
    document.getElementById(id)?.scrollIntoView();
  }, [ready]);
}

function Mounted({ onMount }: { onMount: () => void }) {
  useEffect(onMount, [onMount]);
  return null;
}

export default function App() {
  const ui = useUi();
  const [darkMode, setDarkMode] = useState(getInitialDarkMode);
  const [belowFoldReady, setBelowFoldReady] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    document.documentElement.style.colorScheme = darkMode ? "dark" : "light";
  }, [darkMode]);

  useDeferredHashScroll(belowFoldReady);
  const markBelowFoldReady = useCallback(() => setBelowFoldReady(true), []);

  const toggleDark = () =>
    setDarkMode((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(THEME_KEY, next ? "dark" : "light");
      } catch {
        // Ignore: the choice still applies for this visit.
      }
      return next;
    });

  return (
    <MotionConfig reducedMotion="user">
      <div
        className="cs-landing min-h-screen"
        style={{
          background: darkMode ? "#060b18" : "#f0f4ff",
          fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
        }}
      >
        <a
          href="#start"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-xl focus:bg-[#0055ff] focus:text-white focus:text-sm focus:font-semibold"
        >
          {ui.nav.skip}
        </a>
        <Navbar darkMode={darkMode} toggleDark={toggleDark} />

        <main>
          <HeroSection darkMode={darkMode} />
          <JourneySection darkMode={darkMode} />
          <Suspense fallback={<div className="min-h-screen" aria-hidden />}>
            <BelowFold darkMode={darkMode} />
            <Mounted onMount={markBelowFoldReady} />
          </Suspense>
        </main>
      </div>
    </MotionConfig>
  );
}
