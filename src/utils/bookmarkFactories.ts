import type { Apod } from '../types/apod'
import type { Bookmark, BookmarkKind } from '../types/bookmark'
import type { OnThisDayEvent } from '../types/onThisDay'

export function createApodBookmark(apod: Apod): Bookmark {
  const isImage = apod.media_type === 'image'
  return {
    id: `apod:${apod.date}`,
    kind: 'apod',
    title: apod.title,
    description: apod.explanation,
    date: apod.date,
    imageUrl: isImage ? apod.url : undefined,
    link: isImage ? apod.hdurl : apod.url,
    savedAt: new Date().toISOString(),
  }
}

export function createOnThisDayBookmark(
  kind: BookmarkKind,
  item: OnThisDayEvent,
  date: string,
): Bookmark {
  const firstPage = item.pages[0]

  const idPart = firstPage?.title ?? item.text
  return {
    id: `${kind}:${item.year}:${idPart}`,
    kind,
    title: String(item.year),
    description: item.text,
    date,
    link: firstPage?.content_urls?.desktop?.page,
    savedAt: new Date().toISOString(),
  }
}
