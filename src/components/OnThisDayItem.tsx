import { Box, Chip, Link, Typography } from '@mui/material'
import type { OnThisDayEvent } from '../types/onThisDay'
import BookmarkButton from './BookmarkButton'
import { createOnThisDayBookmark } from '../utils/bookmarkFactories'
import type { BookmarkKind } from '../types/bookmark' 


interface OnThisDayItemProps {
  item: OnThisDayEvent
  kind: BookmarkKind
  date: string
}

function OnThisDayItem({ item, kind, date }: OnThisDayItemProps) {
  const url = item.pages[0]?.content_urls?.desktop?.page

  return (
    <Box sx={{ display: 'flex', gap: 1.5, py: 1 }}>
      <Chip label={item.year} size="small" />
      <Box sx={{flexGrow: 1}}>
        <Typography variant="body2">{item.text}</Typography>
        {url && (
          <Link
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            variant="caption"
          >
            Read on Wikipedia
          </Link>
        )}
      </Box>
      <BookmarkButton bookmark={createOnThisDayBookmark(kind, item, date)} />
    </Box>
  )
}

export default OnThisDayItem
