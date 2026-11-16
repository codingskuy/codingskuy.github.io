import SectionLabel from '../SectionLabel'
import JourneyStep from '../JourneyStep'
import { useTranslation } from '../../i18n'

const STEPS = ['01', '02', '03', '04', '05']

function Journey() {
  const { t } = useTranslation()
  return (
    <section className="section" style={{ maxWidth: 1208, margin: '0 auto', padding: '120px 24px 0' }}>
      <div className="comp-grid" style={{ display: 'grid', gridTemplateColumns: '556fr 540fr', gap: 64, alignItems: 'start' }}>
        <div style={{ minWidth: 0 }}>
          <SectionLabel text={t('journey.label')} dot="var(--green)" />
          <h2 className="section-title" style={{ margin: '0 0 20px', fontSize: 'clamp(30px, 4vw, 44px)', lineHeight: 1.09 }}>{t('journey.title')}</h2>
          <p className="section-subtitle" style={{ marginBottom: 0, lineHeight: 1.6 }}>{t('journey.subtitle')}</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 0 }}>
          {STEPS.map((step, i) => (
            <JourneyStep key={step} step={step} highlight={i === STEPS.length - 1} label={t(`journey.steps.${i}.label`)} desc={t(`journey.steps.${i}.desc`)} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
export default Journey
