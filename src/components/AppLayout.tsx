import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import { Link as RouterLink, Outlet } from 'react-router-dom'
import { getTodayString } from '../utils/date'
import { useState } from 'react'
import { useBookmarks } from '../hooks/useBookmarks'
import BookmarksPanel from './BookmarksPanel'
import { Bookmarks } from '@mui/icons-material'

const COLUMN_MAX_WIDTH = 760

function AppLayout() {
  const todayPath = `/date/${getTodayString()}`
  const { bookmarks } = useBookmarks()
  const [bookmarksOpen, setBookmarksOpen] = useState(false)

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        color="transparent"
        sx={{ backgroundColor: 'background.default' }}
      >
        <Toolbar
          sx={{ width: '100%', maxWidth: COLUMN_MAX_WIDTH, mx: 'auto', gap: 1 }}
        >
          <Typography
            variant="h6"
            component={RouterLink}
            to={todayPath}
            sx={{
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
              flexGrow: 1,
            }}
          >
            Almanac
          </Typography>

          <Button
            color="inherit"
            onClick={() => setBookmarksOpen(true)}
            startIcon={<Bookmarks />}
          >
            Bookmarks ({bookmarks.length})
          </Button>
        </Toolbar>
      </AppBar>

      <Box
        component="main"
        sx={{ maxWidth: COLUMN_MAX_WIDTH, mx: 'auto', px: 2, py: 3 }}
      >
        <Outlet />
      </Box>

      <BookmarksPanel
        open={bookmarksOpen}
        onClose={() => setBookmarksOpen(false)}
      />
    </>
  )
}

export default AppLayout
