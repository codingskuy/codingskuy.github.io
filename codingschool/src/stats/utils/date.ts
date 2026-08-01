export function toISODate(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function parseDay(day: string): Date {
  return new Date(`${day}T00:00:00Z`)
}

export function formatDayShort(day: string): string {
  const d = parseDay(day)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' })
}

export function formatDayFull(day: string): string {
  const d = parseDay(day)
  return d.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

export function isFuture(day: string): boolean {
  return parseDay(day).getTime() > Date.now()
}
