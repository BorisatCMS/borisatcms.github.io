import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

// Fallback text if `tickerItems` isn't set under `configuration:` in quartz.config.yaml.
const DEFAULT_ITEMS = ["edit tickerItems in quartz.config.yaml", "digital garden", "notes"]

const Ticker: QuartzComponent = ({ cfg }: QuartzComponentProps) => {
  const items = (cfg as { tickerItems?: string[] }).tickerItems ?? DEFAULT_ITEMS
  const text = items.join("   •   ")

  return (
    <div class="ticker">
      <div class="ticker-track">
        <span class="ticker-item">{text}</span>
        <span class="ticker-item" aria-hidden="true">
          {text}
        </span>
      </div>
    </div>
  )
}

Ticker.css = `
.ticker {
  overflow: hidden;
  background: #000;
  color: #fff;
  white-space: nowrap;
  margin: 80px 0;
}

.ticker-track {
  display: flex;
  width: max-content;
  animation: ticker-scroll 32s linear infinite;
}

.ticker-track:hover {
  animation-play-state: paused;
}

.ticker-item {
  padding: 0.3rem 1.5rem 0.3rem 0;
  font-family: ui-monospace, SFMono-Regular, "Cascadia Mono", Menlo, monospace;
  font-size: 0.8rem;
  letter-spacing: 0.02em;
}

@keyframes ticker-scroll {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@media (prefers-reduced-motion: reduce) {
  .ticker-track {
    animation: none;
  }
}
`

export default (() => Ticker) satisfies QuartzComponentConstructor
