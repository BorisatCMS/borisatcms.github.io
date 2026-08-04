import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

interface CardSpec {
  title: string
  subhead?: string
  color?: string
  href?: string
}

// Renders as a colorful card grid when the page's frontmatter has a `cards:` list, e.g.:
//   cards:
//     - title: Getting Started
//       subhead: A short description line
//       color: "#5b7fb5"
//       href: /notes/getting-started
const CardGrid: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
  const cards = (fileData.frontmatter as { cards?: CardSpec[] } | undefined)?.cards
  if (!cards || cards.length === 0) return null

  return (
    <div class="card-grid">
      {cards.map((card) => {
        const style = card.color ? `--card-color: ${card.color}` : undefined
        const content = (
          <>
            <h2>{card.title}</h2>
            {card.subhead && <p class="card-grid-subhead">{card.subhead}</p>}
          </>
        )
        return card.href ? (
          <a class="card-grid-item" href={card.href} style={style}>
            {content}
          </a>
        ) : (
          <div class="card-grid-item card-grid-item-empty" style={style}>
            {content}
          </div>
        )
      })}
    </div>
  )
}

CardGrid.css = `
.card-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
  margin: 2rem 0;
}

@media (max-width: 768px) {
  .card-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.card-grid-item {
  --card-color: var(--gray);
  display: flex;
  flex-direction: column;
  /* Text sits at the top, leaving the space below free for an
     illustration (e.g. an <img> added after the title/subhead here). */
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  gap: 0.5rem;
  aspect-ratio: 1 / 1;
  padding: 1.25rem;
  border-radius: 0.5rem;
  background-color: var(--card-color);
  background-image: radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.08) 1px, transparent 0);
  background-size: 3px 3px;
  color: #fff;
  text-decoration: none;
  transition: transform 0.15s ease;
}

.card-grid-item:hover {
  transform: translateY(-2px);
}

.card-grid-item-empty {
  opacity: 0.5;
  cursor: default;
}

.card-grid-item h2 {
  margin: 0;
  font-size: 1.7rem;
  line-height: 1.15;
}

.card-grid-subhead {
  margin: 0;
  font-size: 1rem;
  line-height: 1.3;
  opacity: 0.85;
}
`

export default (() => CardGrid) satisfies QuartzComponentConstructor
