import { lazy, Suspense, useState, useEffect } from 'react'
import Nav from './components/Nav'
import Toast from './components/Toast'
import TermDivider from './components/TermDivider'
import Hero from './components/sections/Hero'
import Problem from './components/sections/Problem'
import Why from './components/sections/Why'
import DualAgent from './components/sections/DualAgent'
import Competency from './components/sections/Competency'
import Journey from './components/sections/Journey'
import OpenSource from './components/sections/OpenSource'
import Cta from './components/sections/Cta'
import Footer from './components/sections/Footer'

const StatsSection = lazy(() => import('./stats'))

export default function App() {
  return <AppInner />
}

function AppInner() {
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    const handler = (e: CustomEvent<{ message: string }>) => {
      setToast(e.detail.message)
    }
    window.addEventListener('copy-success' as any, handler as any)
    return () => window.removeEventListener('copy-success' as any, handler as any)
  }, [])

  return (
    <div style={{ background: '#0D1117', minHeight: '100vh', color: '#F0F6FC' }}>
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
      <Nav />
      <Hero />
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 24px' }}>
        <TermDivider />
      </div>
      <Problem />
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 24px' }}>
        <TermDivider />
      </div>
      <Why />
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 24px' }}>
        <TermDivider />
      </div>
      <DualAgent />
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 24px' }}>
        <TermDivider />
      </div>
      <Competency />
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 24px' }}>
        <TermDivider />
      </div>
      <Journey />
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 24px' }}>
        <TermDivider />
      </div>
      <OpenSource />
      <TermDivider />
      <Suspense fallback={null}>
        <StatsSection />
      </Suspense>
      <Cta />
      <Footer />
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  )
}
