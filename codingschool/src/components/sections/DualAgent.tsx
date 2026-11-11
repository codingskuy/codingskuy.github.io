import type { ReactNode } from 'react'
import SectionLabel from '../SectionLabel'
import { useTranslation } from '../../i18n'

const mono = "'JetBrains Mono', monospace"

function AgentCard({ icon, iconBg, color, title, items }: { icon: ReactNode; iconBg: string; color: string; title: string; items: string[] }) {
  return (
    <div className="glow-border" style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', textAlign: 'left' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
        <div style={{ width: 28, height: 28, borderRadius: 8, background: iconBg, color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: mono, fontSize: 14 }}>{icon}</div>
        <span style={{ fontFamily: mono, fontSize: 15, fontWeight: 700, color }}>{title}</span>
      </div>
      {items.map((item) => (
        <div key={item} style={{ fontFamily: mono, fontSize: 14, color: 'var(--text)', padding: '4px 0', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ color: 'var(--dim)' }}>›</span> {item}
        </div>
      ))}
    </div>
  )
}

function DualAgent() {
  const { t } = useTranslation()
  return (
    <section style={{ maxWidth: 1160, margin: '0 auto', padding: '0 24px 100px' }}>
      <div style={{ textAlign: 'center' }}>
        <SectionLabel text={t('dual.label')} dot="var(--green)" />
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, lineHeight: 1.15, color: 'var(--text)', margin: '0 0 20px', letterSpacing: '-0.02em' }}>
          {t('dual.title')}
        </h2>
        <p style={{ color: 'var(--muted)', fontSize: 18, lineHeight: 1.65, margin: '0 auto 64px', maxWidth: 560 }}>
          {t('dual.subtitle')}
        </p>
      </div>
      <div className="dual-diagram-wrap" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: '48px 40px', textAlign: 'center', marginBottom: 40 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'var(--accent-tint-2)', border: '1px solid var(--accent)', borderRadius: 999, padding: '10px 24px', fontFamily: mono, fontSize: 14, fontWeight: 700, color: 'var(--accent-text)' }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)' }} />
          {t('dual.studentModel')}
        </div>
        <div className="hidden-mobile" style={{ width: 1, height: 24, background: 'var(--border-strong)', margin: '0 auto' }} />
        <div className="hidden-mobile" style={{ width: '50%', height: 24, margin: '0 auto', border: '1px solid var(--border-strong)', borderBottom: 'none', borderRadius: '8px 8px 0 0' }} />
        <div className="dual-agent-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 0 }}>
          <AgentCard
            icon="▤"
            iconBg="var(--green-tint)"
            color="var(--green)"
            title={t('dual.learnAgent')}
            items={[t('dual.learn.items.0'), t('dual.learn.items.1'), t('dual.learn.items.2'), t('dual.learn.items.3'), t('dual.learn.items.4'), t('dual.learn.items.5')]}
          />
          <AgentCard
            icon="◈"
            iconBg="var(--accent-tint)"
            color="var(--accent-text)"
            title={t('dual.coachAgent')}
            items={[t('dual.coach.items.0'), t('dual.coach.items.1'), t('dual.coach.items.2'), t('dual.coach.items.3'), t('dual.coach.items.4')]}
          />
        </div>
      </div>
      <div className="comparison-table-wrap" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflowX: 'auto', overflowY: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', background: 'var(--surface-2)', borderBottom: '1px solid var(--border)', minWidth: 560 }}>
          {['', t('dual.table.header1'), t('dual.table.header2'), t('dual.table.header3')].map((col, i) => (
            <div key={i} style={{ padding: '14px 20px', fontFamily: mono, fontSize: 12, background: i === 3 ? 'var(--accent-tint-2)' : 'transparent', color: i === 3 ? 'var(--accent-text)' : 'var(--muted)', fontWeight: i === 3 ? 700 : 400 }}>{col}</div>
          ))}
        </div>
        {[
          [t('dual.table.row1.label'), t('dual.table.row1.col1'), t('dual.table.row1.col2'), t('dual.table.row1.col3')],
          [t('dual.table.row2.label'), t('dual.table.row2.col1'), t('dual.table.row2.col2'), t('dual.table.row2.col3')],
          [t('dual.table.row3.label'), t('dual.table.row3.col1'), t('dual.table.row3.col2'), t('dual.table.row3.col3')],
          [t('dual.table.row4.label'), t('dual.table.row4.col1'), t('dual.table.row4.col2'), t('dual.table.row4.col3')],
        ].map(([label, ...cols], rowIdx) => (
          <div key={rowIdx} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', borderBottom: rowIdx < 3 ? '1px solid var(--border)' : 'none', minWidth: 560 }}>
            <div style={{ padding: '16px 20px', fontFamily: mono, fontSize: 14, color: 'var(--text)' }}>{label}</div>
            {cols.map((cell, i) => (
              <div key={i} style={{ padding: '16px 20px', fontSize: 15, background: i === 2 ? 'var(--accent-tint-2)' : 'transparent', color: i === 2 ? 'var(--green)' : 'var(--muted)', fontWeight: i === 2 ? 600 : 400 }}>
                {i === 2 && <span style={{ marginRight: 6 }}>✔</span>}{cell}
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
export default DualAgent
