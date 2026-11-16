import SectionLabel from '../SectionLabel'
import StatCard from '../StatCard'
import { useTranslation } from '../../i18n'
import { useRepoStats } from '../hooks'
import { Star, ArrowDown, CircleDot, GitFork, ArrowRight } from 'lucide-react'

function OpenSource() {
  const { t } = useTranslation()
  const { stars, contributors, installs } = useRepoStats()
  return (
    <section className="section" style={{ maxWidth: 1208, margin: '0 auto', padding: '120px 24px 0' }}>
      <SectionLabel text={t('oss.label')} dot="var(--green)" />
      <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginTop: 32 }}>
        <StatCard icon={<Star size={15} fill="currentColor" />} iconBg="var(--yellow-tint)" iconColor="var(--yellow)" label={t('oss.stars')} numVal={stars} suffix="" />
        <StatCard icon={<ArrowDown size={15} strokeWidth={2.5} />} iconBg="var(--accent-tint)" iconColor="var(--accent-text)" label={t('oss.installs')} numVal={installs} suffix="" />
        <StatCard icon={<CircleDot size={15} strokeWidth={2.5} />} iconBg="var(--green-tint)" iconColor="var(--green)" label={t('oss.contributors')} numVal={contributors} suffix="" />
        <StatCard icon={<GitFork size={15} strokeWidth={2.5} />} iconBg="var(--surface-2)" iconColor="var(--text)" label={t('oss.license')} numVal={0} suffix="MIT" />
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 32, marginTop: 32, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: '32px 36px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: '1 1 320px', minWidth: 0 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 18, fontWeight: 700, color: 'var(--text)' }}>{t('oss.forever')}</div>
          <div style={{ color: 'var(--muted)', fontSize: 15, lineHeight: 1.55 }}>{t('oss.foreverDesc')}</div>
        </div>
        <a
          href="https://github.com/codingskuy/coding-school"
          className="interact-press"
          style={{
            display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0, background: 'var(--text)', borderRadius: 12, padding: '14px 22px', color: 'var(--surface)', fontSize: 15, fontWeight: 600, textDecoration: 'none', fontFamily: "'Inter', sans-serif",
          }}
        >
          {t('oss.viewGithub')} <ArrowRight size={15} />
        </a>
      </div>
    </section>
  )
}
export default OpenSource
