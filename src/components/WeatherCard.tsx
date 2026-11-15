import {
  Alert,
  Box,
  Card,
  CardContent,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material'
import { useWeather } from '../hooks/useWeather'
import { getWeatherInfo } from '../utils/weatherCodes'
import CitySelect from './CitySelect'
import ErrorAlert from './ErrorAlert'
import type { City } from '../data/cities'

interface WeatherCardProps {
  date: string
  city: City
  onCityChange: (city: City) => void
}

function WeatherCard({ date, city, onCityChange }: WeatherCardProps) {
  const { data, isPending, isError, refetch } = useWeather(date, city)

  let body
  if (isPending) {
    body = (
      <Stack spacing={1}>
        <Skeleton width="50%" />
        <Skeleton width="40%" />
      </Stack>
    )
  } else if (isError) {
    body = (
      <ErrorAlert
        message="Couldn't load the weather."
        onRetry={() => refetch()}
      />
    )
  } else if (!data) {
    body = (
      <Alert severity="info">No weather data available for this date.</Alert>
    )
  } else {
    const info = getWeatherInfo(data.code)
    const Icon = info.icon
    body = (
      <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
        <Icon fontSize="large" />
        <Box>
          <Typography>{info.label}</Typography>
          <Typography variant="body2" color="text.secondary">
            High {Math.round(data.maxTemp)}°C · Low {Math.round(data.minTemp)}°C
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Precipitation {data.precipitation} mm
          </Typography>
        </Box>
      </Stack>
    )
  }

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            flexWrap: 'wrap',
            mb: 1,
          }}
        >
          <Typography variant="h6" component="h2">
            Weather in {city.name}
          </Typography>
          <Box sx={{ flexGrow: 1, minWidth: 150 }}>
            <CitySelect value={city} onChange={onCityChange} />
          </Box>
        </Box>

        <Box sx={{ mt: 2 }}>{body}</Box>
      </CardContent>
    </Card>
  )
}

export default WeatherCard
