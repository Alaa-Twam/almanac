export type BookmarkKind = 'apod' | 'event' | 'birth' | 'death'

export interface Bookmark {
  id: string
  kind: BookmarkKind
  title: string
  description: string
  date: string
  imageUrl?: string
  link?: string
  savedAt: string
}
