import { useState, useEffect } from 'react'
import { X, Menu } from 'lucide-react'
import { useTranslation } from '../i18n'
import { LanguageSwitcher } from '../LanguageSwitcher'
import ThemeToggle from '../ThemeToggle'

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
    { label: t('nav.features'), href: '#' },
    { label: t('nav.philosophy'), href: '#' },
    { label: t('nav.stats'), href: '#stats' },
    { label: t('nav.docs'), href: '#' },
    { label: t('nav.github'), href: '#' },
  ]

  return (
    <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: scrolled ? 'var(--nav-bg)' : 'transparent', backdropFilter: scrolled ? 'blur(12px)' : 'none', borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent', transition: 'background 0.25s, border-color 0.25s, backdrop-filter 0.25s' }}>
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 24px', height: 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div className="logo-mark" style={{ width: 30, height: 30, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 700, color: '#FBF7F1' }}>&gt;_</div>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 16, fontWeight: 700, color: 'var(--text)' }}>CodingSchool</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }} className="hidden-mobile">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="link-underline" style={{ color: 'var(--muted)', fontSize: 15, fontWeight: 500, textDecoration: 'none', transition: 'color 150ms ease-out', position: 'relative' }} onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')} onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}>
              {link.label}
            </a>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <ThemeToggle />
          <LanguageSwitcher />
          <button className="interact-press" style={{ background: 'var(--accent)', color: '#FBF7F1', border: 'none', borderRadius: 999, padding: '8px 18px', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: "'Inter', sans-serif" }} onMouseEnter={(e) => { e.currentTarget.style.filter = 'brightness(1.12)'; e.currentTarget.style.boxShadow = '0 6px 16px rgba(232, 101, 15, 0.25)' }} onMouseLeave={(e) => { e.currentTarget.style.filter = 'none'; e.currentTarget.style.boxShadow = 'none' }}>
            {t('nav.install')}
          </button>
          <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label={t('aria.menu')}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="mobile-drawer" style={{ position: 'absolute', top: 72, left: 0, right: 0, background: 'var(--drawer-bg)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border)', padding: '16px 24px 24px' }}>
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} onClick={() => setMenuOpen(false)} style={{ display: 'block', color: 'var(--muted)', fontSize: 15, padding: '10px 0', borderBottom: '1px solid var(--surface-2)', textDecoration: 'none', transition: 'color 150ms' }} onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')} onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}>
              {link.label}
            </a>
          ))}
          <button className="interact-press" style={{ marginTop: 16, width: '100%', background: 'var(--accent)', color: '#FBF7F1', border: 'none', borderRadius: 999, padding: '10px 18px', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: "'Inter', sans-serif" }} onClick={() => setMenuOpen(false)}>
            {t('nav.install')}
          </button>
        </div>
      )}
    </nav>
  )
}
export default Nav
