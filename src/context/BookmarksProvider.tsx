import { useEffect, useReducer } from 'react'
import type { ReactNode } from 'react'
import { bookmarksReducer } from './bookmarksReducer'
import { BookmarksContext } from './bookmarksContext'
import type { BookmarksContextValue } from './bookmarksContext'
import { loadBookmarks, saveBookmarks } from '../utils/bookmarksStorage'

interface BookmarksProviderProps {
  children: ReactNode
}

function BookmarksProvider({ children }: BookmarksProviderProps) {
  const [bookmarks, dispatch] = useReducer(bookmarksReducer, [], loadBookmarks)

  useEffect(() => {
    saveBookmarks(bookmarks)
  }, [bookmarks])

  const value: BookmarksContextValue = {
    bookmarks,
    isBookmarked: (id) => bookmarks.some((bookmark) => bookmark.id === id),
    addBookmark: (bookmark) => dispatch({ type: 'ADD', bookmark }),
    removeBookmark: (id) => dispatch({ type: 'REMOVE', id }),
  }

  return (
    <BookmarksContext.Provider value={value}>
      {children}
    </BookmarksContext.Provider>
  )
}

export default BookmarksProvider
