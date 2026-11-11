import { useTranslation } from '../../i18n'

const mono = "'JetBrains Mono', monospace"

function Footer() {
  const { t } = useTranslation()
  const columns = [
    { title: t('footer.product'), links: [0, 1, 2, 3, 4].map((i) => t(`footer.product.links.${i}`)) },
    { title: t('footer.developers'), links: [0, 1, 2, 3, 4].map((i) => t(`footer.developers.links.${i}`)) },
    { title: t('footer.community'), links: [0, 1, 2, 3, 4].map((i) => t(`footer.community.links.${i}`)) },
  ]
  return (
    <footer style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '80px 24px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 64 }} className="footer-grid">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div className="logo-mark" style={{ width: 30, height: 30, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: mono, fontSize: 13, fontWeight: 700, color: '#FBF7F1' }}>&gt;_</div>
              <span style={{ fontFamily: mono, fontSize: 16, fontWeight: 700, color: 'var(--text)' }}>CodingSchool</span>
            </div>
            <p style={{ color: 'var(--muted)', fontSize: 15, lineHeight: 1.65, maxWidth: 300, margin: 0 }}>{t('footer.desc')}</p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 20, background: 'var(--surface-2)', borderRadius: 999, padding: '6px 12px', fontFamily: mono, fontSize: 12, color: 'var(--muted)' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)', animation: 'dot-pulse 2s infinite' }} /> {t('footer.status')}
            </div>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <div style={{ fontFamily: mono, fontSize: 12, fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>{col.title}</div>
              {col.links.map((link) => (
                <a key={link} href="#" className="link-underline" style={{ display: 'table', color: 'var(--muted)', fontSize: 15, textDecoration: 'none', marginBottom: 12 }}>{link}</a>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontFamily: mono, fontSize: 12, color: 'var(--muted)' }}>{t('footer.copyright')}</span>
          <div style={{ display: 'flex', gap: 20 }}>
            {[t('footer.privacy'), t('footer.terms'), t('footer.security')].map((link) => (
              <a key={link} href="#" style={{ fontFamily: mono, fontSize: 12, color: 'var(--muted)', textDecoration: 'none' }}>{link}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
export default Footer
