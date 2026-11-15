import { Box, Button, Stack, Typography } from '@mui/material'
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
    <Stack spacing={3} sx={{ pb: 20 }}>
      <Typography
        variant="h2"
        component="h1"
        sx={{ textAlign: 'center', fontWeight: 700, mt: 1 }}
      >
        Hodie!
      </Typography>

      <Typography color="text.secondary" sx={{ textAlign: 'center' }}>
        Scroll down to see the photo of the day, the weather, and historical
        events for this date.
      </Typography>

      <ApodCard date={date} />

      <WeatherCard date={date} city={city} onCityChange={setCity} />

      <OnThisDayCard date={date} />

      <Box
        sx={{
          position: 'fixed',
          bottom: { xs: 16, sm: 24 },
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'calc(100% - 32px)',
          maxWidth: 820,
          zIndex: (theme) => theme.zIndex.appBar,
          px: 2,
          py: 1.5,
          borderRadius: 3,
          backgroundColor: 'var(--almanac-panel)',
          backdropFilter: 'blur(8px)',
          border: '1px solid',
          borderColor: 'divider',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)',
        }}
      >
        <DateNavigator date={date} />
      </Box>
    </Stack>
  )
}

export default BriefingPage
