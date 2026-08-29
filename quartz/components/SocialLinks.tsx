import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

// Update these to your actual profile URLs.
// YouTube and Instagram share the same 16x16 rounded-square badge (rect
// 4,4,16,16,rx5). LinkedIn and TikTok skip the badge outline (just the bare
// glyph, sized up via .social-links-icon-large) since a square border around
// their marks looked cluttered.
const LINKS = [
  {
    name: "YouTube",
    href: "https://www.youtube.com/@Boris-at-CMS/videos",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="4" width="16" height="16" rx="5" stroke="currentColor" stroke-width="1.8" />
        <path d="M10 8.5L16 12L10 15.5V8.5Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/boris_at_cms/",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="4" width="16" height="16" rx="5" stroke="currentColor" stroke-width="1.8" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.8" />
        <circle cx="16.5" cy="7.5" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/borys-popov-253bb1352/",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text
          x="12"
          y="16"
          font-size="9"
          font-weight="700"
          text-anchor="middle"
          fill="currentColor"
        >
          in
        </text>
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@boris_at_cms",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="9.5" cy="16" r="3" stroke="currentColor" stroke-width="1.8" />
        <path d="M12.5 16V5.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
        <path
          d="M12.5 7c.6 2.8 2.9 4.6 5.5 4.6"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linecap="round"
        />
      </svg>
    ),
  },
]

const SocialLinks: QuartzComponent = (_props: QuartzComponentProps) => {
  return (
    <div class="social-links">
      {LINKS.map((link) => (
        <a
          class={`social-links-icon${
            link.name === "LinkedIn"
              ? " social-links-icon-large"
              : link.name === "TikTok"
                ? " social-links-icon-tiktok"
                : ""
          }`}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.name}
          title={link.name}
        >
          {link.icon}
        </a>
      ))}
    </div>
  )
}

SocialLinks.css = `
.social-links {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
  padding: 1.5rem 0;
}

.social-links-icon,
.social-links-icon:hover,
.social-links-icon:visited,
.social-links-icon:active,
.social-links-icon:focus {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: var(--tertiary);
  color: #fff;
  transition: transform 0.15s ease;
}

.social-links-icon:hover {
  transform: translateY(-2px);
}

.social-links-icon svg {
  width: 1.2rem;
  height: 1.2rem;
}

.social-links-icon-large svg {
  width: 1.8rem;
  height: 1.8rem;
}

.social-links-icon-tiktok svg {
  width: 1.5rem;
  height: 1.5rem;
}

/* base.scss has a global rule targeting the literal <text> tag (for math/
   typst rendering) that sets fill: var(--darkgray), which beats this icon's
   fill="currentColor" and makes it shift with light/dark mode. Pin it. */
.social-links-icon-large svg text {
  fill: #fff;
}
`

export default (() => SocialLinks) satisfies QuartzComponentConstructor
