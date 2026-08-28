import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const COPYRIGHT: Record<string, string> = {
  nl: "Alle rechten voorbehouden.",
  en: "All rights reserved.",
}

const LINKS: Record<string, { text: string; href: string }> = {
  nl: { text: "Wat houdt het in?", href: "/portfolio/alle-rechten-voorbehouden" },
  en: { text: "What does it contain?", href: "/portfolio-en/all-rights-reserved" },
}

const TIKTOK_HREF = "https://www.tiktok.com/@boris_at_cms"

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
        <li>
          <a href={TIKTOK_HREF} target="_blank" rel="noopener noreferrer" class="footer-icon-link" aria-label="TikTok" title="TikTok">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M14 4v10.8a3.3 3.3 0 1 1-3.3-3.3"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M14 4c.4 2.4 2.1 4 4.5 4.3"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </a>
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

.footer-icon-link {
  display: flex;
  align-items: center;
}

.footer-icon-link svg {
  width: 1.1rem;
  height: 1.1rem;
}
`

export default (() => Footer) satisfies QuartzComponentConstructor
