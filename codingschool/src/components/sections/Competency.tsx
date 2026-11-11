import SectionLabel from '../SectionLabel'
import CompBar from '../CompBar'
import { useTranslation } from '../../i18n'

const mono = "'JetBrains Mono', monospace"

interface Bar {
  label: string
  value: number
  color: string
}

function ScoreCard({ tag, title, bars, avgLabel }: { tag: string; title: string; bars: Bar[]; avgLabel: string }) {
  const avg = Math.round(bars.reduce((sum, b) => sum + b.value, 0) / bars.length)
  return (
    <div className="terminal-glow" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 28 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24 }}>
        <div>
          <div style={{ fontFamily: mono, fontSize: 12, color: 'var(--muted)', marginBottom: 4 }}>// {tag.toLowerCase()}</div>
          <div style={{ fontSize: 18, fontWeight: 600, color: 'var(--text)' }}>{title}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
          <span style={{ fontFamily: mono, fontSize: 44, fontWeight: 700, color: 'var(--text)', lineHeight: 1 }}>{avg}</span>
          <span style={{ fontFamily: mono, fontSize: 14, color: 'var(--muted)' }}>{avgLabel}</span>
        </div>
      </div>
      {bars.map((b) => <CompBar key={b.label} {...b} />)}
    </div>
  )
}

function Competency() {
  const { t } = useTranslation()
  return (
    <section style={{ maxWidth: 1160, margin: '0 auto', padding: '0 24px 100px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }} className="comp-grid">
        <div>
          <SectionLabel text={t('comp.label')} dot="var(--yellow)" />
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, lineHeight: 1.15, color: 'var(--text)', margin: '0 0 20px', letterSpacing: '-0.02em' }}>
            {t('comp.title1')}<br /><span style={{ color: 'var(--accent-text)' }}>{t('comp.title2')}</span>
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: 18, lineHeight: 1.65, marginBottom: 32 }}>
            {t('comp.subtitle')}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[t('comp.items.0'), t('comp.items.1'), t('comp.items.2'), t('comp.items.3')].map((item) => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--text)', fontSize: 16, lineHeight: 1.5 }}>
                <span style={{ width: 22, height: 22, borderRadius: 999, background: 'var(--green-tint)', color: 'var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: mono, fontSize: 11, fontWeight: 700, flexShrink: 0 }}>✔</span>
                {item}
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <ScoreCard
            tag={t('comp.learning')}
            title={t('comp.learning')}
            avgLabel={t('comp.avg')}
            bars={[
              { label: t('comp.knowledge'), value: 78, color: 'var(--green)' },
              { label: t('comp.implementation'), value: 62, color: 'var(--green)' },
              { label: t('comp.debugging'), value: 85, color: 'var(--green)' },
              { label: t('comp.teaching'), value: 34, color: 'var(--yellow)' },
            ]}
          />
          <ScoreCard
            tag={t('comp.engineering')}
            title={t('comp.engineering')}
            avgLabel={t('comp.avg')}
            bars={[
              { label: t('comp.architecture'), value: 51, color: 'var(--accent)' },
              { label: t('comp.testing'), value: 29, color: 'var(--red)' },
              { label: t('comp.git'), value: 73, color: 'var(--accent)' },
              { label: t('comp.security'), value: 44, color: 'var(--yellow)' },
              { label: t('comp.documentation'), value: 58, color: 'var(--accent)' },
            ]}
          />
        </div>
      </div>
    </section>
  )
}
export default Competency
