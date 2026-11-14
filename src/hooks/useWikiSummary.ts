import { useQuery } from '@tanstack/react-query'
import { getPageSummary } from '../api/wikipedia'

export function useWikiSummary(title: string, enabled: boolean) {
  return useQuery({
    queryKey: ['wikiSummary', title],
    queryFn: ({ signal }) => getPageSummary(title, signal),
    enabled,
  })
}
