import { IconButton, Tooltip } from '@mui/material'
import { Bookmark, BookmarkBorder } from '@mui/icons-material'
import { useBookmarks } from '../hooks/useBookmarks'
import type { Bookmark as BookmarkData } from '../types/bookmark'

interface BookmarkButtonProps {
  bookmark: BookmarkData
}

function BookmarkButton({ bookmark }: BookmarkButtonProps) {
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarks()
  const saved = isBookmarked(bookmark.id)
  const label = saved ? 'Remove from bookmarks' : 'Save to bookmarks'

  const handleClick = () => {
    if (saved) {
      removeBookmark(bookmark.id)
    } else {
      addBookmark(bookmark)
    }
  }

  return (
    <Tooltip title={label}>
      <IconButton
        onClick={handleClick}
        aria-label={label}
        aria-pressed={saved}
        size="small"
      >
        {saved ? <Bookmark /> : <BookmarkBorder />}
      </IconButton>
    </Tooltip>
  )
}

export default BookmarkButton
