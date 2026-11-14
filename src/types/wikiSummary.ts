export interface WikiSummary {
  title: string
  description?: string
  extract: string
  thumbnail?: { source: string; width?: number; height?: number }
  content_urls?: {
    desktop?: { page: string }
    mobile?: { page: string }
  }
}
