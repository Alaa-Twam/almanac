import {
  Box,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Link,
  Typography,
} from '@mui/material'
import { Close } from '@mui/icons-material'
import { useWikiSummary } from '../hooks/useWikiSummary'
import ErrorAlert from './ErrorAlert'

interface SummaryDialogProps {
  open: boolean
  onClose: () => void
  title: string
}

function SummaryDialog({ open, onClose, title }: SummaryDialogProps) {
  const { data, isPending, isError, refetch } = useWikiSummary(title, open)

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
        <Box component="span" sx={{ flexGrow: 1 }}>
          {data?.title ?? title.replace(/_/g, ' ')}
        </Box>
        <IconButton
          onClick={onClose}
          aria-label="Close"
          size="small"
          color="inherit"
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {isPending ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
            <CircularProgress />
          </Box>
        ) : isError ? (
          <ErrorAlert
            message="Couldn't load the summary."
            onRetry={() => refetch()}
          />
        ) : data ? (
          <>
            {data.thumbnail && (
              <Box
                component="img"
                src={data.thumbnail.source}
                alt={data.title}
                sx={{
                  float: 'right',
                  ml: 2,
                  mb: 1,
                  maxWidth: 140,
                  borderRadius: 1,
                }}
              />
            )}
            {data.description && (
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {data.description}
              </Typography>
            )}
            <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
              {data.extract}
            </Typography>
            {data.content_urls?.desktop?.page && (
              <Link
                href={data.content_urls.desktop.page}
                target="_blank"
                rel="noopener noreferrer"
                variant="body2"
                sx={{ display: 'inline-block', mt: 2 }}
              >
                View on Wikipedia
              </Link>
            )}
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  )
}

export default SummaryDialog
