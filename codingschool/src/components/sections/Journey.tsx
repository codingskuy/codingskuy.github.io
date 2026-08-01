import SectionLabel from '../SectionLabel'
import JourneyStep from '../JourneyStep'

function Journey() {
  return (
    <section style={{ maxWidth: 1160, margin: '0 auto', padding: '0 24px 100px' }}>
      <SectionLabel text="Learning Journey" />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }} className="journey-grid">
        <div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, lineHeight: 1.15, color: '#F0F6FC', margin: '0 0 16px', letterSpacing: '-0.02em' }}>
            The journey never ends.
          </h2>
          <p style={{ color: '#8B949E', fontSize: 16, lineHeight: 1.65 }}>
            CodingSchool grows with every repository. Every commit teaches. Every review improves you.
          </p>
        </div>
        <div>
          {[
            { step: '01', label: 'Install Plugin', desc: 'npm i @codingskuy/coding-school && npx coding-school setup. Takes 10 seconds.' },
            { step: '02', label: 'Diagnosis', desc: 'CodingSchool maps your current knowledge and builds your personalized roadmap.' },
            { step: '03', label: 'Learn & Build', desc: 'Guided by hints, not answers. You write the code, you understand the concepts.' },
            { step: '04', label: 'Code Review', desc: 'Coach Agent reviews your architecture, quality, and security with each commit.' },
            { step: '05', label: 'Reflect & Grow', desc: 'Track your competency improvement across every dimension that matters.' },
          ].map((s, i, arr) => (
            <JourneyStep key={s.step} {...s} isLast={i === arr.length - 1} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
export default Journey
