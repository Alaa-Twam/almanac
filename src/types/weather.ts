export interface WeatherDaily {
  time: string[]
  weather_code: number[]
  temperature_2m_max: number[]
  temperature_2m_min: number[]
  precipitation_sum: number[]
}

export interface WeatherResponse {
  daily: WeatherDaily
}

export interface DailyWeather {
  date: string
  code: number
  maxTemp: number
  minTemp: number
  precipitation: number
}
