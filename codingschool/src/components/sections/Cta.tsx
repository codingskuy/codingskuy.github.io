import { Download } from 'lucide-react'
import GithubIcon from '../GithubIcon'
import CopyButton from '../CopyButton'
import { useTranslation } from '../../i18n'

function Cta() {
  const { t } = useTranslation()
  return (
    <section style={{ background: '#161B22', borderTop: '1px solid #30363D', borderBottom: '1px solid #30363D', padding: '96px 24px', textAlign: 'center' }}>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#8B949E', marginBottom: 24, letterSpacing: 1 }}>// {t('cta.label')}</div>
      <h2 style={{ fontSize: 'clamp(32px, 5vw, 54px)', fontWeight: 700, lineHeight: 1.1, color: '#F0F6FC', margin: '0 0 16px', letterSpacing: '-0.02em' }}>
        {t('cta.title')}
      </h2>
      <p style={{ color: '#8B949E', fontSize: 18, lineHeight: 1.65, marginBottom: 44, maxWidth: 440, margin: '0 auto 44px' }}>
        {t('cta.subtitle')}
      </p>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
        <button className="interact-press" style={{ background: '#FF8C42', color: '#0D1117', border: 'none', borderRadius: 10, padding: '14px 28px', fontSize: 16, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontFamily: "'Inter', sans-serif" }}>
          <Download size={16} /> {t('cta.install')}
        </button>
        <a href="https://github.com/codingskuy/coding-school" className="interact-press" style={{ background: 'transparent', color: '#F0F6FC', border: '1px solid #30363D', borderRadius: 10, padding: '14px 28px', fontSize: 16, fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', fontFamily: "'Inter', sans-serif" }}>
          <GithubIcon size={16} /> {t('cta.viewGithub')}
        </a>
      </div>
      <div
        className="install-cmd"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 12, background: '#0D1117', border: '1px solid #30363D', borderRadius: 8, padding: '12px 20px', marginTop: 36, fontFamily: "'JetBrains Mono', monospace", fontSize: 14, color: '#8B949E', cursor: 'pointer',
        }}
        onClick={() => {
          navigator.clipboard.writeText('npm i @codingskuy/coding-school && npx coding-school setup')
          window.dispatchEvent(new CustomEvent('copy-success', { detail: { message: 'Copied to clipboard' } }))
        }}
      >
        <span style={{ color: '#3FB950' }}>$</span>
        <span>npm i @codingskuy/coding-school</span>
        <span style={{ color: '#8B949E', fontSize: 12 }}>&</span>
        <span>$ npx coding-school setup</span>
        <CopyButton text="npm i @codingskuy/coding-school && npx coding-school setup" />
      </div>
    </section>
  )
}
export default Cta
