import SectionLabel from '../SectionLabel'
import StatCard from '../StatCard'
import GithubIcon from '../GithubIcon'
import { Star, Download, Users, GitBranch } from 'lucide-react'

function OpenSource() {
  return (
    <section style={{ maxWidth: 1160, margin: '0 auto', padding: '0 24px 100px' }}>
      <SectionLabel text="Open Source" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 40 }} className="stats-grid">
        {[
          { icon: <Star size={16} />, value: '2,100+', label: 'GitHub Stars', numVal: 2100, suffix: '+' },
          { icon: <Download size={16} />, value: '18k+', label: 'Installs', numVal: 18, suffix: 'k+' },
          { icon: <Users size={16} />, value: '340+', label: 'Contributors', numVal: 340, suffix: '+' },
          { icon: <GitBranch size={16} />, value: 'MIT', label: 'License', numVal: 0, suffix: 'MIT' },
        ].map(({ icon, label, numVal, suffix }, i) => (
          <StatCard key={i} icon={icon} label={label} numVal={numVal} suffix={suffix} />
        ))}
      </div>
      <div style={{ background: '#161B22', border: '1px solid #30363D', borderRadius: 10, padding: '32px 36px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
        <div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 16, color: '#F0F6FC', marginBottom: 8 }}>Free & Open Source Forever</div>
          <div style={{ color: '#8B949E', fontSize: 14, maxWidth: 420 }}>Unlimited mentoring. Full Learn Agent and Coach Agent access. No credit card. No hidden limits. MIT licensed.</div>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <a
            href="https://github.com/codingskuy/coding-school"
            style={{
              display: 'flex', alignItems: 'center', gap: 8, background: '#0D1117', border: '1px solid #30363D', borderRadius: 8, padding: '10px 20px', color: '#F0F6FC', fontSize: 13, textDecoration: 'none', fontFamily: "'JetBrains Mono', monospace", transition: 'border-color 0.15s',
            }}
          >
            <GithubIcon size={14} /> View on GitHub
          </a>
        </div>
      </div>
    </section>
  )
}
export default OpenSource
