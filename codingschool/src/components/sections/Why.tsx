import SectionLabel from '../SectionLabel'
import { useTranslation } from '../../i18n'

const mono = "'JetBrains Mono', monospace"

function IconBox({ glyph, color, bg, size, radius, fontSize }: { glyph: string; color: string; bg: string; size: number; radius: number; fontSize: number }) {
  return (
    <div style={{ width: size, height: size, flexShrink: 0, background: bg, color, borderRadius: radius, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: mono, fontWeight: 700, fontSize }}>
      {glyph}
    </div>
  )
}

function SmallCard({ glyph, glyphSize, color, bg, title, description, tags }: { glyph: string; glyphSize: number; color: string; bg: string; title: string; description: string; tags: string[] }) {
  return (
    <div className="interact-hover" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 32, flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <IconBox glyph={glyph} color={color} bg={bg} size={44} radius={12} fontSize={glyphSize} />
        <div style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.25, color: 'var(--text)' }}>{title}</div>
      </div>
      <div style={{ color: 'var(--muted)', fontSize: 16, lineHeight: 1.625 }}>{description}</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {tags.map((tag) => (
          <span key={tag} style={{ background: 'var(--surface-2)', color: 'var(--text)', borderRadius: 999, padding: '6px 12px', fontFamily: mono, fontSize: 12, lineHeight: '16px' }}>{tag}</span>
        ))}
      </div>
    </div>
  )
}

function Why() {
  const { t } = useTranslation()
  const checklist = [
    { label: t('why.diagnosis.items.0'), status: t('why.diagnosis.done'), done: true },
    { label: t('why.diagnosis.items.1'), status: t('why.diagnosis.done'), done: true },
    { label: t('why.diagnosis.items.2'), status: t('why.diagnosis.building'), done: false },
  ]
  return (
    <section className="section" style={{ maxWidth: 1208, margin: '0 auto', padding: '120px 24px 0' }}>
      <SectionLabel text={t('why.label')} />
      <h2 className="section-title" style={{ margin: '0 0 20px' }}>{t('why.title')}</h2>
      <p className="section-subtitle" style={{ marginBottom: 56, maxWidth: 560 }}>{t('why.subtitle')}</p>
      <div className="why-bento" style={{ display: 'grid', gridTemplateColumns: '640fr 496fr', gap: 24 }}>
        <div className="interact-hover" style={{ background: 'var(--feature-card-bg)', border: '1px solid var(--border)', borderRadius: 16, padding: 40, display: 'flex', flexDirection: 'column', gap: 20 }}>
          <IconBox glyph="◎" color="var(--accent)" bg="var(--accent-tint)" size={52} radius={14} fontSize={22} />
          <div style={{ fontSize: 32, fontWeight: 700, lineHeight: 1.1875, color: 'var(--text)' }}>{t('why.diagnosis.title')}</div>
          <div style={{ color: 'var(--muted)', fontSize: 18, lineHeight: 1.6 }}>{t('why.diagnosis.desc')}</div>
          <div style={{ flex: 1 }} />
          <div style={{ background: 'var(--well)', borderRadius: 12, padding: '20px 24px', fontFamily: mono, fontSize: 13, lineHeight: '17px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ color: 'var(--muted)' }}>$ coding-school diagnose</div>
            {checklist.map((row) => (
              <div key={row.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                <span style={{ color: row.done ? 'var(--text)' : 'var(--accent-text)' }}>
                  {row.done ? '✔' : '→'} {row.label}
                </span>
                <span style={{ fontSize: 12, color: row.done ? 'var(--green)' : 'var(--muted)' }}>{row.status}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <SmallCard
            glyph="</>"
            glyphSize={14}
            color="var(--green)"
            bg="var(--green-tint)"
            title={t('why.mentor.title')}
            description={t('why.mentor.desc')}
            tags={[t('why.mentor.items.0'), t('why.mentor.items.1'), t('why.mentor.items.2')]}
          />
          <SmallCard
            glyph="↗"
            glyphSize={18}
            color="var(--yellow)"
            bg="var(--yellow-tint)"
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
