import { useState, useEffect } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import logo from "@/assets/ic_logo_codingskuy.png";
import { useT } from "@/hooks/useT";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

interface NavbarProps {
  darkMode: boolean;
  toggleDark: () => void;
}

export function Navbar({ darkMode, toggleDark }: NavbarProps) {
  const t = useT();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: t.nav.about, href: "#about" },
    { label: t.nav.activity, href: "#activity" },
    { label: t.nav.learning, href: "#learning" },
    { label: t.nav.philosophy, href: "#philosophy" },
    { label: t.nav.projects, href: "#portfolio" },
    { label: t.nav.media, href: "#media" },
    { label: t.nav.ailab, href: "#ailab" },
    { label: t.nav.community, href: "#community" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setMobileOpen(false);
    const id = href.replace("#", "");
    if (id === "top" || id === "") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? darkMode
            ? "bg-[#060b18]/90 backdrop-blur-xl border-b border-[#3d8bff]/15 shadow-lg shadow-[#0055ff]/5"
            : "bg-white/90 backdrop-blur-xl border-b border-[#0055ff]/10 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#top" onClick={(e) => { e.preventDefault(); scrollToSection("#top"); }} className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl overflow-hidden shadow-lg shadow-[#0055ff]/30 group-hover:shadow-[#0055ff]/50 transition-shadow">
              <img src={logo} alt="CodingSkuy" className="w-full h-full object-cover" />
            </div>
              <div className="flex flex-col -gap-0.5">
                <span className="text-sm font-bold leading-tight" style={{ color: "#3d8bff" }}>
                  CodingSkuy!
                </span>
                <span className="text-xs font-semibold leading-tight" style={{ color: darkMode ? "#e8f0ff" : "#0d1117" }}>
                  Driven Engineering
                </span>
              </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className={`px-3 py-1.5 rounded-lg text-sm transition-all duration-200 hover:bg-[#3d8bff]/10 hover:text-[#3d8bff] ${
                  darkMode ? "text-[#7c8db5]" : "text-[#64748b]"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher className="hidden md:block" />

            <button
              onClick={toggleDark}
              className={`p-2 rounded-lg transition-all hover:scale-110 ${
                darkMode ? "hover:bg-[#131e38] text-[#ffd700]" : "hover:bg-[#f1f5f9] text-[#0055ff]"
              }`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#contact");
              }}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-[#0055ff] to-[#00d4ff] text-white shadow-lg shadow-[#0055ff]/25 hover:shadow-[#0055ff]/40 hover:scale-105 transition-all duration-200"
            >
              {t.nav.hireMe}
            </a>

            <LanguageSwitcher className="md:hidden" />

            <button
              className={`md:hidden p-2 rounded-lg ${darkMode ? "text-[#e8f0ff]" : "text-[#0d1117]"}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`md:hidden border-t ${
              darkMode ? "bg-[#060b18]/95 border-[#131e38]" : "bg-white/95 border-[#e2e8f0]"
            } backdrop-blur-xl`}
          >
            <nav className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all hover:bg-[#3d8bff]/10 hover:text-[#3d8bff] ${
                    darkMode ? "text-[#7c8db5]" : "text-[#64748b]"
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("#contact");
                }}
                className="mt-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-[#0055ff] to-[#00d4ff] text-white text-center"
              >
                {t.nav.hireMe}
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
