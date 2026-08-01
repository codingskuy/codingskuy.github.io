import SectionLabel from '../SectionLabel'
import FeatureCard from '../FeatureCard'
import { Brain, Code2, Zap } from 'lucide-react'

function Why() {
  return (
    <section style={{ maxWidth: 1160, margin: '0 auto', padding: '0 24px 100px' }}>
      <SectionLabel text="Why CodingSchool" />
      <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, lineHeight: 1.15, color: '#F0F6FC', margin: '0 0 16px', letterSpacing: '-0.02em' }}>
        From AI Assistant to AI Mentor.
      </h2>
      <p style={{ color: '#8B949E', fontSize: 16, lineHeight: 1.65, marginBottom: 52, maxWidth: 520 }}>
        Every interaction is designed to improve your thinking — not just complete your task.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }} className="cards-grid">
        <FeatureCard
          icon={<Brain size={18} />}
          title="Diagnosis First"
          description="Before teaching anything, CodingSchool understands where you are. No assumptions. No one-size-fits-all."
          items={['Knowledge mapping', 'Competency baseline', 'Adaptive roadmap']}
        />
        <FeatureCard
          icon={<Code2 size={18} />}
          title="Engineering Mentor"
          description="Not a chatbot. Not an autocomplete. A structured mentor that reviews your code, architecture, and decisions."
          items={['Code review', 'Architecture feedback', 'Security audit']}
        />
        <FeatureCard
          icon={<Zap size={18} />}
          title="Engineering Growth"
          description="Measure what matters. Track real competency across knowledge, implementation, debugging, and engineering craft."
          items={['Competency tracking', 'Progress reflection', 'Long-term growth']}
        />
      </div>
    </section>
  )
}
export default Why
