import { Download, ArrowRight } from 'lucide-react'
import CopyButton from '../CopyButton'
import SectionLabel from '../SectionLabel'
import { useTranslation } from '../../i18n'

const mono = "'JetBrains Mono', monospace"
const INSTALL_CMD = 'npm i @codingskuy/coding-school && npx coding-school setup'

function Cta() {
  const { t } = useTranslation()
  return (
    <section style={{ maxWidth: 1160, margin: '0 auto', padding: '96px 24px' }}>
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, var(--cta-from) 0%, var(--cta-to) 100%)',
          border: '1px solid var(--cta-border)',
          borderRadius: 24,
          padding: 'clamp(56px, 8vw, 96px) clamp(20px, 6vw, 80px)',
          textAlign: 'center',
        }}
      >
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: -120,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 640,
            height: 360,
            borderRadius: '50%',
            background: 'radial-gradient(closest-side, #F59E0B, rgba(245, 158, 11, 0))',
            opacity: 0.22,
            filter: 'blur(60px)',
            pointerEvents: 'none',
          }}
        />
        <div style={{ position: 'relative' }}>
          <SectionLabel text={t('cta.label')} />
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 700, lineHeight: 1.1, color: 'var(--text)', margin: '0 0 16px', letterSpacing: '-0.02em' }}>
            {t('cta.title')}
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: 18, lineHeight: 1.65, maxWidth: 480, margin: '0 auto 40px' }}>
            {t('cta.subtitle')}
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="interact-press btn-primary" style={{ background: 'var(--accent)', color: '#FBF7F1', border: 'none', borderRadius: 12, padding: '14px 28px', fontSize: 16, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontFamily: "'Inter', sans-serif" }}>
              <Download size={16} /> {t('cta.install')}
            </button>
            <a href="https://github.com/codingskuy/coding-school" className="interact-press btn-secondary" style={{ background: 'var(--surface)', color: 'var(--text)', border: '1px solid var(--border)', borderRadius: 12, padding: '14px 28px', fontSize: 16, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', fontFamily: "'Inter', sans-serif" }}>
              {t('cta.viewGithub')} <ArrowRight size={16} color="var(--muted)" />
            </a>
          </div>
          <div
            className="install-cmd cta-cmd-wrap"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', justifyContent: 'center', background: '#231E19', borderRadius: 12, padding: '12px 14px 12px 20px', marginTop: 36, fontFamily: mono, fontSize: 14, color: '#F0F6FC', cursor: 'pointer',
            }}
            onClick={() => {
              navigator.clipboard.writeText(INSTALL_CMD)
              window.dispatchEvent(new CustomEvent('copy-success', { detail: { message: 'Copied to clipboard' } }))
            }}
          >
            <span style={{ color: '#3FB950', fontWeight: 700 }}>$</span>
            <span>npm i @codingskuy/coding-school</span>
            <span style={{ color: '#8B949E', fontSize: 12 }}>&amp;&amp;</span>
            <span>npx coding-school setup</span>
            <CopyButton text={INSTALL_CMD} dark />
          </div>
        </div>
      </div>
    </section>
  )
}
export default Cta
