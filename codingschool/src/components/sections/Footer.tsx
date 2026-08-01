import { Terminal } from 'lucide-react'

function Footer() {
  return (
    <footer style={{ maxWidth: 1160, margin: '0 auto', padding: '48px 24px 40px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40, marginBottom: 48 }} className="footer-grid">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <div style={{ width: 28, height: 28, background: '#FF8C42', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Terminal size={14} color="#0D1117" /></div>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, fontWeight: 500, color: '#F0F6FC' }}>CodingSchool</span>
          </div>
          <p style={{ color: '#8B949E', fontSize: 14, lineHeight: 1.65, maxWidth: 260 }}>The AI Engineering Mentor for OpenCode. Built for developers who want to grow.</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 20, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#8B949E' }}>
            <span style={{ color: '#3FB950' }}>●</span> Free & Open Source · MIT License
          </div>
        </div>
        <div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#F0F6FC', marginBottom: 16, letterSpacing: 0.5 }}>Product</div>
          {['Features', 'Teacher Agent', 'Coach Agent', 'Competency Engine', 'Changelog'].map((link) => (
            <a key={link} href="#" className="link-underline" style={{ display: 'block', color: '#8B949E', fontSize: 14, textDecoration: 'none', marginBottom: 10 }}>{link}</a>
          ))}
        </div>
        <div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#F0F6FC', marginBottom: 16 }}>Developers</div>
          {['Documentation', 'GitHub', 'Contributing', 'Roadmap', 'Issues'].map((link) => (
            <a key={link} href="#" className="link-underline" style={{ display: 'block', color: '#8B949E', fontSize: 14, textDecoration: 'none', marginBottom: 10 }}>{link}</a>
          ))}
        </div>
        <div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#F0F6FC', marginBottom: 16 }}>Community</div>
          {['Discord', 'Twitter / X', 'Blog', 'Newsletter', 'Contact'].map((link) => (
            <a key={link} href="#" className="link-underline" style={{ display: 'block', color: '#8B949E', fontSize: 14, textDecoration: 'none', marginBottom: 10 }}>{link}</a>
          ))}
        </div>
      </div>
      <div style={{ borderTop: '1px solid #30363D', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#8B949E' }}>© 2026 CodingSkuy. MIT License.</span>
        <div style={{ display: 'flex', gap: 20 }}>
          {['Privacy', 'Terms', 'Security'].map((link) => (
            <a key={link} href="#" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#8B949E', textDecoration: 'none' }}>{link}</a>
          ))}
        </div>
      </div>
    </footer>
  )
}
export default Footer
