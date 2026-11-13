import { createContext } from 'react'
import type { Bookmark } from '../types/bookmark'

export interface BookmarksContextValue {
  bookmarks: Bookmark[]
  isBookmarked: (id: string) => boolean
  addBookmark: (bookmark: Bookmark) => void
  removeBookmark: (id: string) => void
}

export const BookmarksContext = createContext<
  BookmarksContextValue | undefined
>(undefined)
