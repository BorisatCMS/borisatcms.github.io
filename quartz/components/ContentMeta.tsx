import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { Date as DateComponent, getDate, ValidDateType } from "./Date"

const WORDS_PER_MINUTE = 200

// Same date + "X min read" line as the content-meta plugin, but the reading
// time also accounts for embedded videos (quartz/plugins/transformers/videoTime.ts
// attaches file.data.videoMinutes) — plain word-count reading time ignores
// iframes entirely, so a page that's mostly video showed a misleadingly low time.
const ContentMeta: QuartzComponent = ({ cfg, fileData }: QuartzComponentProps) => {
  const text = fileData.text as string | undefined
  if (!text) return null

  const words = text.split(/\s+/).filter(Boolean).length
  const textMinutes = words / WORDS_PER_MINUTE
  const videoMinutes = (fileData.videoMinutes as number | undefined) ?? 0
  const totalMinutes = Math.max(1, Math.ceil(textMinutes + videoMinutes))

  const defaultDateType =
    (fileData.defaultDateType as ValidDateType | undefined) ??
    (cfg.defaultDateType as ValidDateType | undefined)
  const date =
    fileData.dates && defaultDateType ? getDate({ ...fileData, defaultDateType }) : undefined
  const locale = cfg.locale ?? "en-US"

  return (
    <p show-comma="true" class="content-meta">
      {date && <DateComponent date={date} locale={locale} />}
      <span>{totalMinutes} min read</span>
    </p>
  )
}

ContentMeta.css = `
.content-meta {
  margin-top: 0;
  color: var(--darkgray);
}

.content-meta[show-comma="true"] > *:not(:last-child) {
  margin-right: 8px;
}

.content-meta[show-comma="true"] > *:not(:last-child)::after {
  content: ",";
}
`

export default (() => ContentMeta) satisfies QuartzComponentConstructor
