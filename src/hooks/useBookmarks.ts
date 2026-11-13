import { useContext } from 'react'
import { BookmarksContext } from '../context/bookmarksContext'
import type { BookmarksContextValue } from '../context/bookmarksContext'

export function useBookmarks(): BookmarksContextValue {
  const context = useContext(BookmarksContext)
  if (!context) {
    throw new Error('sth went wrong')
  }
  return context
}
