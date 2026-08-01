import { Download } from 'lucide-react'
import GithubIcon from '../GithubIcon'
import TerminalWindow from '../TerminalWindow'
import { Star, Users } from 'lucide-react'

function Hero() {
  return (
    <section
      style={{
        maxWidth: 1160,
        margin: '0 auto',
        padding: '140px 24px 100px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 64,
        alignItems: 'center',
      }}
      className="hero-grid"
    >
      <div>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: '#161B22',
            border: '1px solid #30363D',
            borderRadius: 100,
            padding: '5px 14px',
            marginBottom: 28,
          }}
        >
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#3FB950' }} />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#8B949E' }}>
            OpenCode Plugin · Free & Open Source
          </span>
        </div>
        <h1
          style={{
            fontSize: 'clamp(36px, 5vw, 58px)',
            fontWeight: 700,
            lineHeight: 1.12,
            color: '#F0F6FC',
            margin: '0 0 20px',
            letterSpacing: '-0.02em',
          }}
        >
          Become an Engineer.{' '}
          <span style={{ color: '#FF8C42' }}>Not an AI Copy-Paster.</span>
        </h1>
        <p style={{ fontSize: 18, color: '#8B949E', lineHeight: 1.65, margin: '0 0 36px', maxWidth: 440 }}>
          The free OpenCode plugin that teaches, reviews, and grows with you through real software projects.
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button
            className="interact-press"
            style={{
              background: '#FF8C42',
              color: '#0D1117',
              border: 'none',
              borderRadius: 10,
              padding: '12px 24px',
              fontSize: 15,
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontFamily: "'Inter', sans-serif",
              transition: 'filter 150ms ease-out, box-shadow 200ms ease-out, transform 150ms ease-out',
            }}
          >
            <Download size={15} />
            Install Free
          </button>
          <a
            href="https://github.com/codingskuy/coding-school"
            className="interact-press"
            style={{
              background: 'transparent',
              color: '#F0F6FC',
              border: '1px solid #30363D',
              borderRadius: 10,
              padding: '12px 24px',
              fontSize: 15,
              fontWeight: 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              textDecoration: 'none',
              fontFamily: "'Inter', sans-serif",
              transition: 'border-color 150ms ease-out, background 150ms ease-out, transform 150ms ease-out, box-shadow 200ms ease-out',
            }}
          >
            <GithubIcon size={15} />
            View GitHub
          </a>
        </div>
        <div style={{ marginTop: 28, display: 'flex', gap: 20 }}>
          {[
            { icon: <Star size={13} />, text: '2.1k stars' },
            { icon: <Users size={13} />, text: '340 contributors' },
            { icon: <Download size={13} />, text: '18k installs' },
          ].map(({ icon, text }, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                color: '#8B949E',
                fontSize: 13,
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {icon}
              {text}
            </div>
          ))}
        </div>
      </div>
      <div>
        <TerminalWindow />
      </div>
    </section>
  )
}

export default Hero
