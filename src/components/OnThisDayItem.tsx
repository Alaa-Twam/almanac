import { Box, Chip, Link, Typography } from '@mui/material'
import type { OnThisDayEvent } from '../types/onThisDay'

interface OnThisDayItemProps {
  item: OnThisDayEvent
}

function OnThisDayItem({ item }: OnThisDayItemProps) {
  const url = item.pages[0]?.content_urls?.desktop?.page

  return (
    <Box sx={{ display: 'flex', gap: 1.5, py: 1 }}>
      <Chip label={item.year} size="small" />
      <Box>
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
    </Box>
  )
}

export default OnThisDayItem
