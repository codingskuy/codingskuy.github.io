import { useState, useEffect } from 'react'
import { Terminal, X, Menu } from 'lucide-react'
import { useTranslation } from '../i18n'
import { LanguageSwitcher } from '../LanguageSwitcher'

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
    <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: scrolled ? 'rgba(13,17,23,0.92)' : 'transparent', backdropFilter: scrolled ? 'blur(12px)' : 'none', borderBottom: scrolled ? '1px solid #30363D' : '1px solid transparent', transition: 'background 0.25s, border-color 0.25s, backdrop-filter 0.25s' }}>
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 24px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 28, height: 28, background: '#FF8C42', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Terminal size={14} color="#0D1117" /></div>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, fontWeight: 500, color: '#F0F6FC' }}>CodingSchool</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }} className="hidden-mobile">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="link-underline" style={{ color: '#8B949E', fontSize: 14, textDecoration: 'none', transition: 'color 150ms ease-out', position: 'relative' }} onMouseEnter={(e) => (e.currentTarget.style.color = '#F0F6FC')} onMouseLeave={(e) => (e.currentTarget.style.color = '#8B949E')}>
              {link.label}
            </a>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <LanguageSwitcher />
          <button className="interact-press" style={{ background: '#FF8C42', color: '#0D1117', border: 'none', borderRadius: 8, padding: '7px 18px', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: "'Inter', sans-serif" }} onMouseEnter={(e) => { e.currentTarget.style.filter = 'brightness(1.12)'; e.currentTarget.style.boxShadow = '0 0 16px rgba(255, 140, 66,0.3)' }} onMouseLeave={(e) => { e.currentTarget.style.filter = 'none'; e.currentTarget.style.boxShadow = 'none' }}>
            {t('nav.install')}
          </button>
          <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label={t('aria.menu')}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="mobile-drawer" style={{ position: 'absolute', top: 60, left: 0, right: 0, background: 'rgba(13,17,23,0.98)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #30363D', padding: '16px 24px 24px' }}>
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} onClick={() => setMenuOpen(false)} style={{ display: 'block', color: '#8B949E', fontSize: 15, padding: '10px 0', borderBottom: '1px solid #1C2128', textDecoration: 'none', transition: 'color 150ms' }} onMouseEnter={(e) => (e.currentTarget.style.color = '#F0F6FC')} onMouseLeave={(e) => (e.currentTarget.style.color = '#8B949E')}>
              {link.label}
            </a>
          ))}
          <button className="interact-press" style={{ marginTop: 16, width: '100%', background: '#FF8C42', color: '#0D1117', border: 'none', borderRadius: 8, padding: '10px 18px', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: "'Inter', sans-serif" }} onClick={() => setMenuOpen(false)}>
            {t('nav.install')}
          </button>
        </div>
      )}
    </nav>
  )
}
export default Nav
