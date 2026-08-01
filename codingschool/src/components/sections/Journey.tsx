import SectionLabel from '../SectionLabel'
import JourneyStep from '../JourneyStep'
import { useTranslation } from '../../i18n'

function Journey() {
  const { t } = useTranslation()
  return (
    <section style={{ maxWidth: 1160, margin: '0 auto', padding: '0 24px 100px' }}>
      <SectionLabel text={t('journey.label')} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }} className="journey-grid">
        <div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, lineHeight: 1.15, color: '#F0F6FC', margin: '0 0 16px', letterSpacing: '-0.02em' }}>
            {t('journey.title')}
          </h2>
          <p style={{ color: '#8B949E', fontSize: 16, lineHeight: 1.65 }}>
            {t('journey.subtitle')}
          </p>
        </div>
        <div>
          {[
            { step: '01', label: t('journey.steps.0.label'), desc: t('journey.steps.0.desc') },
            { step: '02', label: t('journey.steps.1.label'), desc: t('journey.steps.1.desc') },
            { step: '03', label: t('journey.steps.2.label'), desc: t('journey.steps.2.desc') },
            { step: '04', label: t('journey.steps.3.label'), desc: t('journey.steps.3.desc') },
            { step: '05', label: t('journey.steps.4.label'), desc: t('journey.steps.4.desc') },
          ].map((s, i, arr) => (
            <JourneyStep key={s.step} {...s} isLast={i === arr.length - 1} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
export default Journey
