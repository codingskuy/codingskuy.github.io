export function formatNumber(n: number): string {
  return n.toLocaleString('en-US')
}

export function formatCompact(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
  return String(Math.round(n))
}

export function formatPct(n: number, digits = 1): string {
  return `${(n * 100).toFixed(digits)}%`
}
