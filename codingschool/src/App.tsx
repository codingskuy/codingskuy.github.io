import { lazy, Suspense, useState, useEffect } from 'react'
import Nav from './components/Nav'
import Toast from './components/Toast'
import Hero from './components/sections/Hero'
import Problem from './components/sections/Problem'
import Platforms from './components/sections/Platforms'
import Why from './components/sections/Why'
import DualAgent from './components/sections/DualAgent'
import ClaimGate from './components/sections/ClaimGate'
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
    <div style={{ background: 'var(--bg)', minHeight: '100vh', color: 'var(--text)' }}>
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
      <Nav />
      <Hero />
      <Platforms />
      <Problem />
      <Why />
      <DualAgent />
      <ClaimGate />
      <Competency />
      <Journey />
      <OpenSource />
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
