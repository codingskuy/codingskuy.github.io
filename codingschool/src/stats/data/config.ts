export const PACKAGE_NAME = '@codingskuy/coding-school'

export const RELEASE_DATE = '2026-07-15'

export const CACHE_KEY = 'codingschool-stats-v1'

export const CACHE_TTL_MS = 60 * 60 * 1000

export const MILESTONE_THRESHOLDS = [100, 500, 1000, 5000, 10000]

export const HOT_TOP_N = 10

export const OUTLIER_STDDEV_MULTIPLIER = 2

export const GROWTH_THRESHOLD = 1.5

export const TREND_WEIGHTS = {
  growth: 0.5,
  movingAverage: 0.3,
  peak: 0.2,
} as const

export const TREND_BUCKET_CUTOFFS = {
  extremelyHot: 0.7,
  growingFast: 0.45,
  stable: 0.25,
} as const
