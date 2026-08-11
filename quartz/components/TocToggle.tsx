import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

// Mobile-only third button (next to search/darkmode) that toggles the right
// sidebar's Table of Contents open as a full-screen, blurred overlay — the
// TOC is hidden by default on mobile (see custom.scss) so it doesn't take up
// page space until asked for.
const script = `
function setupTocToggle() {
  const button = document.getElementById("toc-toggle-button");
  const sidebar = document.querySelector(".sidebar.right");
  if (!button) return;

  const hasToc = !!(sidebar && sidebar.querySelector(".toc"));
  button.style.display = hasToc ? "" : "none";
  if (!hasToc) return;

  const toggle = () => {
    sidebar.classList.toggle("toc-open");
  };
  button.addEventListener("click", toggle);
  window.addCleanup(() => button.removeEventListener("click", toggle));

  // Close after following a TOC link.
  const links = sidebar.querySelectorAll(".toc-content a");
  const close = () => sidebar.classList.remove("toc-open");
  links.forEach((link) => link.addEventListener("click", close));
  window.addCleanup(() => links.forEach((link) => link.removeEventListener("click", close)));
}

document.addEventListener("nav", setupTocToggle);
document.addEventListener("render", setupTocToggle);
`

const TocToggle: QuartzComponent = (_props: QuartzComponentProps) => {
  return (
    <button id="toc-toggle-button" class="toc-toggle-button" aria-label="Table of Contents">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="5" y1="7" x2="19" y2="7" stroke="white" stroke-width="1.8" stroke-linecap="round" />
        <line x1="5" y1="12" x2="19" y2="12" stroke="white" stroke-width="1.8" stroke-linecap="round" />
        <line x1="5" y1="17" x2="19" y2="17" stroke="white" stroke-width="1.8" stroke-linecap="round" />
      </svg>
    </button>
  )
}

TocToggle.afterDOMLoaded = script

TocToggle.css = `
.toc-toggle-button {
  display: none;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: var(--tertiary);
  border: none;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.18);
}

.toc-toggle-button svg {
  width: 1.4rem;
  height: 1.4rem;
}
`

export default (() => TocToggle) satisfies QuartzComponentConstructor
