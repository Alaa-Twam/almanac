export interface WikiPage {
  title: string
  content_urls?: {
    desktop?: { page: string }
    mobile?: { page: string }
  }
}

// event
export interface OnThisDayEvent {
  text: string
  year: number
  pages: WikiPage[]
}

export interface OnThisDayResponse {
  events: OnThisDayEvent[]
  births: OnThisDayEvent[]
  deaths: OnThisDayEvent[]
}
