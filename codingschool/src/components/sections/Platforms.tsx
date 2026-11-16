import { useState } from 'react'
import SectionLabel from '../SectionLabel'
import CopyButton from '../CopyButton'
import { useTranslation } from '../../i18n'

const mono = "'JetBrains Mono', monospace"

type Status = 'enforced' | 'preview' | 'promptOnly'

interface Line {
  comment?: string
  cmd?: string
}

interface Host {
  id: string
  name: string
  glyph: string
  status: Status
  flag: string
  // Quick start lines; comments are i18n keys, commands are literal
  lines: Line[]
}

const HOSTS: Host[] = [
  {
    id: 'opencode',
    name: 'OpenCode',
    glyph: '>_',
    status: 'enforced',
    flag: 'setup',
    lines: [
      { comment: 'platforms.qs.opencode.c0' },
      { cmd: 'npm i @codingskuy/coding-school' },
      { cmd: 'npx @codingskuy/coding-school setup' },
      {},
      { comment: 'platforms.qs.opencode.c1' },
    ],
  },
  {
    id: 'claude',
    name: 'Claude Code',
    glyph: 'CC',
    status: 'enforced',
    flag: '--platform claude-code',
    lines: [
      { comment: 'platforms.qs.claude.c0' },
      { cmd: '/plugin marketplace add codingskuy/coding-school' },
      { cmd: '/plugin install codingschool@codingskuy' },
      {},
      { comment: 'platforms.qs.claude.c1' },
      { cmd: 'claude --agent codingschool:teacher' },
      { cmd: 'claude --agent codingschool:coach' },
    ],
  },
  {
    id: 'pi',
    name: 'Pi',
    glyph: 'π',
    status: 'enforced',
    flag: '--platform pi',
    lines: [
      { comment: 'platforms.qs.pi.c0' },
      { cmd: 'pi install npm:@codingskuy/coding-school' },
      {},
      { comment: 'platforms.qs.pi.c1' },
      { cmd: '/teacher' },
      { cmd: '/coach' },
      { cmd: '/codingschool off' },
    ],
  },
  {
    id: 'dsh',
    name: 'DeepSeek Harness',
    glyph: 'DS',
    status: 'preview',
    flag: '--platform dsh',
    lines: [
      { comment: 'platforms.qs.dsh.c0' },
      { cmd: 'npx @codingskuy/coding-school setup --platform dsh --yes' },
      {},
      { comment: 'platforms.qs.dsh.c1' },
    ],
  },
  {
    id: 'mcp',
    name: 'Any MCP host',
    glyph: '{ }',
    status: 'promptOnly',
    flag: '--platform mcp',
    lines: [
      { comment: 'platforms.qs.mcp.c0' },
      { cmd: 'npx @codingskuy/coding-school setup --platform mcp' },
      {},
      { comment: 'platforms.qs.mcp.c1' },
      { cmd: 'npx -y @codingskuy/coding-school mcp' },
    ],
  },
]

const STATUS_STYLE: Record<Status, { color: string; bg: string }> = {
  enforced: { color: 'var(--green)', bg: 'var(--green-tint)' },
  preview: { color: 'var(--accent-text)', bg: 'var(--accent-tint)' },
  promptOnly: { color: 'var(--muted)', bg: 'var(--surface-2)' },
}

