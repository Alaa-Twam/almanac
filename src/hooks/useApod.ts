import { useQuery } from '@tanstack/react-query'
import { getApod } from '../api/nasa'

export function useApod(date: string) {
  return useQuery({
    queryKey: ['apod', date],
    queryFn: ({ signal }) => getApod(date, signal),
  })
}