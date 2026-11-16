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
    <footer style={{ background: 'var(--footer-bg)', borderTop: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 1208, margin: '0 auto', padding: '72px 24px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 400px) repeat(3, minmax(0, 1fr))', gap: 40, marginBottom: 48 }} className="footer-grid">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div className="logo-mark" style={{ width: 30, height: 30, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: mono, fontSize: 13, fontWeight: 700, color: '#FBF7F1' }}>&gt;_</div>
              <span style={{ fontFamily: mono, fontSize: 16, fontWeight: 700, color: 'var(--text)' }}>CodingSchool</span>
            </div>
            <p style={{ color: 'var(--muted)', fontSize: 15, lineHeight: 1.6, maxWidth: 300, margin: 0 }}>{t('footer.desc')}</p>
            <div className="footer-status" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 16, background: 'var(--surface-2)', borderRadius: 999, padding: '6px 14px 6px 12px', fontFamily: mono, fontSize: 12, color: 'var(--muted)' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)', animation: 'dot-pulse 2s infinite' }} /> {t('footer.status')}
            </div>
          </div>
          {columns.map((col) => (
            <div key={col.title} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 14 }}>
              <div className="footer-col-title" style={{ fontFamily: mono, fontSize: 12, color: 'var(--text)' }}>{col.title}</div>
              {col.links.map((link) => (
                <a key={link} href="#" className="link-underline" style={{ color: 'var(--muted)', fontSize: 15, lineHeight: '18px', textDecoration: 'none' }}>{link}</a>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontFamily: mono, fontSize: 12, color: 'var(--muted)' }}>{t('footer.copyright')}</span>
          <div style={{ display: 'flex', gap: 24 }}>
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
