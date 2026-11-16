import SectionLabel from '../SectionLabel'
import { useTranslation } from '../../i18n'

const mono = "'JetBrains Mono', monospace"

const STEPS = [
  { n: '01', chip: 'cs_claim_open' },
  { n: '02', chip: 'gate-check' },
  { n: '03', chip: 'qa[]' },
  { n: '04', chip: 'cs_claim_submit' },
]

const VERDICTS = [
  { id: 'pass', name: 'pass', range: '≥ 75', color: 'var(--green)', bg: 'var(--green-tint)' },
  { id: 'partial', name: 'partial-pass', range: '40–74', color: 'var(--yellow)', bg: 'var(--yellow-tint)' },
  { id: 'fail', name: 'fail', range: '↻', color: 'var(--accent-text)', bg: 'var(--accent-tint)' },
  { id: 'revert', name: 'revert', range: '↩', color: 'var(--red)', bg: 'var(--red-tint)' },
]

function ClaimGate() {
  const { t } = useTranslation()
  return (
    <section id="claim-gate" className="section" style={{ maxWidth: 1208, margin: '0 auto', padding: '120px 24px 0' }}>
      <SectionLabel text={t('gate.label')} dot="var(--green)" />
      <h2 className="section-title" style={{ margin: '0 0 20px' }}>{t('gate.title')}</h2>
      <p className="section-subtitle" style={{ marginBottom: 56, maxWidth: 640 }}>{t('gate.subtitle')}</p>

      <div className="gate-steps" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 16 }}>
        {STEPS.map((s, i) => (
          <div key={s.n} className="interact-hover" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 28, display: 'flex', flexDirection: 'column', gap: 14, minWidth: 0 }}>
            <div style={{ fontFamily: mono, fontSize: 14, fontWeight: 700, color: 'var(--accent)' }}>{s.n}</div>
            <div style={{ fontSize: 20, fontWeight: 600, lineHeight: 1.25, color: 'var(--text)' }}>{t(`gate.steps.${i}.title`)}</div>
            <div style={{ fontSize: 15, lineHeight: 1.55, color: 'var(--muted)', flex: 1 }}>{t(`gate.steps.${i}.desc`)}</div>
            <code style={{ alignSelf: 'flex-start', background: 'var(--well)', border: '1px solid var(--border)', borderRadius: 8, padding: '6px 10px', fontFamily: mono, fontSize: 12, color: 'var(--text-2)' }}>{s.chip}</code>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 24, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 24 }}>
          <div style={{ fontFamily: mono, fontSize: 12, color: 'var(--muted)' }}>// {t('gate.verdictLabel')}</div>
          <div style={{ fontFamily: mono, fontSize: 13, color: 'var(--text)' }}>
            confidence = <span style={{ color: 'var(--accent-text)' }}>70%</span> {t('gate.avg')} + <span style={{ color: 'var(--accent-text)' }}>30%</span> {t('gate.weakest')}
          </div>
        </div>
        <div className="gate-verdicts" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 32 }}>
          {VERDICTS.map((v) => (
            <div key={v.id} style={{ display: 'flex', flexDirection: 'column', gap: 10, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ background: v.bg, color: v.color, borderRadius: 999, padding: '4px 10px', fontFamily: mono, fontSize: 12, fontWeight: 500 }}>{v.name}</span>
                <span style={{ fontFamily: mono, fontSize: 18, fontWeight: 700, color: 'var(--text)' }}>{v.range}</span>
              </div>
              <div style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--muted)' }}>{t(`gate.verdict.${v.id}`)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
export default ClaimGate
