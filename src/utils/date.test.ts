import { describe, it, expect } from 'vitest'
import { addDays, parseDateString, toDateString } from './date'

describe('addDays', () => {
  it('crosses a month end', () => {
    expect(addDays('2026-10-31', 1)).toBe('2026-11-01')
  })

  it('crosses a year end', () => {
    expect(addDays('2026-12-31', 1)).toBe('2027-01-01')
  })

  it('29 February in a leap year', () => {
    expect(addDays('2024-02-28', 1)).toBe('2024-02-29')
  })
})

describe('parseDateString', () => {
  it('rejects an impossible calendar date', () => {
    expect(parseDateString('2026-02-31')).toBeNull()
  })

  it('rejects a non-date string', () => {
    expect(parseDateString('abc')).toBeNull()
  })
})

describe('toDateString', () => {
  it('uses the local date', () => {
    expect(toDateString(new Date(2026, 10, 12))).toBe('2026-11-12')
  })
})
