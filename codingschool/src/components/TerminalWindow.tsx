import { useState, useEffect } from 'react'
import { useCopyToClipboard } from './hooks'
import { Check, Copy } from 'lucide-react'

const TERMINAL_LINES = [
  { text: '$ opencode install @codingskuy/coding-school', delay: 0, type: 'command' },
  { text: '', delay: 600, type: 'blank' },
  { text: '✔ Installing plugin...', delay: 800, type: 'success' },
  { text: '✔ Teacher Agent registered', delay: 1400, type: 'success' },
  { text: '✔ Coach Agent registered', delay: 1900, type: 'success' },
  { text: '✔ Loading student profile...', delay: 2400, type: 'success' },
  { text: '', delay: 2900, type: 'blank' },
  { text: 'Competency Assessment', delay: 3200, type: 'label' },
  { text: '', delay: 3300, type: 'blank' },
  { text: 'Knowledge        ██████░░░░  62%', delay: 3400, type: 'bar' },
  { text: 'Architecture     ██░░░░░░░░  24%', delay: 3700, type: 'bar' },
  { text: 'Debugging        ████████░░  79%', delay: 4000, type: 'bar' },
  { text: 'Code Quality     █████░░░░░  51%', delay: 4300, type: 'bar' },
  { text: '', delay: 4600, type: 'blank' },
  { text: '✔ Ready to learn.', delay: 4900, type: 'success' },
  { text: '  Mentor is watching your code.', delay: 5300, type: 'muted' },
]

function TerminalWindow() {
  const [visibleLines, setVisibleLines] = useState<number>(0)
  const [started, setStarted] = useState(false)
  const { copied, copy } = useCopyToClipboard()

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), 400)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!started) return
    const timers: ReturnType<typeof setTimeout>[] = []
    TERMINAL_LINES.forEach((line, i) => {
      timers.push(setTimeout(() => setVisibleLines(i + 1), line.delay))
    })
    return () => timers.forEach(clearTimeout)
  }, [started])

  const getLineColor = (type: string) => {
    switch (type) {
      case 'command': return '#F0F6FC'
      case 'success': return '#3FB950'
      case 'divider': return '#30363D'
      case 'label': return '#8B949E'
      case 'bar': return '#FF8C42'
      case 'muted': return '#8B949E'
      default: return 'transparent'
    }
  }

  const terminalText = TERMINAL_LINES.map(l => l.text).join('\n')

  return (
    <div
      className="terminal-glow"
      style={{
        background: '#161B22',
        border: '1px solid #30363D',
        borderRadius: 10,
        overflow: 'hidden',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 13,
        lineHeight: '1.7',
        position: 'relative',
      }}
    >
      {/* Scanline overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '100%',
          background: 'linear-gradient(transparent 50%, rgba(255, 140, 66,0.015) 50%)',
          backgroundSize: '100% 4px',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
      {/* Title bar */}
      <div
        style={{
          background: '#1C2128',
          borderBottom: '1px solid #30363D',
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div
            style={{ width: 12, height: 12, borderRadius: '50%', background: '#F85149', transition: 'box-shadow 200ms' }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 0 8px rgba(248,81,73,0.5)')}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
          />
          <div
            style={{ width: 12, height: 12, borderRadius: '50%', background: '#D29922', transition: 'box-shadow 200ms' }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 0 8px rgba(210,153,34,0.5)')}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
          />
          <div
            style={{ width: 12, height: 12, borderRadius: '50%', background: '#3FB950', transition: 'box-shadow 200ms' }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 0 8px rgba(63,185,80,0.5)')}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
          />
          <span style={{ marginLeft: 8, color: '#8B949E', fontSize: 12 }}>opencode — coding-school</span>
        </div>
        <button
          onClick={() => copy(terminalText)}
          style={{
            background: copied ? 'rgba(63,185,80,0.12)' : 'transparent',
            border: 'none',
            borderRadius: 4,
            padding: 4,
            cursor: 'pointer',
            color: copied ? '#3FB950' : '#8B949E',
            transition: 'background 150ms, color 150ms',
            display: 'flex',
            alignItems: 'center',
          }}
          aria-label="Copy terminal output"
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
        </button>
      </div>
      {/* Content */}
      <div style={{ padding: '20px 24px', minHeight: 340, position: 'relative', zIndex: 2 }}>
        {TERMINAL_LINES.slice(0, visibleLines).map((line, i) => (
          <div
            key={i}
            style={{
              color: getLineColor(line.type),
              whiteSpace: 'pre',
              animation: 'term-line-in 200ms ease-out forwards',
              opacity: 0,
            }}
          >
            {line.text || ' '}
          </div>
        ))}
        {visibleLines < TERMINAL_LINES.length && (
          <span
            style={{
              display: 'inline-block',
              height: 14,
              background: '#F0F6FC',
              verticalAlign: 'text-bottom',
              animation: 'blink 1s step-end infinite, cursor-pulse 1.5s ease-in-out infinite',
            }}
          />
        )}
      </div>
    </div>
  )
}

export default TerminalWindow
