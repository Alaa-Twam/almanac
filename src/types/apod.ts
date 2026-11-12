export interface Apod {
  date: string
  title: string
  explanation: string
  url: string
  media_type: 'image' | 'video'
  copyright?: string
  hdurl?: string
}
