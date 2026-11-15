import { fetchJson } from './http'
import type { Apod } from '../types/apod'

const API_KEY = import.meta.env.VITE_NASA_API_KEY || 'DEMO_KEY'

export function getApod(date: string, signal?: AbortSignal): Promise<Apod> {
  const url = `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${API_KEY}`
  return fetchJson<Apod>(url, signal)
}
