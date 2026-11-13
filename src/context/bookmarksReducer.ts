import type { Bookmark } from '../types/bookmark'

export type BookmarksAction =
  { type: 'ADD'; bookmark: Bookmark } | { type: 'REMOVE'; id: string }

export function bookmarksReducer(
  state: Bookmark[],
  action: BookmarksAction,
): Bookmark[] {
  switch (action.type) {
    case 'ADD':
      if (state.some((bookmark) => bookmark.id === action.bookmark.id)) {
        return state
      }
      return [action.bookmark, ...state]
    case 'REMOVE':
      return state.filter((bookmark) => bookmark.id !== action.id)
    default:
      return state
  }
}
