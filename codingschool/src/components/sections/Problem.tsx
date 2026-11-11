import SectionLabel from '../SectionLabel'
import { useTranslation } from '../../i18n'
import { ArrowRight } from 'lucide-react'

const mono = "'JetBrains Mono', monospace"

function Flow({ steps, last }: { steps: string[]; last: 'bad' | 'good' }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8 }}>
      {steps.map((step, i) => {
        const isLast = i === steps.length - 1
        const chip = isLast
          ? last === 'bad'
            ? { background: 'var(--red-tint)', color: 'var(--red)', fontWeight: 400 }
            : { background: 'var(--accent)', color: '#FBF7F1', fontWeight: 700 }
          : { background: 'var(--surface-2)', color: 'var(--text)', fontWeight: 400 }
        return (
          <div key={step} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ ...chip, fontFamily: mono, fontSize: 13, borderRadius: 8, padding: '6px 12px' }}>{step}</span>
            {!isLast && <span style={{ fontFamily: mono, fontSize: 13, color: 'var(--dim)' }}>→</span>}
          </div>
        )
      })}
    </div>
  )
}

function Results({ label, items, mark, color, textColor }: { label: string; items: string[]; mark: string; color: string; textColor: string }) {
  return (
    <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--border)' }}>
      <div style={{ fontFamily: mono, fontSize: 12, color: 'var(--muted)', marginBottom: 12 }}>{label}</div>
      {items.map((item) => (
        <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 8, color: textColor, fontSize: 13, marginBottom: 8, fontFamily: mono }}>
          <span style={{ color }}>{mark}</span> {item}
        </div>
      ))}
    </div>
  )
}

function Problem() {
  const { t } = useTranslation()
  return (
    <section style={{ maxWidth: 1160, margin: '0 auto', padding: '0 24px 100px' }}>
      <SectionLabel text={t('problem.label')} dot="var(--red)" />
      <h2
        style={{
          fontSize: 'clamp(28px, 4vw, 44px)',
          fontWeight: 700,
          lineHeight: 1.15,
          color: 'var(--text)',
          margin: '0 0 20px',
          maxWidth: 760,
          letterSpacing: '-0.02em',
        }}
      >
        {t('problem.title')}
        <br />
        <span style={{ color: 'var(--muted-2)' }}>{t('problem.titleHighlight')}</span>
      </h2>
      <p style={{ color: 'var(--muted)', fontSize: 18, lineHeight: 1.65, marginBottom: 56, maxWidth: 560 }}>
        {t('problem.subtitle')}
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 72px 1fr', gap: 0, alignItems: 'center' }} className="problem-grid">
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: '28px 28px 32px', height: '100%' }}>
          <div style={{ fontFamily: mono, fontSize: 12, fontWeight: 700, color: 'var(--red)', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span>✖</span> {t('problem.todaysWorkflow')}
          </div>
          <Flow
            steps={[t('problem.steps.prompt'), t('problem.steps.copy'), t('problem.steps.paste'), t('problem.steps.ship'), t('problem.steps.forget')]}
            last="bad"
          />
          <Results
            label={t('problem.result')}
            items={[t('problem.results.shallow'), t('problem.results.tutorial'), t('problem.results.debugging'), t('problem.results.growth')]}
            mark="✖"
            color="var(--red)"
            textColor="var(--muted)"
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="problem-arrow" style={{ width: 44, height: 44, borderRadius: 999, background: 'var(--surface)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', animation: 'scale-in 400ms ease-out forwards' }}>
            <ArrowRight size={20} />
          </div>
        </div>
        <div style={{ background: 'var(--surface)', border: '1px solid rgba(232, 101, 15, 0.35)', borderRadius: 16, padding: '28px 28px 32px', height: '100%', boxShadow: '0 12px 32px rgba(232, 101, 15, 0.10)' }}>
          <div style={{ fontFamily: mono, fontSize: 12, fontWeight: 700, color: 'var(--green)', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span>✔</span> {t('problem.codingSchoolMethod')}
          </div>
          <Flow
            steps={[t('problem.steps.diagnose'), t('problem.steps.understand'), t('problem.steps.build'), t('problem.steps.review'), t('problem.steps.reflect'), t('problem.steps.grow')]}
            last="good"
          />
          <Results
            label={t('problem.result')}
            items={[t('problem.csResults.deep'), t('problem.csResults.independent'), t('problem.csResults.strongDebugging'), t('problem.csResults.continuous')]}
            mark="✔"
            color="var(--green)"
            textColor="var(--text)"
          />
        </div>
      </div>
    </section>
  )
}
export default Problem
