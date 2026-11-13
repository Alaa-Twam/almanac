import type { Bookmark, BookmarkKind } from '../types/bookmark'

const STORAGE_KEY = 'almanac.bookmarks.v1'
const KINDS: BookmarkKind[] = ['apod', 'event', 'birth', 'death']

function isBookmark(value: unknown): value is Bookmark {
  if (typeof value !== 'object' || value === null) return false
  const v = value as Record<string, unknown>
  const isOptionalString = (x: unknown) =>
    x === undefined || typeof x === 'string'
  return (
    typeof v.id === 'string' &&
    typeof v.kind === 'string' &&
    KINDS.includes(v.kind as BookmarkKind) &&
    typeof v.title === 'string' &&
    typeof v.description === 'string' &&
    typeof v.date === 'string' &&
    typeof v.savedAt === 'string' &&
    isOptionalString(v.imageUrl) &&
    isOptionalString(v.link)
  )
}

export function loadBookmarks(): Bookmark[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter(isBookmark)
  } catch {
    return []
  }
}

export function saveBookmarks(list: Bookmark[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  } catch {
    // Ignore errors
  }
}
