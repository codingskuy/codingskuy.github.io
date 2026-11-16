import SectionLabel from '../SectionLabel'
import CompBar from '../CompBar'
import { useTranslation } from '../../i18n'

const mono = "'JetBrains Mono', monospace"

interface Bar {
  label: string
  value: number
  color: string
}

function ScoreCard({ title, bars }: { title: string; bars: Bar[] }) {
  const avg = Math.round(bars.reduce((sum, b) => sum + b.value, 0) / bars.length)
  return (
    <div className="terminal-glow" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 32, display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ fontFamily: mono, fontSize: 12, color: 'var(--muted)' }}>// {title.toLowerCase()}</div>
          <div style={{ fontSize: 18, fontWeight: 600, color: 'var(--text)' }}>{title}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
          <span style={{ fontFamily: mono, fontSize: 44, fontWeight: 700, color: 'var(--text)', lineHeight: 1, letterSpacing: '-0.03em' }}>{avg}</span>
          <span style={{ fontFamily: mono, fontSize: 14, color: 'var(--muted)' }}>%</span>
        </div>
      </div>
      {bars.map((b) => <CompBar key={b.label} {...b} />)}
    </div>
  )
}

function Competency() {
  const { t } = useTranslation()
  const learning: Bar[] = [
    { label: t('comp.knowledge'), value: 78, color: 'var(--green)' },
    { label: t('comp.implementation'), value: 62, color: 'var(--green)' },
    { label: t('comp.debugging'), value: 85, color: 'var(--green)' },
    { label: t('comp.teaching'), value: 34, color: 'var(--yellow)' },
  ]
  const engineering: Bar[] = [
    { label: t('comp.architecture'), value: 51, color: 'var(--accent)' },
    { label: t('comp.testing'), value: 29, color: 'var(--red)' },
    { label: t('comp.git'), value: 73, color: 'var(--accent)' },
    { label: t('comp.security'), value: 44, color: 'var(--yellow)' },
    { label: t('comp.documentation'), value: 58, color: 'var(--accent)' },
  ]
  return (
    <section className="section" style={{ maxWidth: 1208, margin: '0 auto', padding: '120px 24px 0' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '536fr 560fr', gap: 64, alignItems: 'center' }} className="comp-grid">
        <div style={{ minWidth: 0 }}>
          <SectionLabel text={t('comp.label')} dot="var(--yellow)" />
          <h2 className="section-title" style={{ margin: '0 0 20px', fontSize: 'clamp(30px, 4vw, 44px)', lineHeight: 1.09 }}>
            {t('comp.title1')}<br /><span style={{ color: 'var(--accent-text)' }}>{t('comp.title2')}</span>
          </h2>
          <p className="section-subtitle" style={{ marginBottom: 20, lineHeight: 1.6 }}>{t('comp.subtitle')}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[0, 1, 2, 3].map((i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--text)', fontSize: 16, lineHeight: 1.4 }}>
                <span style={{ width: 22, height: 22, borderRadius: 999, background: 'var(--green-tint)', color: 'var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: mono, fontSize: 11, fontWeight: 700, flexShrink: 0 }}>✔</span>
                {t(`comp.items.${i}`)}
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, minWidth: 0 }}>
          <ScoreCard title={t('comp.learning')} bars={learning} />
          <ScoreCard title={t('comp.engineering')} bars={engineering} />
        </div>
      </div>
    </section>
  )
}
export default Competency
