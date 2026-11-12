import { fetchJson } from './http'
import { addDays, getTodayString } from '../utils/date'
import type { City } from '../data/cities'
import type { DailyWeather, WeatherResponse } from '../types/weather'

const DAILY =
  'weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum'

function pickEndpoint(date: string): 'forecast' | 'archive' | null {
  const today = getTodayString()
  if (date > addDays(today, 15)) return null 
  if (date >= addDays(today, -90)) return 'forecast' 
  if (date >= '1940-01-01') return 'archive' 
  return null 
}

export async function getWeather(
  date: string,
  city: City,
  signal?: AbortSignal,
): Promise<DailyWeather | null> {
  const endpoint = pickEndpoint(date)
  if (!endpoint) return null

  const base =
    endpoint === 'forecast'
      ? 'https://api.open-meteo.com/v1/forecast'
      : 'https://archive-api.open-meteo.com/v1/archive'

  const url =
    `${base}?latitude=${city.latitude}&longitude=${city.longitude}` +
    `&start_date=${date}&end_date=${date}&daily=${DAILY}&timezone=auto`

  const { daily } = await fetchJson<WeatherResponse>(url, signal)
  if (!daily || daily.time.length === 0) return null

  return {
    date: daily.time[0],
    code: daily.weather_code[0],
    maxTemp: daily.temperature_2m_max[0],
    minTemp: daily.temperature_2m_min[0],
    precipitation: daily.precipitation_sum[0],
  }
}
