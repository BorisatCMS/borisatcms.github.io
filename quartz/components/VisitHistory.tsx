import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

// Session-scoped trail of pages actually visited (not folder structure, not
// backlinks) — shown at the top of the page as "Home → Waarom IK... → Timeline",
// i.e. every page visited before the current one, in the order they were
// visited. Cleared when the tab closes (sessionStorage).
//
// Each stored entry is tagged with the page's translationKey (if any). At
// render time every entry is displayed in whichever language is currently
// active — looked up from a site-wide translationKey -> {lang: {path,
// title}} map embedded on the page — rather than frozen in whatever
// language it happened to be visited in. Switching language elsewhere in
// the trail (e.g. clicking through to an English page) makes the whole
// trail flip to English too.
const script = `
const STORAGE_KEY = "quartz-visit-trail";
const MAX_TRAIL_LENGTH = 20;

function readTrail() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeTrail(trail) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(trail.slice(-MAX_TRAIL_LENGTH)));
  } catch {}
}

function renderVisitHistory() {
  const container = document.getElementById("visit-history-trail");
  if (!container) return;

  const currentPath = window.location.pathname;
  const currentTitle = document.title;
  const currentTranslationKey = container.dataset.translationKey || "";
  const currentLang = container.dataset.lang || "nl";
  let translationMap = {};
  try {
    translationMap = JSON.parse(container.dataset.translationMap || "{}");
  } catch {}

  const isHome = currentPath === "/" || currentPath === "/en";

  // Landing on either homepage always resets the trail — history starts
  // fresh from there, so nothing shows on the homepage itself either.
  const storedTrail = isHome ? [] : readTrail();

  // Drop any existing entry for the current page so pages never repeat in
  // the trail (a revisited page moves to the end instead of duplicating).
  // Also drop any entry sharing the current page's translationKey — that's
  // the *other-language version of this same page*, not a different page,
  // so switching language must not leave a stale link to itself behind.
  const trail = storedTrail.filter((item) => {
    if (item.path === currentPath) return false;
    if (currentTranslationKey && item.translationKey === currentTranslationKey) return false;
    return true;
  });

  container.innerHTML = "";
  trail.forEach((item, i) => {
    if (i > 0) {
      const arrow = document.createElement("span");
      arrow.className = "visit-history-arrow";
      arrow.textContent = "\\u2192";
      container.appendChild(arrow);
    }

    // Display in the currently active language when a translation exists.
    let displayPath = item.path;
    let displayTitle = item.title;
    const pair = item.translationKey && translationMap[item.translationKey];
    if (pair && pair[currentLang]) {
      displayPath = pair[currentLang].path;
      displayTitle = pair[currentLang].title;
    }

    const a = document.createElement("a");
    a.href = displayPath;
    a.className = "internal visit-history-link";
    a.textContent = displayTitle;
    container.appendChild(a);
  });

  trail.push({ path: currentPath, title: currentTitle, translationKey: currentTranslationKey });
  writeTrail(trail);
}

document.addEventListener("nav", renderVisitHistory);
document.addEventListener("render", renderVisitHistory);
`

const VisitHistory: QuartzComponent = ({ fileData, allFiles }: QuartzComponentProps) => {
  const translationKey = (fileData.frontmatter?.translationKey as string | undefined) ?? ""
  const lang = (fileData.frontmatter?.lang as string | undefined) ?? "nl"

  // Site-wide translationKey -> {lang: {path, title}} lookup, embedded on
  // every page so the client script can translate trail entries on the fly.
  const translationMap: Record<string, Record<string, { path: string; title: string }>> = {}
  for (const f of allFiles) {
    const key = f.frontmatter?.translationKey as string | undefined
    const fLang = f.frontmatter?.lang as string | undefined
    if (!key || !fLang || !f.slug) continue
    const path = f.slug === "index" ? "/" : `/${f.slug}`
    const title = (f.frontmatter?.title as string | undefined) ?? f.slug
    translationMap[key] = translationMap[key] ?? {}
    translationMap[key][fLang] = { path, title }
  }

  return (
    <nav
      id="visit-history-trail"
      class="visit-history"
      aria-label="Visit history"
      data-translation-key={translationKey}
      data-lang={lang}
      data-translation-map={JSON.stringify(translationMap)}
    ></nav>
  )
}

VisitHistory.afterDOMLoaded = script

VisitHistory.css = `
.visit-history {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: baseline;
  gap: 0.4rem;
  margin-bottom: 1rem;
  font-family: var(--bodyFont);
  font-size: 0.9rem;
}

.visit-history:empty {
  display: none;
}

.visit-history-link {
  color: var(--secondary);
}

.visit-history-arrow {
  color: var(--gray);
}
`

export default (() => VisitHistory) satisfies QuartzComponentConstructor
