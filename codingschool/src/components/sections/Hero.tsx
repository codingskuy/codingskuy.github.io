import { Download, ArrowRight } from 'lucide-react'
import TerminalWindow from '../TerminalWindow'
import { useTranslation } from '../../i18n'
import { useRepoStats } from '../hooks'
import { Star, Users } from 'lucide-react'

function Hero() {
  const { t } = useTranslation()
  const { stars, contributors, installs } = useRepoStats()
  return (
    <div style={{ position: 'relative', overflowX: 'clip' }}>
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 20,
          left: '50%',
          width: 760,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(closest-side, #F59E0B 0%, var(--accent) 50%, rgba(232, 101, 15, 0) 100%)',
          opacity: 0.2,
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />
      <section
        style={{
          position: 'relative',
          maxWidth: 1208,
          margin: '0 auto',
          padding: '176px 24px 24px',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 680px) 432px',
          justifyContent: 'space-between',
          gap: 48,
          alignItems: 'center',
        }}
        className="hero-grid"
      >
        <div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 999,
              padding: '7px 14px 7px 12px',
              marginBottom: 28,
            }}
          >
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--green)' }} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: 'var(--muted)' }}>
              {t('hero.badge')}
            </span>
          </div>
          <h1
            style={{
              fontSize: 'clamp(36px, 5vw, 64px)',
              fontWeight: 700,
              lineHeight: 1.05,
              color: 'var(--text)',
              margin: '0 0 28px',
              letterSpacing: '-0.03em',
            }}
          >
            <span style={{ display: 'block' }}>{t('hero.title1')}</span>
            <span className="accent-text" style={{ display: 'inline-block' }}>{t('hero.title2')}</span>
          </h1>
          <p style={{ fontSize: 18, color: 'var(--muted)', lineHeight: 1.65, margin: '0 0 28px', maxWidth: 480 }}>
            {t('hero.subtitle')}
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button
              className="interact-press btn-primary"
              style={{
                background: 'var(--accent)',
                color: '#FBF7F1',
                border: 'none',
                borderRadius: 12,
                padding: '16px 26px',
                fontSize: 16,
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              <Download size={16} />
              {t('hero.install')}
            </button>
            <a
              href="https://github.com/codingskuy/coding-school"
              className="interact-press btn-secondary"
              style={{
                background: 'var(--surface)',
                color: 'var(--text)',
                border: '1px solid var(--border)',
                borderRadius: 12,
                padding: '16px 26px',
                fontSize: 16,
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                textDecoration: 'none',
                fontFamily: "'Inter', sans-serif",
              }}
            >
              {t('hero.viewGithub')}
              <ArrowRight size={16} color="var(--muted)" />
            </a>
          </div>
          <div style={{ marginTop: 28, display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {[
              { icon: <Star size={13} />, text: t('hero.stars', { count: stars }) },
              { icon: <Users size={13} />, text: t('hero.contributors', { count: contributors }) },
              { icon: <Download size={13} />, text: t('hero.installs', { count: installs }) },
            ].map(({ icon, text }, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  color: 'var(--muted)',
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
        <div>
          <TerminalWindow />
        </div>
      </section>
    </div>
  )
}

export default Hero
