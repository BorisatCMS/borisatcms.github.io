import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

// Session-scoped trail of pages actually visited (not folder structure, not
// backlinks) — shown at the top of the page as "Home → Waarom IK... → Timeline",
// i.e. every page visited before the current one, in the order they were
// visited. Cleared when the tab closes (sessionStorage).
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

// Pages are split across two independent trees ("/" + "/portfolio/..." for
// Dutch, "/en" + "/portfolio-en/..." for English). Language switching jumps
// straight from one tree to the other without passing through a homepage in
// between, so entries from the other language have to be filtered out here
// rather than relying on a homepage reset to clear them.
function pageLang(path) {
  return path === "/en" || path.indexOf("/portfolio-en/") === 0 ? "en" : "nl";
}

function renderVisitHistory() {
  const container = document.getElementById("visit-history-trail");
  if (!container) return;

  const currentPath = window.location.pathname;
  const currentTitle = document.title;
  const isHome = currentPath === "/" || currentPath === "/en";

  // Landing on the homepage always resets the trail — history starts fresh
  // from there, so nothing shows on the homepage itself either.
  const storedTrail = isHome ? [] : readTrail();

  // Drop any existing entry for the current page (revisiting moves it to the
  // end instead of duplicating) and any entry from the other language.
  const currentLang = pageLang(currentPath);
  const trail = storedTrail.filter(
    (item) => item.path !== currentPath && pageLang(item.path) === currentLang,
  );

  container.innerHTML = "";
  trail.forEach((item, i) => {
    if (i > 0) {
      const arrow = document.createElement("span");
      arrow.className = "visit-history-arrow";
      arrow.textContent = "\\u2192";
      container.appendChild(arrow);
    }
    const a = document.createElement("a");
    a.href = item.path;
    a.className = "internal visit-history-link";
    a.textContent = item.title;
    container.appendChild(a);
  });

  trail.push({ path: currentPath, title: currentTitle });
  writeTrail(trail);
}

document.addEventListener("nav", renderVisitHistory);
document.addEventListener("render", renderVisitHistory);
`

const VisitHistory: QuartzComponent = (_props: QuartzComponentProps) => {
  return <nav id="visit-history-trail" class="visit-history" aria-label="Visit history"></nav>
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
