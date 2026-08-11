import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

// Fallback text if `tickerItems` isn't set under `configuration:` in quartz.config.yaml.
const DEFAULT_ITEMS = ["edit tickerItems in quartz.config.yaml", "digital garden", "notes"]

// On wide screens, two copies of the text don't cover the full width, so once
// both scroll past there's a visible gap before the loop restarts. This
// measures the actual rendered width client-side and adds as many more
// (always an even number, so the -50% loop point still lands on a copy
// boundary) as needed to guarantee text is on screen at all times.
const script = `
function setupTicker() {
  const track = document.getElementById("ticker-track");
  if (!track) return;
  const items = track.querySelectorAll(".ticker-item");
  if (items.length === 0) return;
  const singleWidth = items[0].getBoundingClientRect().width;
  if (singleWidth === 0) return;
  const neededPerHalf = Math.max(1, Math.ceil(window.innerWidth / singleWidth));
  const totalNeeded = Math.min(neededPerHalf * 2, 60);
  if (items.length >= totalNeeded) return;
  const html = items[0].outerHTML;
  for (let i = items.length; i < totalNeeded; i++) {
    track.insertAdjacentHTML("beforeend", html);
  }
}
document.addEventListener("nav", setupTicker);
document.addEventListener("render", setupTicker);
window.addEventListener("resize", setupTicker);
`

const Ticker: QuartzComponent = ({ cfg }: QuartzComponentProps) => {
  const items = (cfg as { tickerItems?: string[] }).tickerItems ?? DEFAULT_ITEMS
  const text = items.join("   •   ")

  return (
    <div class="ticker">
      <div class="ticker-track" id="ticker-track">
        <span class="ticker-item">{text}</span>
        <span class="ticker-item" aria-hidden="true">
          {text}
        </span>
      </div>
    </div>
  )
}

Ticker.afterDOMLoaded = script

Ticker.css = `
.ticker {
  overflow: hidden;
  background: #000;
  color: #fff;
  white-space: nowrap;
  margin: 0;
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
  padding: 0.3rem 0.4rem 0.3rem 0;
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
