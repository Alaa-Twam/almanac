import { Box, Chip, Button, Typography } from '@mui/material'
import type { OnThisDayEvent } from '../types/onThisDay'
import BookmarkButton from './BookmarkButton'
import { createOnThisDayBookmark } from '../utils/bookmarkFactories'
import type { BookmarkKind } from '../types/bookmark'
import { useState } from 'react'
import SummaryDialog from './SummaryDialog'


interface OnThisDayItemProps {
  item: OnThisDayEvent
  kind: BookmarkKind
  date: string
}

function OnThisDayItem({ item, kind, date }: OnThisDayItemProps) {
  const [summaryOpen, setSummaryOpen] = useState(false)
  const firstPage = item.pages[0]

  return (
    <Box sx={{ display: 'flex', gap: 1.5, py: 1, alignItems:'flex-start', borderBottom: '1px solid', borderColor:'divider', }}>
      <Chip label={item.year} size="small" />
      <Box sx={{flexGrow: 1}}>
        <Typography variant="body2">{item.text}</Typography>
        {firstPage && (
          <>
          <Button
          size="small"
          onClick={() => setSummaryOpen(true)}
          sx={{px:0, mt: 0.5}}
          >
            Learn More
          </Button>
          <SummaryDialog
            open={summaryOpen}
            onClose={() => setSummaryOpen(false)}
            title={firstPage.title}
            />
          </>

        )}
      </Box>
      <BookmarkButton bookmark={createOnThisDayBookmark(kind, item, date)} />
    </Box>
  )
}

export default OnThisDayItem
