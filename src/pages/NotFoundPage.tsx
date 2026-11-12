import { Box, Button, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { getTodayString } from '../utils/date'

function NotFoundPage() {
  return (
    <Box>
      <Typography variant="h5" component="h1" gutterBottom>
        Page not found
      </Typography>
      <Typography color="text.secondary" gutterBottom>
        We couldn't find that page.
      </Typography>
      <Button
        component={RouterLink}
        to={`/date/${getTodayString()}`}
        variant="contained"
      >
        Go to today
      </Button>
    </Box>
  )
}

export default NotFoundPage
