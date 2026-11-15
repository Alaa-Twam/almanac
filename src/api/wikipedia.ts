import { fetchJson } from './http'
import type { OnThisDayResponse } from '../types/onThisDay'
import type { WikiSummary } from '../types/wikiSummary'

export function getOnThisDay(
  month: string,
  day: string,
  signal?: AbortSignal,
): Promise<OnThisDayResponse> {
  const url = `https://en.wikipedia.org/api/rest_v1/feed/onthisday/all/${month}/${day}`
  return fetchJson<OnThisDayResponse>(url, signal)
}

export function getPageSummary(
  title: string,
  signal?: AbortSignal,
): Promise<WikiSummary> {
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`
  return fetchJson<WikiSummary>(url, signal)
}
