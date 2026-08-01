import SectionLabel from '../SectionLabel'
import { ArrowRight } from 'lucide-react'

function Problem() {
  return (
    <section style={{ maxWidth: 1160, margin: '0 auto', padding: '0 24px 100px' }}>
      <SectionLabel text="The Problem" />
      <h2
        style={{
          fontSize: 'clamp(28px, 4vw, 44px)',
          fontWeight: 700,
          lineHeight: 1.15,
          color: '#F0F6FC',
          margin: '0 0 16px',
          maxWidth: 640,
          letterSpacing: '-0.02em',
        }}
      >
        AI changed programming.
        <br />
        <span style={{ color: '#8B949E' }}>It didn't change how people learn.</span>
      </h2>
      <p style={{ color: '#8B949E', fontSize: 16, lineHeight: 1.65, marginBottom: 56, maxWidth: 480 }}>
        Developers are shipping faster than ever — but fewer understand what they're shipping.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 60px 1fr', gap: 0, alignItems: 'start' }} className="problem-grid">
        <div style={{ background: '#161B22', border: '1px solid #30363D', borderRadius: 10, padding: '28px 28px 32px' }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#F85149', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span>✖</span> Today's Workflow
          </div>
          {['Prompt', 'Copy', 'Paste', 'Ship', 'Forget'].map((step, i, arr) => (
            <div key={step}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 15, color: '#F0F6FC', padding: '10px 0' }}>{step}</div>
              {i < arr.length - 1 && <div style={{ fontFamily: "'JetBrains Mono', monospace',", fontSize: 13, color: '#30363D', paddingLeft: 4 }}>↓</div>}
            </div>
          ))}
          <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid #30363D' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#8B949E', marginBottom: 12 }}>Result</div>
            {['Shallow understanding', 'Tutorial dependency', 'Weak debugging skills', 'No engineering growth'].map((item) => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#8B949E', fontSize: 13, marginBottom: 8, fontFamily: "'JetBrains Mono', monospace" }}>
                <span style={{ color: '#F85149' }}>✖</span> {item}
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 80 }}>
          <div style={{ animation: 'scale-in 400ms ease-out forwards', color: '#FF8C42' }}><ArrowRight size={20} /></div>
        </div>
        <div style={{ background: '#161B22', border: '1px solid #FF8C4233', borderRadius: 10, padding: '28px 28px 32px' }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#3FB950', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span>✔</span> CodingSchool Method
          </div>
          {['Diagnose', 'Understand', 'Build', 'Review', 'Reflect', 'Grow'].map((step, i, arr) => (
            <div key={step}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 15, color: i === arr.length - 1 ? '#FF8C42' : '#F0F6FC', padding: '10px 0', fontWeight: i === arr.length - 1 ? 600 : 400 }}>{step}</div>
              {i < arr.length - 1 && <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: '#30363D', paddingLeft: 4 }}>↓</div>}
            </div>
          ))}
          <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid #30363D' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#8B949E', marginBottom: 12 }}>Result</div>
            {['Deep engineering understanding', 'Independent problem-solving', 'Strong debugging skills', 'Continuous growth'].map((item) => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#8B949E', fontSize: 13, marginBottom: 8, fontFamily: "'JetBrains Mono', monospace" }}>
                <span style={{ color: '#3FB950' }}>✔</span> {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
export default Problem
