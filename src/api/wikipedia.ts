import { fetchJson } from './http'
import type { OnThisDayResponse } from '../types/onThisDay'

export function getOnThisDay(
  month: string,
  day: string,
  signal?: AbortSignal,
): Promise<OnThisDayResponse> {
  const url = `https://en.wikipedia.org/api/rest_v1/feed/onthisday/all/${month}/${day}`
  return fetchJson<OnThisDayResponse>(url, signal)
}
