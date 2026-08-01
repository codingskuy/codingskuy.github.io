import SectionLabel from '../SectionLabel'
import { BookOpen, Shield, ChevronRight } from 'lucide-react'

function DualAgent() {
  return (
    <section style={{ maxWidth: 1160, margin: '0 auto', padding: '0 24px 100px' }}>
      <SectionLabel text="Dual Agent" />
      <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, lineHeight: 1.15, color: '#F0F6FC', margin: '0 0 16px', letterSpacing: '-0.02em' }}>
        Two agents. One student model.
      </h2>
      <p style={{ color: '#8B949E', fontSize: 16, lineHeight: 1.65, marginBottom: 56, maxWidth: 520 }}>
        CodingSchool adapts as you grow — through every file, every commit, every project.
      </p>
      <div className="terminal-glow dual-diagram-wrap" style={{ background: '#161B22', border: '1px solid #30363D', borderRadius: 10, padding: '48px 40px', textAlign: 'center', marginBottom: 40 }}>
        <div style={{ display: 'inline-block', background: '#0D1117', border: '1px solid #FF8C42', borderRadius: 8, padding: '12px 32px', fontFamily: "'JetBrains Mono', monospace", fontSize: 14, color: '#FF8C42', marginBottom: 32 }}>
          Student Model
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 0, marginBottom: 0 }}>
          <div style={{ width: '50%', borderRight: '1px solid #30363D', height: 32 }} />
          <div style={{ width: '50%', height: 32 }} />
        </div>
        <div className="dual-agent-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <div className="glow-border" style={{ background: '#0D1117', border: '1px solid #30363D', borderRadius: 10, padding: '24px 28px', textAlign: 'left' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: '#3FB950', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <BookOpen size={14} /> Teacher Agent
            </div>
            {['Diagnose', 'Teach', 'Quiz', 'Scaffold', 'Reflect', 'Competency Update'].map((item) => (
              <div key={item} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: '#8B949E', padding: '5px 0', borderBottom: '1px solid #1C2128', display: 'flex', alignItems: 'center', gap: 8 }}>
                <ChevronRight size={11} style={{ color: '#3FB950', flexShrink: 0 }} /> {item}
              </div>
            ))}
          </div>
          <div className="glow-border" style={{ background: '#0D1117', border: '1px solid #30363D', borderRadius: 10, padding: '24px 28px', textAlign: 'left' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: '#FF8C42', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Shield size={14} /> Coach Agent
            </div>
            {['Project Timeline', 'Code Review', 'Architecture Review', 'Security (GRC)', 'Mentoring Plan', 'Engineering Growth'].map((item) => (
              <div key={item} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: '#8B949E', padding: '5px 0', borderBottom: '1px solid #1C2128', display: 'flex', alignItems: 'center', gap: 8 }}>
                <ChevronRight size={11} style={{ color: '#FF8C42', flexShrink: 0 }} /> {item}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="comparison-table-wrap" style={{ background: '#161B22', border: '1px solid #30363D', borderRadius: 10, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', background: '#1C2128', borderBottom: '1px solid #30363D' }}>
          {['', 'Traditional Course', 'AI Assistant', 'CodingSchool'].map((col, i) => (
            <div key={i} style={{ padding: '12px 20px', fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: i === 3 ? '#FF8C42' : '#8B949E', fontWeight: i === 3 ? 600 : 400 }}>{col}</div>
          ))}
        </div>
        {[
          ['Content', 'Static', 'Instant answers', 'Adaptive mentoring'],
          ['Learning', 'Watch videos', 'Generate code', 'Build understanding'],
          ['Approach', 'One-way teaching', 'Task completion', 'Long-term growth'],
          ['Outcome', 'Finish course', 'Finish prompt', 'Grow as engineer'],
        ].map(([label, ...cols], rowIdx) => (
          <div key={rowIdx} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', borderBottom: rowIdx < 3 ? '1px solid #30363D' : 'none' }}>
            <div style={{ padding: '14px 20px', fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: '#8B949E' }}>{label}</div>
            {cols.map((cell, i) => (
              <div key={i} style={{ padding: '14px 20px', fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: i === 2 ? '#3FB950' : '#8B949E' }}>
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
