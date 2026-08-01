import SectionLabel from '../SectionLabel'
import CompBar from '../CompBar'
import { Check } from 'lucide-react'

function Competency() {
  return (
    <section style={{ maxWidth: 1160, margin: '0 auto', padding: '0 24px 100px' }}>
      <SectionLabel text="Competency Engine" />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }} className="comp-grid">
        <div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, lineHeight: 1.15, color: '#F0F6FC', margin: '0 0 16px', letterSpacing: '-0.02em' }}>
            Not XP. Not streaks. <span style={{ color: '#FF8C42' }}>Real competency.</span>
          </h2>
          <p style={{ color: '#8B949E', fontSize: 16, lineHeight: 1.65, marginBottom: 36 }}>
            CodingSchool measures the skills that actually matter when you ship production software.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {['Real engineering competencies, not gamification', 'Measured across every project you build', 'Reflects actual growth, not activity', 'Honest feedback on where to improve'].map((item) => (
              <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, color: '#8B949E', fontSize: 14, lineHeight: 1.5 }}>
                <Check size={15} style={{ color: '#3FB950', flexShrink: 0, marginTop: 2 }} /> {item}
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="terminal-glow" style={{ background: '#161B22', border: '1px solid #30363D', borderRadius: 10, padding: '24px 24px 28px', marginBottom: 16 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#8B949E', marginBottom: 20 }}>// Learning</div>
            <CompBar label="Knowledge" value={78} color="#3FB950" />
            <CompBar label="Implementation" value={62} color="#3FB950" />
            <CompBar label="Debugging" value={85} color="#3FB950" />
            <CompBar label="Teaching" value={34} color="#D29922" />
          </div>
          <div className="terminal-glow" style={{ background: '#161B22', border: '1px solid #30363D', borderRadius: 10, padding: '24px 24px 28px' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#8B949E', marginBottom: 20 }}>// Engineering</div>
            <CompBar label="Architecture" value={51} color="#FF8C42" />
            <CompBar label="Testing" value={29} color="#F85149" />
            <CompBar label="Git" value={73} color="#FF8C42" />
            <CompBar label="Security" value={44} color="#D29922" />
            <CompBar label="Documentation" value={58} color="#FF8C42" />
          </div>
        </div>
      </div>
    </section>
  )
}
export default Competency
