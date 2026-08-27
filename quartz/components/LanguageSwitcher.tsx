import { resolveRelative } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

// A page opts into the switcher by setting `lang` and `translationKey` in its
// frontmatter. Any other page sharing the same `translationKey` but a
// different `lang` is treated as its translation. Only NL/EN exist today.
const LanguageSwitcher: QuartzComponent = ({ fileData, allFiles }: QuartzComponentProps) => {
  const translationKey = fileData.frontmatter?.translationKey as string | undefined
  const lang = fileData.frontmatter?.lang as string | undefined
  if (!translationKey || !lang) return null

  const other = allFiles.find(
    (f) => f.frontmatter?.translationKey === translationKey && f.frontmatter?.lang !== lang,
  )
  if (!other) return null

  const otherHref = resolveRelative(fileData.slug!, other.slug!)
  const nlHref = lang === "nl" ? null : otherHref
  const enHref = lang === "en" ? null : otherHref

  return (
    <div class="language-switcher">
      <span class="language-switcher-icon" aria-hidden="true" />
      {nlHref ? (
        <a class="language-switcher-option" href={nlHref}>
          NL
        </a>
      ) : (
        <span class="language-switcher-option is-active">NL</span>
      )}
      {enHref ? (
        <a class="language-switcher-option" href={enHref}>
          EN
        </a>
      ) : (
        <span class="language-switcher-option is-active">EN</span>
      )}
    </div>
  )
}

LanguageSwitcher.css = `
.language-switcher {
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  z-index: 20;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  height: 2.5rem;
  padding: 0 0.5rem 0 0.65rem;
  border-radius: 999px;
  background: var(--tertiary);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.18);
}

.language-switcher-icon {
  width: 1.15rem;
  height: 1.15rem;
  flex-shrink: 0;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Ccircle cx='12' cy='12' r='8' fill='none' stroke='white' stroke-width='1.6'/%3E%3Cellipse cx='12' cy='12' rx='3.2' ry='8' fill='none' stroke='white' stroke-width='1.6'/%3E%3Cline x1='4' y1='12' x2='20' y2='12' stroke='white' stroke-width='1.6'/%3E%3C/svg%3E");
}

.language-switcher-option {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 1.9rem;
  height: 1.9rem;
  padding: 0 0.55rem;
  border-radius: 999px;
  font-family: var(--bodyFont);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
}

.language-switcher-option.is-active {
  background: #fff;
  color: var(--tertiary);
}

a.language-switcher-option:hover {
  color: #fff;
}

/* At narrow widths the left-side search/darkmode/toc-toggle row and this
   pill are both anchored to the same bottom:1rem level and can run into
   each other — trim the icon and padding so both groups fit side by side
   instead of overlapping. */
@media (max-width: 480px) {
  .language-switcher {
    gap: 0.15rem;
    padding: 0 0.35rem;
  }

  .language-switcher-icon {
    display: none;
  }
}
`

export default (() => LanguageSwitcher) satisfies QuartzComponentConstructor
