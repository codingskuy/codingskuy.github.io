import SectionLabel from '../SectionLabel'
import StatCard from '../StatCard'
import { useTranslation } from '../../i18n'
import { useRepoStats } from '../hooks'
import { Star, Download, Users, GitBranch, ArrowRight } from 'lucide-react'

function OpenSource() {
  const { t } = useTranslation()
  const { stars, contributors, installs } = useRepoStats()
  return (
    <section style={{ maxWidth: 1160, margin: '0 auto', padding: '0 24px 100px' }}>
      <SectionLabel text={t('oss.label')} dot="var(--green)" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }} className="stats-grid">
        {[
          { icon: <Star size={16} />, iconBg: 'var(--yellow-tint)', iconColor: 'var(--yellow)', label: t('oss.stars'), numVal: stars, suffix: '' },
          { icon: <Download size={16} />, iconBg: 'var(--accent-tint)', iconColor: 'var(--accent-text)', label: t('oss.installs'), numVal: installs, suffix: '' },
          { icon: <Users size={16} />, iconBg: 'var(--green-tint)', iconColor: 'var(--green)', label: t('oss.contributors'), numVal: contributors, suffix: '' },
          { icon: <GitBranch size={16} />, iconBg: 'var(--surface-2)', iconColor: 'var(--text)', label: t('oss.license'), numVal: 0, suffix: 'MIT' },
        ].map((card, i) => (
          <StatCard key={i} {...card} />
        ))}
      </div>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: '32px 36px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
        <div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>{t('oss.forever')}</div>
          <div style={{ color: 'var(--muted)', fontSize: 15, lineHeight: 1.6, maxWidth: 520 }}>{t('oss.foreverDesc')}</div>
        </div>
        <a
          href="https://github.com/codingskuy/coding-school"
          className="interact-press"
          style={{
            display: 'flex', alignItems: 'center', gap: 8, background: 'var(--text)', borderRadius: 12, padding: '12px 22px', color: 'var(--surface)', fontSize: 15, fontWeight: 600, textDecoration: 'none', fontFamily: "'Inter', sans-serif",
          }}
        >
          {t('oss.viewGithub')} <ArrowRight size={15} />
        </a>
      </div>
    </section>
  )
}
export default OpenSource
