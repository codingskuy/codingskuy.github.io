import SectionLabel from '../SectionLabel'
import JourneyStep from '../JourneyStep'
import { useTranslation } from '../../i18n'

function Journey() {
  const { t } = useTranslation()
  return (
    <section style={{ maxWidth: 1160, margin: '0 auto', padding: '0 24px 100px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }} className="journey-grid">
        <div style={{ position: 'sticky', top: 120 }}>
          <SectionLabel text={t('journey.label')} dot="var(--green)" />
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, lineHeight: 1.15, color: 'var(--text)', margin: '0 0 20px', letterSpacing: '-0.02em' }}>
            {t('journey.title')}
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: 18, lineHeight: 1.65 }}>
            {t('journey.subtitle')}
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
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
