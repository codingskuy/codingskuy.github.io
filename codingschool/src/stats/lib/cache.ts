import { CACHE_KEY, CACHE_TTL_MS } from '../data/config'
import type { DailyDownload } from '../types'

interface CacheEntry {
  savedAt: number
  data: DailyDownload[]
}

export function readCache(): DailyDownload[] | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const entry = JSON.parse(raw) as CacheEntry
    if (!Array.isArray(entry.data)) return null
    return entry.data
  } catch {
    return null
  }
}

export function writeCache(data: DailyDownload[]): void {
  try {
    const entry: CacheEntry = { savedAt: Date.now(), data }
    localStorage.setItem(CACHE_KEY, JSON.stringify(entry))
  } catch {
    // localStorage unavailable (private mode / quota) — skip silently
  }
}

export function isFresh(savedAt: number): boolean {
  return Date.now() - savedAt < CACHE_TTL_MS
}

export function readFreshCache(): DailyDownload[] | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const entry = JSON.parse(raw) as CacheEntry
    if (!Array.isArray(entry.data)) return null
    if (!isFresh(entry.savedAt)) return null
    return entry.data
  } catch {
    return null
  }
}

export function cacheAge(): number | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const entry = JSON.parse(raw) as CacheEntry
    return typeof entry.savedAt === 'number' ? Date.now() - entry.savedAt : null
  } catch {
    return null
  }
}
