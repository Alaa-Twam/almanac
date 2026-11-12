import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from '@mui/material'
import { Link as RouterLink, useParams } from 'react-router-dom'
import DateNavigator from '../components/DateNavigator'
import { getTodayString, parseDateString } from '../utils/date'

const SECTION_TITLES = ['Weather', 'Astronomy picture', 'On this day']

function BriefingPage() {
  const { date } = useParams()

  if (!date || !parseDateString(date)) {
    return (
      <Box>
        <Typography variant="h5" component="h1" gutterBottom>
          Invalid Date
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          The address should be a real date yyyy-mm-dd.
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

  return (
    <Stack spacing={3}>
      <Typography variant="h6" component="p">
        Hodie!
      </Typography>

      <DateNavigator date={date} />

      <Stack spacing={2}>
        {SECTION_TITLES.map((title) => (
          <Card key={title}>
            <CardContent>
              <Typography variant="h6" component="h2" gutterBottom>
                {title}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Stack>
  )
}

export default BriefingPage
