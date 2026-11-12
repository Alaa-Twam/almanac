export interface City {
  name: string
  latitude: number
  longitude: number
}

export const CITIES: City[] = [
  { name: 'London', latitude: 51.5074, longitude: -0.1278 },
  { name: 'New York', latitude: 40.7128, longitude: -74.006 },
  { name: 'Tokyo', latitude: 35.6762, longitude: 139.6503 },
  { name: 'Madrid', latitude: 40.4168, longitude: -3.7038 },
  { name: 'Cairo', latitude: 30.0444, longitude: 31.2357 },
  { name: 'Sydney', latitude: -33.8688, longitude: 151.2093 },
]

export const DEFAULT_CITY: City =
  CITIES.find((city) => city.name === 'Madrid') ?? CITIES[0]
