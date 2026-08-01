export interface DailyDownload {
  day: string
  downloads: number
}

export interface DownloadRangeResponse {
  start: string
  end: string
  package: string
  downloads: DailyDownload[]
}

export interface ReleaseEvent {
  date: string
  title: string
}

export type HotReason = 'outlier' | 'top' | 'growth'

export type HotBadge = 'viral' | 'trending' | 'peak'

export interface HotTrendDay extends DailyDownload {
  reasons: HotReason[]
  badge: HotBadge
  growthPct: number | null
}

export interface Milestone {
  threshold: number
  reachedAt: string | null
  daysToReach: number | null
  downloadsAtReach: number | null
}

export type TrendBucket = 'extremely-hot' | 'growing-fast' | 'stable' | 'cooling'

export interface TrendScore {
  value: number
  growth: number
  movingAverage: number
  peak: number
  bucket: TrendBucket
}

export type InsightTone = 'positive' | 'neutral' | 'info'

export interface Insight {
  id: string
  text: string
  tone: InsightTone
}

export interface DailyStats {
  data: DailyDownload[]
  total: number
  daysWithData: number
  avgPerDay: number
  avgPerWeek: number
  highest: DailyDownload | null
  lowest: DailyDownload | null
  maxGrowthPct: number
  maxGrowthDay: DailyDownload | null
  consecutiveGrowth: number
  consecutiveDecline: number
  lastDay: DailyDownload | null
  daysSinceRelease: number
}

export type DataStatus = 'loading' | 'ready' | 'error'
