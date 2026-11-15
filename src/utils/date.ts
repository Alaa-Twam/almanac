const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/

export function toDateString(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

//Today
export function getTodayString(): string {
  return toDateString(new Date())
}

//validate
export function parseDateString(value: string): Date | null {
  if (!DATE_PATTERN.test(value)) return null
  const [year, month, day] = value.split('-').map(Number)
  const date = new Date(year, month - 1, day)

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null
  }
  return date
}

export function addDays(value: string, days: number): string {
  const date = parseDateString(value)
  if (!date) throw new Error(`addDays: invalid date string "${value}"`)
  date.setDate(date.getDate() + days)
  return toDateString(date)
}

//date formats
export function formatLongDate(value: string): string {
  const date = parseDateString(value)

  if (!date) throw new Error(`formatLongDate: invalid date string "${value}"`)
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

export function formatShortDate(value: string): string {
  const date = parseDateString(value)

  if (!date) throw new Error(`formatShortDate: invalid date string "${value}"`)
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date)
}

// on this day format for wikipedia

export function getMonthDay(value: string): { month: string; day: string } {
  const date = parseDateString(value)
  if (!date) throw new Error(`getMonthDay: invalid date string "${value}"`)
  return {
    month: String(date.getMonth() + 1).padStart(2, '0'),
    day: String(date.getDate()).padStart(2, '0'),
  }
}

export function formatDayMonth(value: string): string {
  const date = parseDateString(value)
  if (!date) throw new Error(`formatDayMonth: invalid date string "${value}"`)
  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'long',
  }).format(date)
}

export function formatMediumDate(value: string): string {
  const date = parseDateString(value)
  if (!date) throw new Error(`formatMediumDate: invalid date string "${value}"`)
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date)
}
