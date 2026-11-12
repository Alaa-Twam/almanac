import { useQuery } from '@tanstack/react-query'
import { getOnThisDay } from '../api/wikipedia'
import { getMonthDay } from '../utils/date'

export function useOnThisDay(date: string) {
  const { month, day } = getMonthDay(date)
  return useQuery({
    queryKey: ['onThisDay', month, day],
    queryFn: ({ signal }) => getOnThisDay(month, day, signal),
  })
}
