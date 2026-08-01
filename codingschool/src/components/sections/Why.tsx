import SectionLabel from '../SectionLabel'
import FeatureCard from '../FeatureCard'
import { useTranslation } from '../../i18n'
import { Brain, Code2, Zap } from 'lucide-react'

function Why() {
  const { t } = useTranslation()
  return (
    <section style={{ maxWidth: 1160, margin: '0 auto', padding: '0 24px 100px' }}>
      <SectionLabel text={t('why.label')} />
      <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, lineHeight: 1.15, color: '#F0F6FC', margin: '0 0 16px', letterSpacing: '-0.02em' }}>
        {t('why.title')}
      </h2>
      <p style={{ color: '#8B949E', fontSize: 16, lineHeight: 1.65, marginBottom: 52, maxWidth: 520 }}>
        {t('why.subtitle')}
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }} className="cards-grid">
        <FeatureCard
          icon={<Brain size={18} />}
          title={t('why.diagnosis.title')}
          description={t('why.diagnosis.desc')}
          items={[t('why.diagnosis.items.0'), t('why.diagnosis.items.1'), t('why.diagnosis.items.2')]}
        />
        <FeatureCard
          icon={<Code2 size={18} />}
          title={t('why.mentor.title')}
          description={t('why.mentor.desc')}
          items={[t('why.mentor.items.0'), t('why.mentor.items.1'), t('why.mentor.items.2')]}
        />
        <FeatureCard
          icon={<Zap size={18} />}
          title={t('why.growth.title')}
          description={t('why.growth.desc')}
          items={[t('why.growth.items.0'), t('why.growth.items.1'), t('why.growth.items.2')]}
        />
      </div>
    </section>
  )
}
export default Why
