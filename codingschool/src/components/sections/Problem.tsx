import SectionLabel from '../SectionLabel'
import { useTranslation } from '../../i18n'

const mono = "'JetBrains Mono', monospace"

function Flow({ steps, last }: { steps: string[]; last: 'bad' | 'good' }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8 }}>
      {steps.map((step, i) => {
        const isLast = i === steps.length - 1
        const chip = isLast
          ? last === 'bad'
            ? { background: 'var(--red-tint)', color: 'var(--red)', fontWeight: 400 }
            : { background: 'var(--accent)', color: 'var(--on-accent)', fontWeight: 700 }
          : { background: 'var(--surface-2)', color: 'var(--text)', fontWeight: 400 }
        return (
          <div key={step} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ ...chip, fontFamily: mono, fontSize: 13, lineHeight: '17px', borderRadius: 8, padding: '8px 12px' }}>{step}</span>
            {!isLast && <span style={{ fontFamily: mono, fontSize: 13, color: 'var(--dim)' }}>→</span>}
          </div>
        )
      })}
    </div>
  )
}

function Results({ label, items, mark, markColor, textColor }: { label: string; items: string[]; mark: string; markColor: string; textColor: string }) {
  return (
    <div style={{ marginTop: 24, paddingTop: 24, borderTop: '1px solid var(--border)' }}>
      <div style={{ fontFamily: mono, fontSize: 12, lineHeight: '16px', color: 'var(--muted)', marginBottom: 24 }}>{label}</div>
      {items.map((item) => (
        <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '1.2ch', fontFamily: mono, fontSize: 13, lineHeight: '26px', color: textColor }}>
          <span style={{ color: markColor }}>{mark}</span>
          {item}
        </div>
      ))}
    </div>
  )
}

function Tag({ mark, text, color }: { mark: string; text: string; color: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1.2ch', color, fontFamily: mono, fontSize: 12, lineHeight: '16px', fontWeight: 700, marginBottom: 24 }}>
      <span>{mark}</span>
      {text}
    </div>
  )
}

function Problem() {
  const { t } = useTranslation()
  return (
    <section className="section" style={{ maxWidth: 1208, margin: '0 auto', padding: '120px 24px 0' }}>
      <SectionLabel text={t('problem.label')} dot="var(--red)" />
      <h2 className="section-title" style={{ margin: '0 0 20px', maxWidth: 820 }}>
        {t('problem.title')}
        <br />
        <span style={{ color: 'var(--muted-2)' }}>{t('problem.titleHighlight')}</span>
      </h2>
      <p className="section-subtitle" style={{ marginBottom: 56, maxWidth: 560 }}>{t('problem.subtitle')}</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 48px 1fr', gap: 24 }} className="problem-grid">
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 32 }}>
          <Tag mark="✖" text={t('problem.todaysWorkflow')} color="var(--red)" />
          <Flow
            steps={[t('problem.steps.prompt'), t('problem.steps.copy'), t('problem.steps.paste'), t('problem.steps.ship'), t('problem.steps.forget')]}
            last="bad"
          />
          <Results
            label={t('problem.result')}
            items={[t('problem.results.shallow'), t('problem.results.tutorial'), t('problem.results.debugging'), t('problem.results.growth')]}
            mark="✖"
            markColor="var(--red)"
            textColor="var(--muted)"
          />
        </div>
        <div
          aria-hidden="true"
          style={{ alignSelf: 'center', justifySelf: 'center', width: 48, height: 48, borderRadius: '50%', background: 'var(--surface)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', fontSize: 20, fontWeight: 700 }}
        >
          →
        </div>
        <div
          style={{ background: 'var(--feature-card-bg)', boxShadow: 'var(--feature-card-shadow)', border: '1px solid color-mix(in srgb, var(--accent) 35%, transparent)', borderRadius: 16, padding: 32 }}
        >
          <Tag mark="✔" text={t('problem.codingSchoolMethod')} color="var(--green)" />
          <Flow
            steps={[t('problem.steps.diagnose'), t('problem.steps.teach'), t('problem.steps.build'), t('problem.steps.claim'), t('problem.steps.review'), t('problem.steps.grow')]}
            last="good"
          />
          <Results
            label={t('problem.result')}
            items={[t('problem.csResults.deep'), t('problem.csResults.independent'), t('problem.csResults.strongDebugging'), t('problem.csResults.continuous')]}
            mark="✔"
            markColor="var(--green)"
            textColor="var(--text)"
          />
        </div>
      </div>
    </section>
  )
}
export default Problem
