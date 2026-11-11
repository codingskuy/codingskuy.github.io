import type { ReactNode } from 'react'
import SectionLabel from '../SectionLabel'
import { useTranslation } from '../../i18n'

const mono = "'JetBrains Mono', monospace"

const card = {
  background: 'var(--surface)',
  border: '1px solid var(--border)',
  borderRadius: 16,
  padding: 32,
} as const

function Icon({ bg, color, size, children }: { bg: string; color: string; size: number; children: ReactNode }) {
  return (
    <div style={{ width: size, height: size, flexShrink: 0, background: bg, color, borderRadius: size / 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: mono, fontWeight: 700, fontSize: size > 50 ? 22 : 14 }}>
      {children}
    </div>
  )
}

function SmallCard({ icon, title, description, tags }: { icon: ReactNode; title: string; description: string; tags: string[] }) {
  return (
    <div className="interact-hover" style={{ ...card, flex: 1 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
        {icon}
        <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--text)' }}>{title}</div>
      </div>
      <div style={{ color: 'var(--muted)', fontSize: 16, lineHeight: 1.6, marginBottom: 20 }}>{description}</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {tags.map((tag) => (
          <span key={tag} style={{ background: 'var(--surface-2)', color: 'var(--text)', borderRadius: 999, padding: '5px 12px', fontFamily: mono, fontSize: 12 }}>{tag}</span>
        ))}
      </div>
    </div>
  )
}

function Why() {
  const { t } = useTranslation()
  const checklist = [
    { label: `✔ ${t('why.diagnosis.items.0')}`, status: t('why.diagnosis.done'), done: true },
    { label: `✔ ${t('why.diagnosis.items.1')}`, status: t('why.diagnosis.done'), done: true },
    { label: `→ ${t('why.diagnosis.items.2')}`, status: t('why.diagnosis.building'), done: false },
  ]
  return (
    <section style={{ maxWidth: 1160, margin: '0 auto', padding: '0 24px 100px' }}>
      <SectionLabel text={t('why.label')} />
      <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, lineHeight: 1.15, color: 'var(--text)', margin: '0 0 20px', letterSpacing: '-0.02em' }}>
        {t('why.title')}
      </h2>
      <p style={{ color: 'var(--muted)', fontSize: 18, lineHeight: 1.65, marginBottom: 56, maxWidth: 560 }}>
        {t('why.subtitle')}
      </p>
      <div className="why-bento" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div className="interact-hover" style={{ ...card, display: 'flex', flexDirection: 'column', gap: 20 }}>
          <Icon bg="var(--accent-tint)" color="var(--accent)" size={56}>◎</Icon>
          <div style={{ fontSize: 32, fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.01em' }}>{t('why.diagnosis.title')}</div>
          <div style={{ color: 'var(--muted)', fontSize: 18, lineHeight: 1.6 }}>{t('why.diagnosis.desc')}</div>
          <div style={{ flex: 1 }} />
          <div style={{ background: 'var(--surface-2)', borderRadius: 12, padding: '18px 20px', fontFamily: mono, fontSize: 13 }}>
            <div style={{ color: 'var(--muted)', marginBottom: 12 }}>$ coding-school diagnose</div>
            {checklist.map((row) => (
              <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '4px 0' }}>
                <span style={{ color: row.done ? 'var(--text)' : 'var(--accent-text)' }}>{row.label}</span>
                <span style={{ fontSize: 12, color: row.done ? 'var(--green)' : 'var(--muted)' }}>{row.status}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <SmallCard
            icon={<Icon bg="var(--green-tint)" color="var(--green)" size={44}>{'</>'}</Icon>}
            title={t('why.mentor.title')}
            description={t('why.mentor.desc')}
            tags={[t('why.mentor.items.0'), t('why.mentor.items.1'), t('why.mentor.items.2')]}
          />
          <SmallCard
            icon={<Icon bg="var(--yellow-tint)" color="var(--yellow)" size={44}>↗</Icon>}
            title={t('why.growth.title')}
            description={t('why.growth.desc')}
            tags={[t('why.growth.items.0'), t('why.growth.items.1'), t('why.growth.items.2')]}
          />
        </div>
      </div>
    </section>
  )
}
export default Why
