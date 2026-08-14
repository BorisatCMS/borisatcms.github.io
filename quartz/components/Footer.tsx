import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const LINKS: Record<string, string> = {
  "What does it contain?": "/Portfolio/all-rights-reserved",
  "Discord Community": "https://discord.gg/cRFFHYye7t",
}

const Footer: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
  return (
    <footer class={displayClass ?? ""}>
      <p>&copy; 2026 Borys Popov. All rights reserved.</p>
      <ul>
        {Object.entries(LINKS).map(([text, link]) => (
          <li>
            <a href={link}>{text}</a>
          </li>
        ))}
      </ul>
    </footer>
  )
}

Footer.css = `
footer {
  text-align: left;
  margin-bottom: 4rem;
  opacity: 0.7;
}

footer ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  gap: 1rem;
}
`

export default (() => Footer) satisfies QuartzComponentConstructor
