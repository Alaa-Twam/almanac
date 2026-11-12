import { useQuery } from '@tanstack/react-query'
import { getWeather } from '../api/openMeteo'
import type { City } from '../data/cities'

export function useWeather(date: string, city: City) {
  return useQuery({
    queryKey: ['weather', date, city.name],
    queryFn: ({ signal }) => getWeather(date, city, signal),
  })
}
