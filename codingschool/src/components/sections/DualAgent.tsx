import SectionLabel from '../SectionLabel'
import { useTranslation } from '../../i18n'

const mono = "'JetBrains Mono', monospace"

function AgentCard({ color, title, tag, items }: { color: string; title: string; tag: string; items: string[] }) {
  return (
    <div className="glow-border" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 32, textAlign: 'left' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: color, flexShrink: 0 }} />
        <span style={{ fontSize: 20, fontWeight: 600, lineHeight: '24px', color: 'var(--text)', flex: 1 }}>{title}</span>
        <span style={{ fontFamily: mono, fontSize: 12, color }}>{tag}</span>
      </div>
      {items.map((item, i) => (
        <div key={item} style={{ fontFamily: mono, fontSize: 14, lineHeight: 2.2, color: 'var(--text)', display: 'flex', gap: '3ch' }}>
          <span>{String(i + 1).padStart(2, '0')}</span>
          {item}
        </div>
      ))}
    </div>
  )
}

function DualAgent() {
  const { t } = useTranslation()
  const rows = [1, 2, 3, 4].map((r) => [t(`dual.table.row${r}.label`), t(`dual.table.row${r}.col1`), t(`dual.table.row${r}.col2`), t(`dual.table.row${r}.col3`)])
  return (
    <div className="band">
      <section className="section" style={{ maxWidth: 1208, margin: '0 auto', padding: '120px 24px' }}>
        <div style={{ textAlign: 'center' }}>
          <SectionLabel text={t('dual.label')} dot="var(--accent-2)" />
          <h2 className="section-title" style={{ margin: '0 0 20px' }}>{t('dual.title')}</h2>
          <p className="section-subtitle" style={{ margin: '0 auto 64px', maxWidth: 620 }}>{t('dual.subtitle')}</p>
        </div>
        <div className="dual-diagram" style={{ display: 'grid', gridTemplateColumns: '1fr 56px 208px 56px 1fr', alignItems: 'stretch', marginBottom: 64 }}>
          <AgentCard
            color="var(--green)"
            title={t('dual.learnAgent')}
            tag={t('dual.learnTag')}
            items={[0, 1, 2, 3, 4, 5].map((i) => t(`dual.learn.items.${i}`))}
          />
          <div className="dual-connector" style={{ alignSelf: 'center', height: 2, background: 'linear-gradient(90deg, var(--border), var(--accent))' }} />
          <div className="student-model">
            <span style={{ fontFamily: mono, fontSize: 18, fontWeight: 700, color: 'var(--accent-text)' }}>{'{ you }'}</span>
            <span style={{ fontSize: 18, fontWeight: 600, color: 'var(--text)' }}>{t('dual.studentModel')}</span>
          </div>
          <div className="dual-connector" style={{ alignSelf: 'center', height: 2, background: 'linear-gradient(90deg, var(--accent), var(--border))' }} />
          <AgentCard
            color="var(--accent)"
            title={t('dual.coachAgent')}
            tag={t('dual.coachTag')}
            items={[0, 1, 2, 3, 4].map((i) => t(`dual.coach.items.${i}`))}
          />
        </div>
        <div className="comparison-table-wrap" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflowX: 'auto', overflowY: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '220fr 313fr 313fr 313fr', background: 'var(--surface-2)', borderBottom: '1px solid var(--border)', minWidth: 600 }}>
            {['', t('dual.table.header1'), t('dual.table.header2'), t('dual.table.header3')].map((col, i) => (
              <div key={i} style={{ padding: '16px 28px', fontFamily: mono, fontSize: 12, lineHeight: '16px', letterSpacing: '0.06em', textTransform: 'uppercase', background: i === 3 ? 'color-mix(in srgb, var(--accent) 12%, transparent)' : 'transparent', color: i === 3 ? 'var(--accent-text)' : 'var(--muted)', fontWeight: i === 3 ? 700 : 500, display: 'flex', alignItems: 'center', gap: 8 }}>
                {i === 3 && <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-text)' }} />}
                {col}
              </div>
            ))}
          </div>
          {rows.map(([label, ...cols], rowIdx) => (
            <div key={rowIdx} style={{ display: 'grid', gridTemplateColumns: '220fr 313fr 313fr 313fr', borderBottom: rowIdx < rows.length - 1 ? '1px solid var(--border)' : 'none', minWidth: 600 }}>
              <div style={{ padding: '20px 28px', fontSize: 16, lineHeight: '19px', fontWeight: 600, color: 'var(--text)' }}>{label}</div>
              {cols.map((cell, i) => (
                <div key={i} style={{ padding: '20px 28px', fontSize: 16, lineHeight: '19px', background: i === 2 ? 'color-mix(in srgb, var(--accent) 6%, transparent)' : 'transparent', color: i === 2 ? 'var(--text)' : 'var(--muted)', fontWeight: i === 2 ? 500 : 400 }}>
                  {cell}
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
export default DualAgent
