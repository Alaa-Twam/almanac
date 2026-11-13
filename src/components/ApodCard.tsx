import {
  Alert,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
} from '@mui/material'
import { ApiError } from '../api/http'
import { useApod } from '../hooks/useApod'
import CardSkeleton from './CardSkeleton'
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
    return <CardSkeleton />
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

  const isVideo = data.media_type === 'video'

  return (
    <Card>
      {!isVideo && (
        <CardMedia
          component="img"
          image={data.url}
          alt={data.title}
          loading="lazy"
        />
      )}
      <CardContent>
        <Box sx={{display: 'flex', alignItems: 'flex-start', gap: 1}}>
        <Typography variant="h6" component="h2">
          {data.title}
        </Typography>
        <BookmarkButton bookmark={createApodBookmark(data)}/>
        </Box>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {formatLongDate(data.date)}
        </Typography>

        {isVideo && (
          <Button
            variant="outlined"
            href={data.url}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ mb: 1 }}
          >
            Watch
          </Button>
        )}

        <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
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
      </CardContent>
    </Card>
  )
}

export default ApodCard
