import {
  AcUnit,
  Cloud,
  Foggy,
  Grain,
  Help,
  Thunderstorm,
  Umbrella,
  WaterDrop,
  WbCloudy,
  WbSunny,
} from '@mui/icons-material'
import type { SvgIconComponent } from '@mui/icons-material'

export interface WeatherInfo {
  label: string
  icon: SvgIconComponent
}

const WEATHER_CODES: Record<number, WeatherInfo> = {
  0: { label: 'Clear sky', icon: WbSunny },
  1: { label: 'Mainly clear', icon: WbSunny },
  2: { label: 'Partly cloudy', icon: WbCloudy },
  3: { label: 'Overcast', icon: Cloud },
  45: { label: 'Fog', icon: Foggy },
  48: { label: 'Fog', icon: Foggy },
  51: { label: 'Drizzle', icon: Grain },
  53: { label: 'Drizzle', icon: Grain },
  55: { label: 'Drizzle', icon: Grain },
  56: { label: 'Freezing drizzle', icon: Grain },
  57: { label: 'Freezing drizzle', icon: Grain },
  61: { label: 'Rain', icon: Umbrella },
  63: { label: 'Rain', icon: Umbrella },
  65: { label: 'Rain', icon: Umbrella },
  66: { label: 'Freezing rain', icon: Umbrella },
  67: { label: 'Freezing rain', icon: Umbrella },
  71: { label: 'Snow', icon: AcUnit },
  73: { label: 'Snow', icon: AcUnit },
  75: { label: 'Snow', icon: AcUnit },
  77: { label: 'Snow grains', icon: AcUnit },
  80: { label: 'Rain showers', icon: WaterDrop },
  81: { label: 'Rain showers', icon: WaterDrop },
  82: { label: 'Rain showers', icon: WaterDrop },
  85: { label: 'Snow showers', icon: AcUnit },
  86: { label: 'Snow showers', icon: AcUnit },
  95: { label: 'Thunderstorm', icon: Thunderstorm },
  96: { label: 'Thunderstorm with hail', icon: Thunderstorm },
  99: { label: 'Thunderstorm with hail', icon: Thunderstorm },
}

export function getWeatherInfo(code: number): WeatherInfo {
  return WEATHER_CODES[code] ?? { label: 'Unknown', icon: Help }
}
