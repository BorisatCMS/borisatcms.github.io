import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const COPYRIGHT: Record<string, string> = {
  nl: "Alle rechten voorbehouden.",
  en: "All rights reserved.",
}

const LINKS: Record<string, { text: string; href: string }> = {
  nl: { text: "Wat houdt het in?", href: "/portfolio/alle-rechten-voorbehouden" },
  en: { text: "What does it contain?", href: "/portfolio-en/all-rights-reserved" },
}

const Footer: QuartzComponent = ({ displayClass, fileData }: QuartzComponentProps) => {
  const lang = (fileData.frontmatter?.lang as string | undefined) ?? "nl"
  const copyright = COPYRIGHT[lang] ?? COPYRIGHT.nl
  const rightsLink = LINKS[lang] ?? LINKS.nl

  return (
    <footer class={displayClass ?? ""}>
      <p>&copy; 2026 Borys Popov. {copyright}</p>
      <ul>
        <li>
          <a href={rightsLink.href}>{rightsLink.text}</a>
        </li>
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
  align-items: center;
  gap: 1rem;
}
`

export default (() => Footer) satisfies QuartzComponentConstructor
