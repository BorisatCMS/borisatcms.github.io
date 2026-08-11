import { visit } from "unist-util-visit"
import { QuartzTransformerPlugin } from "../types"

const vimeoIdRegex = /player\.vimeo\.com\/video\/(\d+)/g
const youtubeIdRegex = /(?:youtube\.com\/(?:embed\/|watch\?v=)|youtu\.be\/)([\w-]{11})/g

const YOUTUBE_FLAT_MINUTES = 2

const vimeoDurationCache = new Map<string, number>()

async function fetchVimeoDurationMinutes(videoId: string): Promise<number> {
  const cached = vimeoDurationCache.get(videoId)
  if (cached !== undefined) return cached

  try {
    const url = `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(`https://vimeo.com/${videoId}`)}`
    const res = await fetch(url)
    if (!res.ok) return 0
    const data = (await res.json()) as { duration?: number }
    const minutes = data.duration ? data.duration / 60 : 0
    vimeoDurationCache.set(videoId, minutes)
    return minutes
  } catch {
    return 0
  }
}

// Reading-time estimates (word count / wpm) ignore embedded videos entirely.
// This scans each page's raw HTML iframes for Vimeo/YouTube embeds and stores
// an extra "minutes to watch" figure on file.data.videoMinutes: real fetched
// duration for Vimeo (free oEmbed API), a flat estimate for YouTube (its
// oEmbed doesn't expose duration without an API key).
export const VideoReadingTime: QuartzTransformerPlugin = () => {
  return {
    name: "VideoReadingTime",
    markdownPlugins() {
      return [
        () => async (tree: unknown, file: { data: Record<string, unknown> }) => {
          const vimeoIds = new Set<string>()
          let youtubeCount = 0

          visit(tree as never, "html", (node: { value: string }) => {
            vimeoIdRegex.lastIndex = 0
            let match: RegExpExecArray | null
            while ((match = vimeoIdRegex.exec(node.value))) {
              vimeoIds.add(match[1])
            }

            youtubeIdRegex.lastIndex = 0
            while ((match = youtubeIdRegex.exec(node.value))) {
              youtubeCount++
            }
          })

          if (vimeoIds.size === 0 && youtubeCount === 0) return

          const vimeoMinutes = await Promise.all(
            [...vimeoIds].map((id) => fetchVimeoDurationMinutes(id)),
          )
          const totalVimeoMinutes = vimeoMinutes.reduce((a, b) => a + b, 0)

          file.data.videoMinutes = totalVimeoMinutes + youtubeCount * YOUTUBE_FLAT_MINUTES
        },
      ]
    },
  }
}