function Platforms() {
  const { t } = useTranslation()
  const [active, setActive] = useState('claude')
  const host = HOSTS.find((h) => h.id === active) ?? HOSTS[0]
  const commands = host.lines.filter((l) => l.cmd).map((l) => l.cmd).join('\n')
  const highlights = [0, 1, 2, 3].map((i) => ({ value: t(`platforms.hl.${i}.value`), desc: t(`platforms.hl.${i}.desc`) }))

  return (
    <section id="platforms" className="section" style={{ maxWidth: 1208, margin: '0 auto', padding: '120px 24px 0' }}>
      <SectionLabel text={t('platforms.label')} />
      <h2 className="section-title" style={{ margin: '0 0 20px' }}>{t('platforms.title')}</h2>
      <p className="section-subtitle" style={{ marginBottom: 56, maxWidth: 640 }}>{t('platforms.subtitle')}</p>

      <div className="platform-grid" role="tablist" aria-label={t('platforms.label')} style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', gap: 16 }}>
        {HOSTS.map((h) => {
          const selected = h.id === active
          const status = STATUS_STYLE[h.status]
          return (
            <button
              key={h.id}
              role="tab"
              aria-selected={selected}
              aria-controls="platform-quickstart"
              onClick={() => setActive(h.id)}
              className="interact-hover"
              style={{
                background: selected ? 'var(--accent-tint-2)' : 'var(--surface)',
                border: `1px solid ${selected ? 'var(--accent)' : 'var(--border)'}`,
                borderRadius: 16,
                padding: 24,
                display: 'flex',
                flexDirection: 'column',
                gap: 14,
                textAlign: 'left',
                cursor: 'pointer',
                fontFamily: "'Inter', sans-serif",
                minWidth: 0,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--accent-tint)', border: '1px solid color-mix(in srgb, var(--accent) 25%, transparent)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: mono, fontWeight: 700, fontSize: 14, flexShrink: 0 }}>
                  {h.glyph}
                </div>
                <span style={{ background: status.bg, color: status.color, borderRadius: 999, padding: '4px 8px', fontFamily: mono, fontSize: 10, fontWeight: 500, whiteSpace: 'nowrap' }}>
                  {t(`platforms.status.${h.status}`)}
                </span>
              </div>
              <div style={{ fontSize: 20, fontWeight: 600, color: 'var(--text)', lineHeight: 1.2 }}>
                {h.id === 'mcp' ? t('platforms.mcp.name') : h.name}
              </div>
              <div style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--muted)', flex: 1 }}>{t(`platforms.${h.id}.desc`)}</div>
              <div style={{ background: 'var(--well)', border: '1px solid var(--border)', borderRadius: 8, padding: '8px 10px', fontFamily: mono, fontSize: 11, color: 'var(--text-2)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {h.flag}
              </div>
            </button>
          )
        })}
      </div>

      <div
        id="platform-quickstart"
        role="tabpanel"
        style={{ marginTop: 24, background: 'var(--term-bg)', border: '1px solid var(--term-border)', borderRadius: 16, overflow: 'hidden', fontFamily: mono, fontSize: 13, lineHeight: 1.8 }}
      >
        <div style={{ background: 'var(--term-bar)', borderBottom: '1px solid var(--term-border)', padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
            <span style={{ width: 12, height: 12, borderRadius: '50%', background: 'var(--tl-1)', flexShrink: 0 }} />
            <span style={{ width: 12, height: 12, borderRadius: '50%', background: 'var(--tl-2)', flexShrink: 0 }} />
            <span style={{ width: 12, height: 12, borderRadius: '50%', background: 'var(--tl-3)', flexShrink: 0 }} />
            <span style={{ marginLeft: 8, color: '#8B949E', fontSize: 12, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {t('platforms.qs.title')} — {host.id === 'mcp' ? t('platforms.mcp.name') : host.name}
            </span>
          </div>
          <CopyButton text={commands} dark />
        </div>
        <div style={{ padding: '20px 24px', overflowX: 'auto' }}>
          {host.lines.map((line, i) => (
            <div key={`${host.id}-${i}`} style={{ whiteSpace: 'pre', color: line.cmd ? '#F0F6FC' : '#8B949E' }}>
              {line.cmd ? (
                <>
                  <span style={{ color: '#3FB950' }}>$ </span>
                  {line.cmd}
                </>
              ) : line.comment ? (
                `# ${t(line.comment)}`
              ) : (
                ' '
              )}
            </div>
          ))}
          <div style={{ marginTop: 12, color: '#3FB950', whiteSpace: 'normal' }}>→ {t(`platforms.qs.${host.id}.note`)}</div>
        </div>
      </div>

      <div className="platform-hl" style={{ marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 32, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 32 }}>
        {highlights.map((hl) => (
          <div key={hl.value} style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 0 }}>
            <div className="grad-num" style={{ fontFamily: mono, fontSize: 28, fontWeight: 700, lineHeight: 1.2, overflowWrap: 'anywhere' }}>{hl.value}</div>
            <div style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--muted)' }}>{hl.desc}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
export default Platforms
