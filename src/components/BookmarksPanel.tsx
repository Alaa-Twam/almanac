import { Button, Drawer, IconButton } from '@mui/material'
import { Close } from '@mui/icons-material'
import { Link as RouterLink } from 'react-router-dom'
import { useBookmarks } from '../hooks/useBookmarks'
import { formatLongDate, getTodayString } from '../utils/date'
import type { BookmarkKind } from '../types/bookmark'
import styles from './BookmarksPanel.module.css'

interface BookmarksPanelProps {
  open: boolean
  onClose: () => void
}

const KIND_LABELS: Record<BookmarkKind, string> = {
  apod: 'Picture',
  event: 'Event',
  birth: 'Birth',
  death: 'Death',
}

function BookmarksPanel({ open, onClose }: BookmarksPanelProps) {
  const { bookmarks, removeBookmark } = useBookmarks()
  const sorted = [...bookmarks].sort((a, b) =>
    b.savedAt.localeCompare(a.savedAt),
  )

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <div className={styles.panel}>
        <div className={styles.header}>
          <h2 className={styles.title}>Saved ({bookmarks.length})</h2>
          <IconButton onClick={onClose} aria-label="Close bookmarks" color='inherit'>
            <Close />
          </IconButton>
        </div>

        {sorted.length === 0 ? (
          <div className={styles.empty}>
            <p>You haven&apos;t saved anything yet.</p>
            <RouterLink
              className={styles.link}
              to={`/date/${getTodayString()}`}
              onClick={onClose}
            >
              Go to today&apos;s briefing
            </RouterLink>
          </div>
        ) : (
          <ul className={styles.list}>
            {sorted.map((bookmark) => (
              <li key={bookmark.id} className={styles.item}>
                {bookmark.imageUrl && (
                  <img
                    className={styles.image}
                    src={bookmark.imageUrl}
                    alt={bookmark.title}
                    loading="lazy"
                  />
                )}
                <span className={styles.kind}>
                  {KIND_LABELS[bookmark.kind]}
                </span>
                <p className={styles.itemTitle}>{bookmark.title}</p>
                <p className={styles.description}>{bookmark.description}</p>
                <div className={styles.links}>
                  <RouterLink
                    className={styles.link}
                    to={`/date/${bookmark.date}`}
                    onClick={onClose}
                  >
                    Saved from {formatLongDate(bookmark.date)}
                  </RouterLink>
                  {bookmark.link && (
                    <a
                      className={styles.link}
                      href={bookmark.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Read more
                    </a>
                  )}
                  <Button
                    className={styles.removeButton}
                    size="small"
                    variant='outlined'
                    color='inherit'
                    onClick={() => removeBookmark(bookmark.id)}
                  >
                    Remove
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Drawer>
  )
}

export default BookmarksPanel
