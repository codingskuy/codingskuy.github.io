import { useState, useEffect, useRef, useCallback } from 'react'
import {
  Terminal,
  BookOpen,
  Code2,
  Brain,
  Shield,
  GitBranch,
  ChevronRight,
  Check,
  ArrowRight,
  Users,
  Star,
  Download,
  Zap,
  Menu,
  X,
  Copy,
} from 'lucide-react'
import { useTranslation } from './i18n'
import { LanguageSwitcher } from './LanguageSwitcher'

function GithubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold: 0.15, ...options }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, inView }
}

function useCounter(target: number, duration = 600, startOnView = true) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(!startOnView)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!startOnView) return
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true) },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    const startTime = performance.now()
    const step = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [started, target, duration])

  return { ref, count }
}

function useCopyToClipboard() {
  const [copied, setCopied] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  const copy = useCallback((text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => setCopied(false), 2000)
    })
  }, [])

  return { copied, copy }
}

// ─── Toast Component ──────────────────────────────────────────────────────────

function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 2200)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 32,
        right: 32,
        background: '#161B22',
        border: '1px solid #30363D',
        borderRadius: 10,
        padding: '12px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 13,
        color: '#F0F6FC',
        zIndex: 200,
        animation: 'slide-in-right 200ms ease-out',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
      }}
    >
      <Check size={14} style={{ color: '#3FB950' }} />
      {message}
    </div>
  )
}

// ─── Copy Button ──────────────────────────────────────────────────────────────

function CopyButton({ text, className = '' }: { text: string; className?: string }) {
  const { copied, copy } = useCopyToClipboard()

  return (
    <button
      onClick={() => copy(text)}
      className={className}
      style={{
        background: copied ? 'rgba(63,185,80,0.12)' : 'rgba(139,148,158,0.08)',
        border: 'none',
        borderRadius: 6,
        padding: 5,
        cursor: 'pointer',
        color: copied ? '#3FB950' : '#8B949E',
        transition: 'background 150ms, color 150ms',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      aria-label="Copy to clipboard"
    >
      {copied ? <Check size={13} /> : <Copy size={13} />}
    </button>
  )
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface CompetencyBar {
  label: string
  value: number
  color?: string
}

// ─── Terminal Animation ────────────────────────────────────────────────────────

const TERMINAL_LINES = [
  { text: '$ opencode install @codingskuy/coding-school', delay: 0, type: 'command' },
  { text: '', delay: 600, type: 'blank' },
  { text: '✔ Installing plugin...', delay: 800, type: 'success' },
  { text: '✔ Learn Agent registered', delay: 1400, type: 'success' },
  { text: '✔ Coach Agent registered', delay: 1900, type: 'success' },
  { text: '✔ Loading student profile...', delay: 2400, type: 'success' },
  { text: '', delay: 2900, type: 'blank' },
  { text: '────────────────────────────────', delay: 3000, type: 'divider' },
  { text: 'Competency Assessment', delay: 3200, type: 'label' },
  { text: '', delay: 3300, type: 'blank' },
  { text: 'Knowledge        ██████░░░░  62%', delay: 3400, type: 'bar' },
  { text: 'Architecture     ██░░░░░░░░  24%', delay: 3700, type: 'bar' },
  { text: 'Debugging        ████████░░  79%', delay: 4000, type: 'bar' },
  { text: 'Code Quality     █████░░░░░  51%', delay: 4300, type: 'bar' },
  { text: '', delay: 4600, type: 'blank' },
  { text: '────────────────────────────────', delay: 4700, type: 'divider' },
  { text: '✔ Ready to learn.', delay: 4900, type: 'success' },
  { text: '  Mentor is watching your code.', delay: 5300, type: 'muted' },
]

function TerminalWindow() {
  const [visibleLines, setVisibleLines] = useState<number>(0)
  const [started, setStarted] = useState(false)
  const { copied, copy } = useCopyToClipboard()

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), 400)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!started) return
    const timers: ReturnType<typeof setTimeout>[] = []
    TERMINAL_LINES.forEach((line, i) => {
      timers.push(setTimeout(() => setVisibleLines(i + 1), line.delay))
    })
    return () => timers.forEach(clearTimeout)
  }, [started])

  const getLineColor = (type: string) => {
    switch (type) {
      case 'command': return '#F0F6FC'
      case 'success': return '#3FB950'
      case 'divider': return '#30363D'
      case 'label': return '#8B949E'
      case 'bar': return '#FF8C42'
      case 'muted': return '#8B949E'
      default: return 'transparent'
    }
  }

  const terminalText = TERMINAL_LINES.map(l => l.text).join('\n')

  return (
    <div
      className="terminal-glow"
      style={{
        background: '#161B22',
        border: '1px solid #30363D',
        borderRadius: 10,
        overflow: 'hidden',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 13,
        lineHeight: '1.7',
        position: 'relative',
      }}
    >
      {/* Scanline overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '100%',
          background: 'linear-gradient(transparent 50%, rgba(255, 140, 66,0.015) 50%)',
          backgroundSize: '100% 4px',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
      {/* Title bar */}
      <div
        style={{
          background: '#1C2128',
          borderBottom: '1px solid #30363D',
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div
            style={{ width: 12, height: 12, borderRadius: '50%', background: '#F85149', transition: 'box-shadow 200ms' }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 0 8px rgba(248,81,73,0.5)')}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
          />
          <div
            style={{ width: 12, height: 12, borderRadius: '50%', background: '#D29922', transition: 'box-shadow 200ms' }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 0 8px rgba(210,153,34,0.5)')}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
          />
          <div
            style={{ width: 12, height: 12, borderRadius: '50%', background: '#3FB950', transition: 'box-shadow 200ms' }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 0 8px rgba(63,185,80,0.5)')}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
          />
          <span style={{ marginLeft: 8, color: '#8B949E', fontSize: 12 }}>opencode — coding-school</span>
        </div>
        <button
          onClick={() => copy(terminalText)}
          style={{
            background: copied ? 'rgba(63,185,80,0.12)' : 'transparent',
            border: 'none',
            borderRadius: 4,
            padding: 4,
            cursor: 'pointer',
            color: copied ? '#3FB950' : '#8B949E',
            transition: 'background 150ms, color 150ms',
            display: 'flex',
            alignItems: 'center',
          }}
          aria-label="Copy terminal output"
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
        </button>
      </div>
      {/* Content */}
      <div style={{ padding: '20px 24px', minHeight: 340, position: 'relative', zIndex: 2 }}>
        {TERMINAL_LINES.slice(0, visibleLines).map((line, i) => (
          <div
            key={i}
            style={{
              color: getLineColor(line.type),
              whiteSpace: 'pre',
              animation: 'term-line-in 200ms ease-out forwards',
              opacity: 0,
            }}
          >
            {line.text || ' '}
          </div>
        ))}
        {visibleLines < TERMINAL_LINES.length && (
          <span
            style={{
              display: 'inline-block',
              height: 14,
              background: '#F0F6FC',
              verticalAlign: 'text-bottom',
              animation: 'blink 1s step-end infinite, cursor-pulse 1.5s ease-in-out infinite',
            }}
          />
        )}
      </div>
    </div>
  )
}

// ─── Competency Bar ────────────────────────────────────────────────────────────

function CompBar({ label, value, color = '#FF8C42' }: CompetencyBar) {
  const ref = useRef<HTMLDivElement>(null)
  const [animated, setAnimated] = useState(false)
  const [displayCount, setDisplayCount] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimated(true) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!animated) return
    const blocks = 10
    const filled = Math.round((value / 100) * blocks)
    let current = 0
    const interval = setInterval(() => {
      current++
      setDisplayCount(current)
      if (current >= filled) clearInterval(interval)
    }, 40)
    return () => clearInterval(interval)
  }, [animated, value])

  const blocks = 10

  return (
    <div ref={ref} style={{ marginBottom: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ color: '#8B949E', fontSize: 13, fontFamily: "'JetBrains Mono', monospace" }}>{label}</span>
        <span style={{ color: '#8B949E', fontSize: 12, fontFamily: "'JetBrains Mono', monospace" }}>{animated ? value : 0}%</span>
      </div>
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 15,
          letterSpacing: 2,
          color: color,
        }}
      >
        {Array.from({ length: blocks }, (_, i) =>
          i < displayCount ? '█' : '░'
        ).join('')}
      </div>
    </div>
  )
}

