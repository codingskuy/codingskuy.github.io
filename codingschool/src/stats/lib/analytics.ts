import {
  GROWTH_THRESHOLD,
  HOT_TOP_N,
  MILESTONE_THRESHOLDS,
  OUTLIER_STDDEV_MULTIPLIER,
  RELEASE_DATE,
  TREND_BUCKET_CUTOFFS,
  TREND_WEIGHTS,
} from '../data/config'
import type {
  DailyDownload,
  DailyStats,
  HotBadge,
  HotReason,
  HotTrendDay,
  Insight,
  Milestone,
  TrendBucket,
  TrendScore,
} from '../types'

const clamp01 = (n: number): number => Math.min(1, Math.max(0, n))

const mean = (vals: number[]): number =>
  vals.length === 0 ? 0 : vals.reduce((a, b) => a + b, 0) / vals.length

const stddev = (vals: number[]): number => {
  if (vals.length === 0) return 0
  const m = mean(vals)
  return Math.sqrt(vals.reduce((a, b) => a + (b - m) ** 2, 0) / vals.length)
}

export function daysBetween(start: string, end: string): number {
  const a = Date.parse(`${start}T00:00:00Z`)
  const b = Date.parse(`${end}T00:00:00Z`)
  return Math.round((b - a) / 86400000)
}

function sliceDays(data: DailyDownload[], count: number): DailyDownload[] {
  return data.slice(Math.max(0, data.length - count))
}

function avgOf(days: DailyDownload[]): number {
  return mean(days.map((d) => d.downloads))
}

export function computeDailyStats(data: DailyDownload[]): DailyStats {
  const total = data.reduce((a, d) => a + d.downloads, 0)
  const daysWithData = data.length
  const lastDay = data.length ? data[daysWithData - 1] : null
  const daysSinceRelease = lastDay ? daysBetween(RELEASE_DATE, lastDay.day) + 1 : 0
  const avgPerDay = daysWithData ? total / daysWithData : 0
  const avgPerWeek = daysSinceRelease ? total / (daysSinceRelease / 7) : 0

  let highest: DailyDownload | null = null
  let lowest: DailyDownload | null = null
  for (const d of data) {
    if (!highest || d.downloads > highest.downloads) highest = d
    if (!lowest || d.downloads < lowest.downloads) lowest = d
  }

  let consecutiveGrowth = 0
  let consecutiveDecline = 0
  let growthRun = 0
  let declineRun = 0
  let maxGrowthPct = 0
  let maxGrowthDay: DailyDownload | null = null
  for (let i = 1; i < data.length; i++) {
    const prev = data[i - 1].downloads
    const cur = data[i].downloads
    if (prev > 0) {
      const pct = cur / prev - 1
      if (pct > maxGrowthPct) {
        maxGrowthPct = pct
        maxGrowthDay = data[i]
      }
    } else if (cur > 0 && maxGrowthDay === null) {
      maxGrowthDay = data[i]
    }
    if (cur > prev) {
      growthRun += 1
      declineRun = 0
    } else if (cur < prev) {
      declineRun += 1
      growthRun = 0
    } else {
      growthRun = 0
      declineRun = 0
    }
    consecutiveGrowth = Math.max(consecutiveGrowth, growthRun)
    consecutiveDecline = Math.max(consecutiveDecline, declineRun)
  }

  return {
    data,
    total,
    daysWithData,
    avgPerDay,
    avgPerWeek,
    highest,
    lowest,
    maxGrowthPct,
    maxGrowthDay,
    consecutiveGrowth,
    consecutiveDecline,
    lastDay,
    daysSinceRelease,
  }
}

export function computeHotTrendDays(
  data: DailyDownload[],
  stats: DailyStats,
): HotTrendDay[] {
  if (data.length === 0) return []
  const m = mean(data.map((d) => d.downloads))
  const sd = stddev(data.map((d) => d.downloads))
  const outlierThreshold = m + OUTLIER_STDDEV_MULTIPLIER * sd

  const topCount = Math.min(
    HOT_TOP_N,
    Math.max(3, Math.ceil(data.length / 4)),
  )
  const topDays = new Set(
    [...data]
      .sort((a, b) => b.downloads - a.downloads)
      .slice(0, topCount)
      .map((d) => d.day),
  )

  const result: HotTrendDay[] = []
  for (let i = 0; i < data.length; i++) {
    const d = data[i]
    const prev = i > 0 ? data[i - 1].downloads : 0
    const reasons: HotReason[] = []
    if (d.downloads > outlierThreshold) reasons.push('outlier')
    if (topDays.has(d.day)) reasons.push('top')
    if (prev > 0 && d.downloads >= prev * GROWTH_THRESHOLD) reasons.push('growth')
    if (prev === 0 && d.downloads > 0) reasons.push('growth')
    if (reasons.length === 0) continue

    const growthPct = prev > 0 ? (d.downloads / prev - 1) * 100 : null
    const isPeak = stats.highest !== null && d.day === stats.highest.day
    const badge: HotBadge = isPeak
      ? 'peak'
      : reasons.includes('outlier')
        ? 'viral'
        : 'trending'

    result.push({ ...d, reasons, badge, growthPct })
  }

  result.sort((a, b) => b.downloads - a.downloads)
  return result
}

