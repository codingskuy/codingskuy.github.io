import { useCallback, useEffect, useRef, useState } from 'react'
import { PACKAGE_NAME, RELEASE_DATE } from '../stats/data/config'
import { toISODate } from '../stats/utils/date'

const REPO_STATS_KEY = 'codingschool-repo-stats'
const REPO_STATS_TTL_MS = 60 * 60 * 1000
const DEFAULT_INSTALLS = 1155

export function useRepoStats() {
  const [installs, setInstalls] = useState(DEFAULT_INSTALLS)

  useEffect(() => {
    let cancelled = false
    try {
      const raw = localStorage.getItem(REPO_STATS_KEY)
      if (raw) {
        const entry = JSON.parse(raw) as { savedAt: number; installs: number }
        if (typeof entry.installs === 'number' && Date.now() - entry.savedAt < REPO_STATS_TTL_MS) {
          setInstalls(entry.installs)
        }
      }
    } catch {
      // private mode / invalid cache — fall through to fetch
    }
    const today = toISODate(new Date())
    fetch(`https://api.npmjs.org/downloads/point/${RELEASE_DATE}:${today}/${PACKAGE_NAME}`)
      .then((res) => (res.ok ? (res.json() as Promise<{ downloads?: number }>) : null))
      .then((json) => {
        if (cancelled || !json || typeof json.downloads !== 'number') return
        setInstalls(json.downloads)
        try {
          localStorage.setItem(
            REPO_STATS_KEY,
            JSON.stringify({ savedAt: Date.now(), installs: json.downloads }),
          )
        } catch {
          // private mode / quota — skip silently
        }
      })
      .catch(() => {
        // network offline — keep cached/fallback value
      })
    return () => {
      cancelled = true
    }
  }, [])

  return { stars: 3, contributors: 1, forks: 0, installs }
}

export function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold: 0.15, ...options }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, inView }
}

export function useCounter(target: number, duration = 600, startOnView = true) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(!startOnView)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!startOnView) return
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true) },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    const startTime = performance.now()
    const step = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [started, target, duration])

  return { ref, count }
}

export function useCopyToClipboard() {
  const [copied, setCopied] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const copy = useCallback((text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => setCopied(false), 2000)
    })
  }, [])

  return { copied, copy }
}