// ─── Section label ─────────────────────────────────────────────────────────────

function SectionLabel({ text }: { text: string }) {
  const { ref, inView } = useInView()
  return (
    <div
      ref={ref}
      style={{
        marginBottom: 16,
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(8px)',
        transition: 'opacity 300ms ease-out, transform 300ms ease-out',
      }}
    >
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 12,
          color: '#8B949E',
          letterSpacing: 1,
        }}
      >
        // {text}
      </span>
    </div>
  )
}

// ─── Divider ───────────────────────────────────────────────────────────────────

function TermDivider() {
  const { ref, inView } = useInView()
  return (
    <div
      ref={ref}
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 13,
        color: '#30363D',
        margin: '64px 0',
        letterSpacing: 1,
        userSelect: 'none',
        opacity: inView ? 1 : 0,
        transition: 'opacity 400ms ease-out',
      }}
    >
      ────────────────────────────────────────────────────────────────────────────────
    </div>
  )
}

// ─── Feature Card ──────────────────────────────────────────────────────────────

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  items?: string[]
}

function FeatureCard({ icon, title, description, items }: FeatureCardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? '#1C2128' : '#161B22',
        border: `1px solid ${hovered ? '#FF8C4233' : '#30363D'}`,
        borderRadius: 10,
        padding: '28px 28px 32px',
        transition: 'background 200ms ease-out, border-color 250ms ease-out, transform 200ms ease-out, box-shadow 250ms ease-out',
        cursor: 'default',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: hovered ? '0 0 24px rgba(255, 140, 66,0.08)' : '0 0 0 rgba(255, 140, 66,0)',
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          background: '#0D1117',
          border: '1px solid #30363D',
          borderRadius: 8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 20,
          color: '#FF8C42',
          transition: 'transform 200ms ease-out',
          transform: hovered ? 'scale(1.08)' : 'scale(1)',
        }}
      >
        {icon}
      </div>
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 13,
          fontWeight: 500,
          color: '#F0F6FC',
          marginBottom: 10,
        }}
      >
        {title}
      </div>
      <div style={{ color: '#8B949E', fontSize: 14, lineHeight: 1.65, marginBottom: items ? 20 : 0 }}>
        {description}
      </div>
      {items && (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {items.map((item, i) => (
            <li
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                color: '#8B949E',
                fontSize: 13,
                marginTop: 8,
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              <Check size={13} style={{ color: '#3FB950', flexShrink: 0 }} />
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

interface StatCardProps {
  icon: React.ReactNode
  value: string
  label: string
  numVal: number
  suffix: string
}

function StatCard({ icon, label, numVal, suffix }: StatCardProps) {
  const { ref, inView } = useInView()
  const { ref: counterRef, count } = useCounter(numVal, 800)

  return (
    <div
      ref={ref}
      className="glow-border"
      style={{
        background: '#161B22',
        border: '1px solid #30363D',
        borderRadius: 10,
        padding: '24px',
        textAlign: 'center',
        opacity: inView ? 1 : 0,
        transform: inView ? 'scale(1)' : 'scale(0.95)',
        transition: 'opacity 300ms ease-out, transform 300ms ease-out, box-shadow 250ms ease-out, border-color 250ms ease-out',
      }}
    >
      <div style={{ color: '#FF8C42', marginBottom: 12 }}>{icon}</div>
      <div
        ref={counterRef}
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 24,
          fontWeight: 600,
          color: '#F0F6FC',
          marginBottom: 4,
        }}
      >
        {numVal > 0 ? `${count.toLocaleString()}${suffix}` : suffix}
      </div>
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 12,
          color: '#8B949E',
        }}
      >
        {label}
      </div>
    </div>
  )
}

// ─── Nav ───────────────────────────────────────────────────────────────────────

function Nav() {
  const { t } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { key: 'nav.features', label: t('nav.features') },
    { key: 'nav.philosophy', label: t('nav.philosophy') },
    { key: 'nav.docs', label: t('nav.docs') },
    { key: 'nav.github', label: t('nav.github') },
  ]

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: scrolled ? 'rgba(13,17,23,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid #30363D' : '1px solid transparent',
        transition: 'background 0.25s, border-color 0.25s, backdrop-filter 0.25s',
      }}
    >
      <div
        style={{
          maxWidth: 1160,
          margin: '0 auto',
          padding: '0 24px',
          height: 60,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 28,
              height: 28,
              background: '#FF8C42',
              borderRadius: 6,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Terminal size={14} color="#0D1117" />
          </div>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 14,
              fontWeight: 500,
              color: '#F0F6FC',
            }}
          >
            CodingSchool
          </span>
        </div>

        {/* Desktop links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }} className="hidden-mobile">
          {navLinks.map((link) => (
            <a
              key={link.key}
              href="#"
              className="link-underline"
              style={{
                color: '#8B949E',
                fontSize: 14,
                textDecoration: 'none',
                transition: 'color 150ms ease-out',
                position: 'relative',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#F0F6FC')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#8B949E')}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA + Language Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <LanguageSwitcher />
          <button
            className="interact-press"
            style={{
              background: '#FF8C42',
              color: '#0D1117',
              border: 'none',
              borderRadius: 8,
              padding: '7px 18px',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: "'Inter', sans-serif",
              transition: 'filter 150ms ease-out, box-shadow 200ms ease-out, transform 150ms ease-out',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.filter = 'brightness(1.12)'
              e.currentTarget.style.boxShadow = '0 0 16px rgba(255, 140, 66,0.3)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.filter = 'none'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            {t('nav.install')}
          </button>
          <button
            className="mobile-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div
          className="mobile-drawer"
          style={{
            position: 'absolute',
            top: 60,
            left: 0,
            right: 0,
            background: 'rgba(13,17,23,0.98)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid #30363D',
            padding: '16px 24px 24px',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.key}
              href="#"
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'block',
                color: '#8B949E',
                fontSize: 15,
                padding: '10px 0',
                borderBottom: '1px solid #1C2128',
                textDecoration: 'none',
                transition: 'color 150ms',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#F0F6FC')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#8B949E')}
            >
              {link.label}
            </a>
          ))}
          <div style={{ marginTop: 16 }}>
            <LanguageSwitcher />
          </div>
          <button
            className="interact-press"
            style={{
              marginTop: 16,
              width: '100%',
              background: '#FF8C42',
              color: '#0D1117',
              border: 'none',
              borderRadius: 8,
              padding: '10px 18px',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: "'Inter', sans-serif",
            }}
            onClick={() => setMenuOpen(false)}
          >
            {t('nav.install')}
          </button>
        </div>
      )}
    </nav>
  )
}

// ─── Journey Step ──────────────────────────────────────────────────────────────

function JourneyStep({
  step,
  label,
  desc,
  isLast,
  index = 0,
}: {
  step: string
  label: string
  desc: string
  isLast?: boolean
  index?: number
}) {
  const { ref, inView } = useInView()

  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        gap: 20,
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(12px)',
        transition: `opacity 300ms ease-out ${index * 80}ms, transform 300ms ease-out ${index * 80}ms`,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div
          style={{
            width: 36,
            height: 36,
            border: '1px solid #30363D',
            borderRadius: '50%',
            background: '#161B22',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            transition: 'border-color 200ms ease-out, box-shadow 200ms ease-out',
          }}
        >
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: '#FF8C42',
            }}
          >
            {step}
          </span>
        </div>
        {!isLast && (
          <div
            style={{
              width: 1,
              flex: 1,
              background: inView ? '#FF8C42' : '#30363D',
              margin: '6px 0',
              minHeight: 40,
              transition: 'background 400ms ease-out',
            }}
          />
        )}
      </div>
      <div style={{ paddingBottom: isLast ? 0 : 32 }}>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 14,
            color: '#F0F6FC',
            marginBottom: 6,
          }}
        >
          {label}
        </div>
        <div style={{ color: '#8B949E', fontSize: 14, lineHeight: 1.6 }}>{desc}</div>
      </div>
    </div>
  )
}

// ─── Main App ──────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <AppInner />
  )
}

function AppInner() {
  const { t } = useTranslation()
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    const handler = (e: CustomEvent<{ message: string }>) => {
      setToast(e.detail.message)
    }
    window.addEventListener('copy-success' as any, handler as any)
    return () => window.removeEventListener('copy-success' as any, handler as any)
  }, [])

  return (
    <div style={{ background: '#0D1117', minHeight: '100vh', color: '#F0F6FC' }}>
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
      <Nav />

      {/* ── Hero ── */}
      <section
        style={{
          maxWidth: 1160,
          margin: '0 auto',
          padding: '140px 24px 100px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 64,
          alignItems: 'center',
        }}
        className="hero-grid"
      >
        {/* Left */}
        <div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: '#161B22',
              border: '1px solid #30363D',
              borderRadius: 100,
              padding: '5px 14px',
              marginBottom: 28,
            }}
          >
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#3FB950' }} />
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                color: '#8B949E',
              }}
            >
              {t('hero.badge')}
            </span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(36px, 5vw, 58px)',
              fontWeight: 700,
              lineHeight: 1.12,
              color: '#F0F6FC',
              margin: '0 0 20px',
              letterSpacing: '-0.02em',
            }}
          >
            {t('hero.title1')}{' '}
            <span style={{ color: '#FF8C42' }}>{t('hero.title2')}</span>
          </h1>

          <p
            style={{
              fontSize: 18,
              color: '#8B949E',
              lineHeight: 1.65,
              margin: '0 0 36px',
              maxWidth: 440,
            }}
          >
            {t('hero.subtitle')}
          </p>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button
              className="interact-press"
              style={{
                background: '#FF8C42',
                color: '#0D1117',
                border: 'none',
                borderRadius: 10,
                padding: '12px 24px',
                fontSize: 15,
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontFamily: "'Inter', sans-serif",
                transition: 'filter 150ms ease-out, box-shadow 200ms ease-out, transform 150ms ease-out',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.filter = 'brightness(1.12)'
                e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 140, 66,0.3)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.filter = 'none'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <Download size={15} />
              {t('hero.install')}
            </button>
            <a
              href="https://github.com/codingskuy/coding-school"
              className="interact-press"
              style={{
                background: 'transparent',
                color: '#F0F6FC',
                border: '1px solid #30363D',
                borderRadius: 10,
                padding: '12px 24px',
                fontSize: 15,
                fontWeight: 500,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                textDecoration: 'none',
                fontFamily: "'Inter', sans-serif",
                transition: 'border-color 150ms ease-out, background 150ms ease-out, transform 150ms ease-out, box-shadow 200ms ease-out',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#FF8C4244'
                e.currentTarget.style.background = '#161B22'
                e.currentTarget.style.boxShadow = '0 0 16px rgba(255, 140, 66,0.08)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#30363D'
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <GithubIcon size={15} />
              {t('hero.viewGithub')}
            </a>
          </div>

          <div style={{ marginTop: 28, display: 'flex', gap: 20 }}>
            {[
              { icon: <Star size={13} />, text: t('hero.stars') },
              { icon: <Users size={13} />, text: t('hero.contributors') },
              { icon: <Download size={13} />, text: t('hero.installs') },
            ].map(({ icon, text }, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  color: '#8B949E',
                  fontSize: 13,
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                {icon}
                {text}
              </div>
            ))}
          </div>
        </div>

        {/* Right: Terminal */}
        <div>
          <TerminalWindow />
        </div>
      </section>

      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 24px' }}>
        <TermDivider />
      </div>

      {/* ── The Problem ── */}
      <section style={{ maxWidth: 1160, margin: '0 auto', padding: '0 24px 100px' }}>
        <SectionLabel text={t('problem.label')} />
        <h2
          style={{
            fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: 700,
            lineHeight: 1.15,
            color: '#F0F6FC',
            margin: '0 0 16px',
            maxWidth: 640,
            letterSpacing: '-0.02em',
          }}
        >
          {t('problem.title')}
          <br />
          <span style={{ color: '#8B949E' }}>{t('problem.titleHighlight')}</span>
        </h2>
        <p style={{ color: '#8B949E', fontSize: 16, lineHeight: 1.65, marginBottom: 56, maxWidth: 480 }}>
          {t('problem.subtitle')}
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 60px 1fr',
            gap: 0,
            alignItems: 'start',
          }}
          className="problem-grid"
        >
          {/* Left: old way */}
          <div
            style={{
              background: '#161B22',
              border: '1px solid #30363D',
              borderRadius: 10,
              padding: '28px 28px 32px',
              transition: 'border-color 200ms ease-out',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#F8514944')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#30363D')}
          >
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                color: '#F85149',
                marginBottom: 20,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span>✖</span> {t('problem.todaysWorkflow')}
            </div>
            {[t('problem.steps.prompt'), t('problem.steps.copy'), t('problem.steps.paste'), t('problem.steps.ship'), t('problem.steps.forget')].map((step, i, arr) => (
              <div key={i}>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 15,
                    color: '#F0F6FC',
                    padding: '10px 0',
                  }}
                >
                  {step}
                </div>
                {i < arr.length - 1 && (
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 13,
                      color: '#30363D',
                      paddingLeft: 4,
                    }}
                  >
                    ↓
                  </div>
                )}
              </div>
            ))}
            <div
              style={{
                marginTop: 24,
                paddingTop: 20,
                borderTop: '1px solid #30363D',
              }}
            >
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12,
                  color: '#8B949E',
                  marginBottom: 12,
                }}
              >
                {t('problem.result')}
              </div>
              {[
                t('problem.results.shallow'),
                t('problem.results.tutorial'),
                t('problem.results.debugging'),
                t('problem.results.growth'),
              ].map((item) => (
                <div
                  key={item}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    color: '#8B949E',
                    fontSize: 13,
                    marginBottom: 8,
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  <span style={{ color: '#F85149' }}>✖</span> {item}
                </div>
              ))}
            </div>
          </div>

          {/* Arrow */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: 80,
            }}
          >
            <div
              style={{
                animation: 'scale-in 400ms ease-out forwards',
                color: '#FF8C42',
              }}
            >
              <ArrowRight size={20} />
            </div>
          </div>

          {/* Right: CodingSchool way */}
          <div
            style={{
              background: '#161B22',
              border: '1px solid #FF8C4233',
              borderRadius: 10,
              padding: '28px 28px 32px',
              transition: 'border-color 200ms ease-out, box-shadow 200ms ease-out',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#FF8C4266'
              e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 140, 66,0.08)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#FF8C4233'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                color: '#3FB950',
                marginBottom: 20,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span>✔</span> {t('problem.codingSchoolMethod')}
            </div>
            {[t('problem.steps.diagnose'), t('problem.steps.understand'), t('problem.steps.build'), t('problem.steps.review'), t('problem.steps.reflect'), t('problem.steps.grow')].map((step, i, arr) => (
              <div key={i}>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 15,
                    color: i === arr.length - 1 ? '#FF8C42' : '#F0F6FC',
                    padding: '10px 0',
                    fontWeight: i === arr.length - 1 ? 600 : 400,
                  }}
                >
                  {step}
                </div>
                {i < arr.length - 1 && (
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: '#30363D', paddingLeft: 4 }}>
                    ↓
                  </div>
                )}
              </div>
            ))}
            <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid #30363D' }}>
              <div
                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#8B949E', marginBottom: 12 }}
              >
                {t('problem.result')}
              </div>
              {[
                t('problem.csResults.deep'),
                t('problem.csResults.independent'),
                t('problem.csResults.strongDebugging'),
                t('problem.csResults.continuous'),
              ].map((item) => (
                <div
                  key={item}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    color: '#8B949E',
                    fontSize: 13,
                    marginBottom: 8,
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  <span style={{ color: '#3FB950' }}>✔</span> {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 24px' }}>
        <TermDivider />
      </div>

      {/* ── Why CodingSchool ── */}
      <section style={{ maxWidth: 1160, margin: '0 auto', padding: '0 24px 100px' }}>
        <SectionLabel text={t('why.label')} />
        <h2
          style={{
            fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: 700,
            lineHeight: 1.15,
            color: '#F0F6FC',
            margin: '0 0 16px',
            letterSpacing: '-0.02em',
          }}
        >
          {t('why.title')}
        </h2>
        <p style={{ color: '#8B949E', fontSize: 16, lineHeight: 1.65, marginBottom: 52, maxWidth: 520 }}>
          {t('why.subtitle')}
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 16,
          }}
          className="cards-grid"
        >
          <FeatureCard
            icon={<Brain size={18} />}
            title={t('why.diagnosis.title')}
            description={t('why.diagnosis.desc')}
            items={[t('why.diagnosis.items.0'), t('why.diagnosis.items.1'), t('why.diagnosis.items.2')]}
          />
          <FeatureCard
            icon={<Code2 size={18} />}
            title={t('why.mentor.title')}
            description={t('why.mentor.desc')}
            items={[t('why.mentor.items.0'), t('why.mentor.items.1'), t('why.mentor.items.2')]}
          />
          <FeatureCard
            icon={<Zap size={18} />}
            title={t('why.growth.title')}
            description={t('why.growth.desc')}
            items={[t('why.growth.items.0'), t('why.growth.items.1'), t('why.growth.items.2')]}
          />
        </div>
      </section>

      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 24px' }}>
        <TermDivider />
      </div>

      {/* ── Dual Agent ── */}
      <section style={{ maxWidth: 1160, margin: '0 auto', padding: '0 24px 100px' }}>
        <SectionLabel text={t('dual.label')} />
        <h2
          style={{
            fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: 700,
            lineHeight: 1.15,
            color: '#F0F6FC',
            margin: '0 0 16px',
            letterSpacing: '-0.02em',
          }}
        >
          {t('dual.title')}
        </h2>
        <p style={{ color: '#8B949E', fontSize: 16, lineHeight: 1.65, marginBottom: 56, maxWidth: 520 }}>
          {t('dual.subtitle')}
        </p>

        {/* Diagram */}
        <div
          className="terminal-glow dual-diagram-wrap"
          style={{
            background: '#161B22',
            border: '1px solid #30363D',
            borderRadius: 10,
            padding: '48px 40px',
            textAlign: 'center',
            marginBottom: 40,
          }}
        >
          {/* Student model */}
          <div
            style={{
              display: 'inline-block',
              background: '#0D1117',
              border: '1px solid #FF8C42',
              borderRadius: 8,
              padding: '12px 32px',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 14,
              color: '#FF8C42',
              marginBottom: 32,
            }}
          >
            {t('dual.studentModel')}
          </div>

          {/* Connector lines */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 0, marginBottom: 0 }}>
            <div style={{ width: '50%', borderRight: '1px solid #30363D', height: 32 }} />
            <div style={{ width: '50%', height: 32 }} />
          </div>

          {/* Agents */}
          <div
            className="dual-agent-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 24,
            }}
          >
            {/* Learn Agent */}
            <div
              className="glow-border"
              style={{
                background: '#0D1117',
                border: '1px solid #30363D',
                borderRadius: 10,
                padding: '24px 28px',
                textAlign: 'left',
              }}
            >
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 13,
                  color: '#3FB950',
                  marginBottom: 16,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <BookOpen size={14} />
                {t('dual.learnAgent')}
              </div>
              {[t('dual.learn.items.0'), t('dual.learn.items.1'), t('dual.learn.items.2'), t('dual.learn.items.3'), t('dual.learn.items.4'), t('dual.learn.items.5')].map((item) => (
                <div
                  key={item}
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 13,
                    color: '#8B949E',
                    padding: '5px 0',
                    borderBottom: '1px solid #1C2128',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  <ChevronRight size={11} style={{ color: '#3FB950', flexShrink: 0 }} />
                  {item}
                </div>
              ))}
            </div>

            {/* Coach Agent */}
            <div
              className="glow-border"
              style={{
                background: '#0D1117',
                border: '1px solid #30363D',
                borderRadius: 10,
                padding: '24px 28px',
                textAlign: 'left',
              }}
            >
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 13,
                  color: '#FF8C42',
                  marginBottom: 16,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <Shield size={14} />
                {t('dual.coachAgent')}
              </div>
              {[t('dual.coach.items.0'), t('dual.coach.items.1'), t('dual.coach.items.2'), t('dual.coach.items.3'), t('dual.coach.items.4')].map(
                (item) => (
                  <div
                    key={item}
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 13,
                      color: '#8B949E',
                      padding: '5px 0',
                      borderBottom: '1px solid #1C2128',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                    }}
                  >
                    <ChevronRight size={11} style={{ color: '#FF8C42', flexShrink: 0 }} />
                    {item}
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* Comparison table */}
        <div
          className="comparison-table-wrap"
          style={{
            background: '#161B22',
            border: '1px solid #30363D',
            borderRadius: 10,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr 1fr',
              background: '#1C2128',
              borderBottom: '1px solid #30363D',
            }}
          >
            {[t('dual.table.header0'), t('dual.table.header1'), t('dual.table.header2'), t('dual.table.header3')].map((col, i) => (
              <div
                key={i}
                style={{
                  padding: '12px 20px',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12,
                  color: i === 3 ? '#FF8C42' : '#8B949E',
                  fontWeight: i === 3 ? 600 : 400,
                }}
              >
                {col}
              </div>
            ))}
          </div>
          {[
            [t('dual.table.row1.label'), t('dual.table.row1.col1'), t('dual.table.row1.col2'), t('dual.table.row1.col3')],
            [t('dual.table.row2.label'), t('dual.table.row2.col1'), t('dual.table.row2.col2'), t('dual.table.row2.col3')],
            [t('dual.table.row3.label'), t('dual.table.row3.col1'), t('dual.table.row3.col2'), t('dual.table.row3.col3')],
            [t('dual.table.row4.label'), t('dual.table.row4.col1'), t('dual.table.row4.col2'), t('dual.table.row4.col3')],
          ].map(([label, ...cols], rowIdx) => (
            <div
              key={rowIdx}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr 1fr',
                borderBottom: rowIdx < 3 ? '1px solid #30363D' : 'none',
                transition: 'background 150ms ease-out',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 140, 66,0.03)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              <div
                style={{
                  padding: '14px 20px',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 13,
                  color: '#8B949E',
                }}
              >
                {label}
              </div>
              {cols.map((cell, i) => (
                <div
                  key={i}
                  style={{
                    padding: '14px 20px',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 13,
                    color: i === 2 ? '#3FB950' : '#8B949E',
                  }}
                >
                  {i === 2 && <span style={{ marginRight: 6 }}>✔</span>}
                  {cell}
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 24px' }}>
        <TermDivider />
      </div>

      {/* ── Competency Engine ── */}
      <section style={{ maxWidth: 1160, margin: '0 auto', padding: '0 24px 100px' }}>
        <SectionLabel text={t('comp.label')} />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 64,
            alignItems: 'start',
          }}
          className="comp-grid"
        >
          <div>
            <h2
              style={{
                fontSize: 'clamp(28px, 4vw, 44px)',
                fontWeight: 700,
                lineHeight: 1.15,
                color: '#F0F6FC',
                margin: '0 0 16px',
                letterSpacing: '-0.02em',
              }}
            >
              {t('comp.title1')}{' '}
              <span style={{ color: '#FF8C42' }}>{t('comp.title2')}</span>
            </h2>
            <p style={{ color: '#8B949E', fontSize: 16, lineHeight: 1.65, marginBottom: 36 }}>
              {t('comp.subtitle')}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[t('comp.items.0'), t('comp.items.1'), t('comp.items.2'), t('comp.items.3')].map((item) => (
                <div
                  key={item}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 10,
                    color: '#8B949E',
                    fontSize: 14,
                    lineHeight: 1.5,
                  }}
                >
                  <Check size={15} style={{ color: '#3FB950', flexShrink: 0, marginTop: 2 }} />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div>
            {/* Learning section */}
            <div
              className="terminal-glow"
              style={{
                background: '#161B22',
                border: '1px solid #30363D',
                borderRadius: 10,
                padding: '24px 24px 28px',
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12,
                  color: '#8B949E',
                  marginBottom: 20,
                }}
              >
                // {t('comp.learning')}
              </div>
              <CompBar label={t('comp.knowledge')} value={78} color="#3FB950" />
              <CompBar label={t('comp.implementation')} value={62} color="#3FB950" />
              <CompBar label={t('comp.debugging')} value={85} color="#3FB950" />
              <CompBar label={t('comp.teaching')} value={34} color="#D29922" />
            </div>

            {/* Engineering section */}
            <div
              className="terminal-glow"
              style={{
                background: '#161B22',
                border: '1px solid #30363D',
                borderRadius: 10,
                padding: '24px 24px 28px',
              }}
            >
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12,
                  color: '#8B949E',
                  marginBottom: 20,
                }}
              >
                // {t('comp.engineering')}
              </div>
              <CompBar label={t('comp.architecture')} value={51} color="#FF8C42" />
              <CompBar label={t('comp.testing')} value={29} color="#F85149" />
              <CompBar label={t('comp.git')} value={73} color="#FF8C42" />
              <CompBar label={t('comp.security')} value={44} color="#D29922" />
              <CompBar label={t('comp.documentation')} value={58} color="#FF8C42" />
            </div>
          </div>
        </div>
      </section>

      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 24px' }}>
        <TermDivider />
      </div>

      {/* ── Learning Journey ── */}
      <section style={{ maxWidth: 1160, margin: '0 auto', padding: '0 24px 100px' }}>
        <SectionLabel text={t('journey.label')} />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 64,
            alignItems: 'start',
          }}
          className="journey-grid"
        >
          <div>
            <h2
              style={{
                fontSize: 'clamp(28px, 4vw, 44px)',
                fontWeight: 700,
                lineHeight: 1.15,
                color: '#F0F6FC',
                margin: '0 0 16px',
                letterSpacing: '-0.02em',
              }}
            >
              {t('journey.title')}
            </h2>
            <p style={{ color: '#8B949E', fontSize: 16, lineHeight: 1.65 }}>
              {t('journey.subtitle')}
            </p>
          </div>

          <div>
            {[
              { step: '01', label: t('journey.steps.0.label'), desc: t('journey.steps.0.desc') },
              { step: '02', label: t('journey.steps.1.label'), desc: t('journey.steps.1.desc') },
              { step: '03', label: t('journey.steps.2.label'), desc: t('journey.steps.2.desc') },
              { step: '04', label: t('journey.steps.3.label'), desc: t('journey.steps.3.desc') },
              { step: '05', label: t('journey.steps.4.label'), desc: t('journey.steps.4.desc') },
            ].map((s, i, arr) => (
              <JourneyStep key={s.step} {...s} isLast={i === arr.length - 1} index={i} />
            ))}
          </div>
        </div>
      </section>

      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 24px' }}>
        <TermDivider />
      </div>

      {/* ── Open Source ── */}
      <section style={{ maxWidth: 1160, margin: '0 auto', padding: '0 24px 100px' }}>
        <SectionLabel text={t('oss.label')} />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 16,
            marginBottom: 40,
          }}
          className="stats-grid"
        >
          {[
            { icon: <Star size={16} />, value: '2,100+', label: t('oss.stars'), numVal: 2100, suffix: '+' },
            { icon: <Download size={16} />, value: '18k+', label: t('oss.installs'), numVal: 18, suffix: 'k+' },
            { icon: <Users size={16} />, value: '340+', label: t('oss.contributors'), numVal: 340, suffix: '+' },
            { icon: <GitBranch size={16} />, value: 'MIT', label: t('oss.license'), numVal: 0, suffix: 'MIT' },
          ].map(({ icon, value, label, numVal, suffix }, i) => (
            <StatCard key={i} icon={icon} value={value} label={label} numVal={numVal} suffix={suffix} />
          ))}
        </div>

        <div
          style={{
            background: '#161B22',
            border: '1px solid #30363D',
            borderRadius: 10,
            padding: '32px 36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 24,
            flexWrap: 'wrap',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 16,
                color: '#F0F6FC',
                marginBottom: 8,
              }}
            >
              {t('oss.forever')}
            </div>
            <div style={{ color: '#8B949E', fontSize: 14, maxWidth: 420 }}>
              {t('oss.foreverDesc')}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <a
              href="https://github.com/codingskuy/coding-school"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                background: '#0D1117',
                border: '1px solid #30363D',
                borderRadius: 8,
                padding: '10px 20px',
                color: '#F0F6FC',
                fontSize: 13,
                textDecoration: 'none',
                fontFamily: "'JetBrains Mono', monospace",
                transition: 'border-color 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#8B949E')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#30363D')}
            >
              <GithubIcon size={14} />
              {t('oss.viewGithub')}
            </a>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section
        style={{
          background: '#161B22',
          borderTop: '1px solid #30363D',
          borderBottom: '1px solid #30363D',
          padding: '96px 24px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            color: '#8B949E',
            marginBottom: 24,
            letterSpacing: 1,
          }}
        >
          // {t('cta.label')}
        </div>
        <h2
          style={{
            fontSize: 'clamp(32px, 5vw, 54px)',
            fontWeight: 700,
            lineHeight: 1.1,
            color: '#F0F6FC',
            margin: '0 0 16px',
            letterSpacing: '-0.02em',
          }}
        >
          {t('cta.title')}
        </h2>
        <p style={{ color: '#8B949E', fontSize: 18, lineHeight: 1.65, marginBottom: 44, maxWidth: 440, margin: '0 auto 44px' }}>
          {t('cta.subtitle')}
        </p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            className="interact-press"
            style={{
              background: '#FF8C42',
              color: '#0D1117',
              border: 'none',
              borderRadius: 10,
              padding: '14px 28px',
              fontSize: 16,
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontFamily: "'Inter', sans-serif",
              transition: 'filter 150ms ease-out, box-shadow 200ms ease-out, transform 150ms ease-out',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.filter = 'brightness(1.12)'
              e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 140, 66,0.3)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.filter = 'none'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <Download size={16} />
            {t('cta.install')}
          </button>
          <a
            href="https://github.com/codingskuy/coding-school"
            className="interact-press"
            style={{
              background: 'transparent',
              color: '#F0F6FC',
              border: '1px solid #30363D',
              borderRadius: 10,
              padding: '14px 28px',
              fontSize: 16,
              fontWeight: 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              textDecoration: 'none',
              fontFamily: "'Inter', sans-serif",
              transition: 'border-color 150ms ease-out, background 150ms ease-out, transform 150ms ease-out, box-shadow 200ms ease-out',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#FF8C4244'
              e.currentTarget.style.background = '#161B22'
              e.currentTarget.style.boxShadow = '0 0 16px rgba(255, 140, 66,0.08)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#30363D'
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <GithubIcon size={16} />
            {t('cta.viewGithub')}
          </a>
        </div>

        {/* Install command */}
        <div
          className="install-cmd"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 12,
            background: '#0D1117',
            border: '1px solid #30363D',
            borderRadius: 8,
            padding: '12px 20px',
            marginTop: 36,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 14,
            color: '#8B949E',
            cursor: 'pointer',
            transition: 'border-color 200ms ease-out, box-shadow 200ms ease-out',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#FF8C4244'
            e.currentTarget.style.boxShadow = '0 0 16px rgba(255, 140, 66,0.08)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#30363D'
            e.currentTarget.style.boxShadow = 'none'
          }}
          onClick={() => {
            navigator.clipboard.writeText('opencode install @codingskuy/coding-school')
            window.dispatchEvent(new CustomEvent('copy-success', { detail: { message: 'Copied to clipboard' } }))
          }}
        >
          <span style={{ color: '#3FB950' }}>$</span>
          <span>opencode install @codingskuy/coding-school</span>
          <CopyButton text="opencode install @codingskuy/coding-school" />
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ maxWidth: 1160, margin: '0 auto', padding: '48px 24px 40px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr',
            gap: 40,
            marginBottom: 48,
          }}
          className="footer-grid"
        >
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div
                style={{
                  width: 28,
                  height: 28,
                  background: '#FF8C42',
                  borderRadius: 6,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Terminal size={14} color="#0D1117" />
              </div>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 14,
                  fontWeight: 500,
                  color: '#F0F6FC',
                }}
              >
                CodingSchool
              </span>
            </div>
            <p style={{ color: '#8B949E', fontSize: 14, lineHeight: 1.65, maxWidth: 260 }}>
              {t('footer.desc')}
            </p>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                marginTop: 20,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                color: '#8B949E',
              }}
            >
              <span style={{ color: '#3FB950' }}>●</span> {t('footer.status')}
            </div>
          </div>

          {/* Product */}
          <div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                color: '#F0F6FC',
                marginBottom: 16,
                letterSpacing: 0.5,
              }}
            >
              {t('footer.product')}
            </div>
            {[t('footer.product.links.0'), t('footer.product.links.1'), t('footer.product.links.2'), t('footer.product.links.3'), t('footer.product.links.4')].map((link) => (
              <a
                key={link}
                href="#"
                className="link-underline"
                style={{
                  display: 'block',
                  color: '#8B949E',
                  fontSize: 14,
                  textDecoration: 'none',
                  marginBottom: 10,
                  transition: 'color 150ms ease-out',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#F0F6FC')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#8B949E')}
              >
                {link}
              </a>
            ))}
          </div>

          {/* Developers */}
          <div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                color: '#F0F6FC',
                marginBottom: 16,
              }}
            >
              {t('footer.developers')}
            </div>
            {[t('footer.developers.links.0'), t('footer.developers.links.1'), t('footer.developers.links.2'), t('footer.developers.links.3'), t('footer.developers.links.4')].map((link) => (
              <a
                key={link}
                href="#"
                className="link-underline"
                style={{
                  display: 'block',
                  color: '#8B949E',
                  fontSize: 14,
                  textDecoration: 'none',
                  marginBottom: 10,
                  transition: 'color 150ms ease-out',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#F0F6FC')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#8B949E')}
              >
                {link}
              </a>
            ))}
          </div>

          {/* Community */}
          <div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                color: '#F0F6FC',
                marginBottom: 16,
              }}
            >
              {t('footer.community')}
            </div>
            {[t('footer.community.links.0'), t('footer.community.links.1'), t('footer.community.links.2'), t('footer.community.links.3'), t('footer.community.links.4')].map((link) => (
              <a
                key={link}
                href="#"
                className="link-underline"
                style={{
                  display: 'block',
                  color: '#8B949E',
                  fontSize: 14,
                  textDecoration: 'none',
                  marginBottom: 10,
                  transition: 'color 150ms ease-out',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#F0F6FC')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#8B949E')}
              >
                {link}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid #30363D',
            paddingTop: 24,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#8B949E' }}>
            {t('footer.copyright')}
          </span>
          <div style={{ display: 'flex', gap: 20 }}>
            {[t('footer.privacy'), t('footer.terms'), t('footer.security')].map((link) => (
              <a
                key={link}
                href="#"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12,
                  color: '#8B949E',
                  textDecoration: 'none',
                  transition: 'color 0.15s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#F0F6FC')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#8B949E')}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* Responsive styles */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  )
}