export function computeMilestones(data: DailyDownload[]): Milestone[] {
  let cumulative = 0
  let dayIndex = 0
  return MILESTONE_THRESHOLDS.map((threshold) => {
    while (dayIndex < data.length && cumulative < threshold) {
      cumulative += data[dayIndex].downloads
      dayIndex += 1
    }
    if (dayIndex <= data.length && cumulative >= threshold) {
      const reached = data[dayIndex - 1]
      return {
        threshold,
        reachedAt: reached.day,
        daysToReach: daysBetween(RELEASE_DATE, reached.day) + 1,
        downloadsAtReach: cumulative,
      }
    }
    return { threshold, reachedAt: null, daysToReach: null, downloadsAtReach: null }
  })
}

function growthFactor(data: DailyDownload[]): number {
  const recent = avgOf(sliceDays(data, 3))
  const prev = avgOf(sliceDays(data, 6).slice(0, 3))
  if (recent === 0 && prev === 0) return 0
  return (recent - prev) / (recent + prev) * 0.5 + 0.5
}

function movingAverageFactor(data: DailyDownload[], stats: DailyStats): number {
  const recent = avgOf(sliceDays(data, 7))
  const base = stats.avgPerDay
  if (recent === 0 && base === 0) return 0
  return (recent - base) / (recent + base) * 0.5 + 0.5
}

function peakFactor(stats: DailyStats): number {
  if (!stats.highest || stats.avgPerDay === 0) return 0
  return clamp01(stats.highest.downloads / (stats.avgPerDay * 3))
}

function bucketFor(value: number): TrendBucket {
  if (value >= TREND_BUCKET_CUTOFFS.extremelyHot) return 'extremely-hot'
  if (value >= TREND_BUCKET_CUTOFFS.growingFast) return 'growing-fast'
  if (value >= TREND_BUCKET_CUTOFFS.stable) return 'stable'
  return 'cooling'
}

export function computeTrendScore(data: DailyDownload[], stats: DailyStats): TrendScore {
  const growth = growthFactor(data)
  const movingAverage = movingAverageFactor(data, stats)
  const peak = peakFactor(stats)
  const value = clamp01(
    TREND_WEIGHTS.growth * growth +
      TREND_WEIGHTS.movingAverage * movingAverage +
      TREND_WEIGHTS.peak * peak,
  )
  return { value, growth, movingAverage, peak, bucket: bucketFor(value) }
}

export function generateInsights(
  data: DailyDownload[],
  stats: DailyStats,
  milestones: Milestone[],
): Insight[] {
  const insights: Insight[] = []

  if (stats.highest && stats.avgPerDay > 0) {
    const ratio = stats.highest.downloads / stats.avgPerDay
    if (ratio >= 1.5) {
      insights.push({
        id: 'peak-vs-avg',
        text: `${stats.highest.day} had ${ratio.toFixed(1)}x more downloads than the daily average (${stats.highest.downloads.toLocaleString()} downloads).`,
        tone: 'positive',
      })
    }
  }

  if (stats.maxGrowthDay && stats.maxGrowthPct >= 1) {
    insights.push({
      id: 'biggest-spike',
      text: `The biggest spike happened ${daysBetween(RELEASE_DATE, stats.maxGrowthDay.day)} days after the initial release with +${Math.round(stats.maxGrowthPct * 100)}% growth.`,
      tone: 'positive',
    })
  }

  if (stats.consecutiveGrowth >= 3) {
    insights.push({
      id: 'consecutive-growth',
      text: `Downloads have grown for ${stats.consecutiveGrowth} consecutive days.`,
      tone: 'positive',
    })
  }

  if (stats.consecutiveDecline >= 3) {
    insights.push({
      id: 'consecutive-decline',
      text: `Downloads declined for ${stats.consecutiveDecline} consecutive days. A new release or announcement could help reverse the trend.`,
      tone: 'neutral',
    })
  }

  const firstMilestone = milestones.find((m) => m.reachedAt !== null)
  if (firstMilestone) {
    const timing =
      firstMilestone.daysToReach === 1
        ? 'in just 1 day'
        : `within only ${firstMilestone.daysToReach} days`
    insights.push({
      id: 'first-milestone',
      text: `This package reached ${firstMilestone.threshold.toLocaleString()} downloads ${timing}.`,
      tone: 'positive',
    })
  }

  if (stats.daysWithData > 0) {
    const aboveAvg = data.filter((d) => d.downloads > stats.avgPerDay).length
    insights.push({
      id: 'above-avg',
      text: `${aboveAvg} out of ${stats.daysWithData} days beat the daily average of ${Math.round(stats.avgPerDay)} downloads.`,
      tone: 'info',
    })
  }

  if (stats.total > 0) {
    insights.push({
      id: 'total-so-far',
      text: `Total downloads reached ${stats.total.toLocaleString()} since release.`,
      tone: 'info',
    })
  }

  return insights
}
