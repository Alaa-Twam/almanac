import {
  Box,
  Button,
  Stack,
  Typography,
} from '@mui/material'
import { Link as RouterLink, useParams } from 'react-router-dom'
import DateNavigator from '../components/DateNavigator'
import { getTodayString, parseDateString } from '../utils/date'
import ApodCard from '../components/ApodCard'
import OnThisDayCard from '../components/OnThisDayCard'
import WeatherCard from '../components/WeatherCard'
import { DEFAULT_CITY } from '../data/cities'
import { useState } from 'react'


function BriefingPage() {
  const { date } = useParams()

  const [city, setCity] = useState(DEFAULT_CITY)

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
        <WeatherCard date={date} city={city} onCityChange={setCity} />

          <ApodCard date={date} />
          
          <OnThisDayCard date={date} />
      </Stack>
    </Stack>
  )
}

export default BriefingPage
