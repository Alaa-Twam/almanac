import { Alert, Button, Typography, Box, Skeleton } from '@mui/material'
import { ApiError } from '../api/http'
import { useApod } from '../hooks/useApod'
import ErrorAlert from './ErrorAlert'
import { formatLongDate } from '../utils/date'
import BookmarkButton from './BookmarkButton'
import { createApodBookmark } from '../utils/bookmarkFactories'

interface ApodCardProps {
  date: string
}

function ApodCard({ date }: ApodCardProps) {
  const { data, isPending, isError, error, refetch } = useApod(date)

  if (isPending) {
    return (
      <Skeleton
        variant="rectangular"
        sx={{ borderRadius: 2, width: '100%', aspectRatio: '16/9' }}
      />
    )
  }

  if (isError) {
    const status = error instanceof ApiError ? error.status : undefined

    // date range limitation
    if (status === 400) {
      return (
        <Alert severity="info">
          No astronomy picture is available for this date.
        </Alert>
      )
    }

    return (
      <ErrorAlert
        message="Couldn't load the picture."
        onRetry={() => refetch()}
      />
    )
  }

  if (!data) {
    return null
  }

  const bookmark = createApodBookmark(data)

  if (data.media_type === 'video') {
    return (
      <Box
        sx={{
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
          p: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
          <Typography variant="h5" component="h2" sx={{ flexGrow: 1 }}>
            {data.title}
          </Typography>
          <BookmarkButton bookmark={bookmark} />
        </Box>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {formatLongDate(data.date)}
        </Typography>
        <Button
          variant="outlined"
          href={data.url}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ my: 1 }}
        >
          Watch video
        </Button>
        <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
          {data.explanation}
        </Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ position: 'relative', overflow: 'hidden', borderRadius: 2 }}>
      <Box
        component="img"
        src={data.url}
        alt={data.title}
        loading="lazy"
        sx={{
          display: 'block',
          width: '100%',
          aspectRatio: '16/9',
          objectFit: 'cover',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          background:
            'linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0) 75%)',
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: 760,
            mx: 'auto',
            px: 2,
            pb: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 0.5,
            color: 'common.white',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
            <Typography
              variant="h5"
              component="h2"
              sx={{ flexGrow: 1, fontWeight: 700 }}
            >
              {data.title}
            </Typography>
            <BookmarkButton bookmark={bookmark} />
          </Box>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            {formatLongDate(data.date)}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {data.explanation}
          </Typography>

          {data.copyright && (
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: 'block', mt: 1 }}
            >
              &copy; Image credit: {data.copyright.trim()}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default ApodCard
