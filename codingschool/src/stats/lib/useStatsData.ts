import { useCallback, useEffect, useState } from 'react'
import { RELEASE_DATE } from '../data/config'
import type { DailyDownload, DataStatus } from '../types'
import { fetchDownloads } from './api'
import { cacheAge, readCache, readFreshCache, writeCache } from './cache'
import { toISODate } from '../utils/date'

interface StatsData {
  status: DataStatus
  data: DailyDownload[]
  lastUpdated: Date | null
  error: string | null
  refetch: () => void
}

export function useStatsData(active: boolean): StatsData {
  const [data, setData] = useState<DailyDownload[]>(() => readCache() ?? [])
  const [lastUpdated, setLastUpdated] = useState<Date | null>(() => {
    const age = cacheAge()
    return age !== null ? new Date(Date.now() - age) : null
  })
  const [status, setStatus] = useState<DataStatus>(() =>
    readFreshCache() ? 'ready' : 'loading',
  )
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async (silent = false): Promise<void> => {
    if (!silent) setStatus('loading')
    const today = toISODate(new Date())
    try {
      const fresh = await fetchDownloads(RELEASE_DATE, today)
      setData(fresh)
      setLastUpdated(new Date())
      setStatus('ready')
      setError(null)
      writeCache(fresh)
    } catch (e) {
      const fallback = readCache()
      if (fallback && fallback.length > 0) {
        setData(fallback)
        setStatus('ready')
      } else {
        setStatus('error')
        setError(e instanceof Error ? e.message : 'Failed to fetch download data')
      }
    }
  }, [])

  useEffect(() => {
    if (active) {
      void load()
    }
  }, [active, load])

  const refetch = useCallback(() => void load(true), [load])

  return { status, data, lastUpdated, error, refetch }
}
