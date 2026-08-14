---
title: Werkwijze — NL/EN switch demo (approach 3, refined)
unlisted: true
---

<div class="lang-toggle-buttons">
<button type="button" class="lang-toggle-btn is-active" data-lang="nl">Nederlands</button>
<button type="button" class="lang-toggle-btn" data-lang="en">English</button>
</div>

<div id="lang-live-content" data-lang="nl">

**Elk project is anders.** Daarom pas ik mijn werkwijze aan op wat de productie nodig heeft — van fotografie tot een complete productie met Camera, Motion en Sound (CMS)

### 📝01 — Concept

We bepalen wat er gemaakt moet worden, wat het doel is en welke visuele en auditieve stijl daarbij past.

### ⏳02 — Voorbereiding (optioneel)

Wanneer nodig werken we het concept vooraf uit met bijvoorbeeld een draaiboek, script, shotlist, storyboard of moodboard.

### 🎥03 — Productie (optioneel)

De productie zelf: filmen, fotograferen en/of audio opnemen. Welke disciplines worden ingezet, hangt af van het project.

### 💻04 — Editen

Het materiaal wordt uitgewerkt tot het uiteindelijke product. Denk aan montage, Motion Design, Sound Design, audio-editing en color grading.

### 🤷🏻05 — Correctierondes

Na de eerste versie is er ruimte voor feedback en aanpassingen. Het maximale aantal correctierondes is afhankelijk van de gekozen dienst of het afgesproken tarief.

### ☑️06 — Oplevering

Na de laatste correcties wordt het definitieve resultaat geëxporteerd en opgeleverd in het gewenste formaat.

</div>

<div id="lang-template-en" class="lang-hidden-template">
<p><strong>Every project is different.</strong> [Placeholder translation] That's why I adapt my way of working to what the production needs — from photography to a complete production with Camera, Motion and Sound (CMS)</p>
<h3 id="en-concept">📝01 — Concept</h3>
<p>We determine what needs to be made, what the goal is, and which visual and auditory style fits it.</p>
<h3 id="en-preparation">⏳02 — Preparation (optional)</h3>
<p>When needed, we work out the concept in advance with, for example, a script, shotlist, storyboard or moodboard.</p>
<h3 id="en-production">🎥03 — Production (optional)</h3>
<p>The production itself: filming, photographing and/or recording audio. Which disciplines are used depends on the project.</p>
<h3 id="en-editing">💻04 — Editing</h3>
<p>The material is worked out into the final product. Think of editing, Motion Design, Sound Design, audio editing and color grading.</p>
<h3 id="en-revisions">🤷🏻05 — Revision rounds</h3>
<p>After the first version there is room for feedback and adjustments. The maximum number of revision rounds depends on the chosen service or the agreed rate.</p>
<h3 id="en-delivery">☑️06 — Delivery</h3>
<p>After the final corrections, the final result is exported and delivered in the desired format.</p>
</div>

<script>
(function () {
  var liveContent = document.getElementById("lang-live-content");
  var enTemplate = document.getElementById("lang-template-en");
  var buttons = document.querySelectorAll(".lang-toggle-btn");
  if (!liveContent || !enTemplate) return;
  var cache = {};

  function setActiveButton(lang) {
    buttons.forEach(function (b) {
      b.classList.toggle("is-active", b.dataset.lang === lang);
    });
  }

  // The sidebar Table of Contents is rendered server-side from whatever
  // language was live at build time (Dutch). Rebuild it from the headings
  // that are actually visible right now, same shape the TOC plugin uses:
  // <li class="depth-N"><a href="#slug" data-for="slug">text</a></li>
  function rebuildToc() {
    var list = document.querySelector(".sidebar.right .toc .toc-content");
    if (!list) return;

    var headers = liveContent.querySelectorAll("h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]");
    var depths = Array.prototype.map.call(headers, function (h) {
      return parseInt(h.tagName.substring(1), 10);
    });
    var minDepth = depths.length ? Math.min.apply(null, depths) : 0;

    var frag = document.createDocumentFragment();
    headers.forEach(function (h) {
      var li = document.createElement("li");
      li.className = "depth-" + (parseInt(h.tagName.substring(1), 10) - minDepth);
      var a = document.createElement("a");
      a.href = "#" + h.id;
      a.setAttribute("data-for", h.id);
      a.textContent = h.textContent;
      li.appendChild(a);
      frag.appendChild(li);
    });

    var end = list.querySelector(".overflow-end");
    Array.prototype.slice.call(list.children).forEach(function (child) {
      if (child !== end) list.removeChild(child);
    });
    if (end) {
      list.insertBefore(frag, end);
    } else {
      list.appendChild(frag);
    }
  }

  function switchTo(lang) {
    var current = liveContent.dataset.lang || "nl";
    if (lang === current) return;

    cache[current] = liveContent.innerHTML;
    if (cache[lang] !== undefined) {
      liveContent.innerHTML = cache[lang];
    } else if (lang === "en") {
      liveContent.innerHTML = enTemplate.innerHTML;
    } else {
      return;
    }

    liveContent.dataset.lang = lang;
    setActiveButton(lang);
    rebuildToc();

    // headings changed under the hood — let the TOC scroll-highlighting and
    // overflow-fade logic re-scan the page, same as after a real navigation
    document.dispatchEvent(new CustomEvent("nav", { detail: { url: window.location.pathname } }));
  }

  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      switchTo(btn.dataset.lang);
    });
  });
})();
</script>

<style>
.lang-toggle-buttons {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
.lang-toggle-btn {
  font-family: var(--bodyFont);
  font-size: 0.85rem;
  color: var(--darkgray);
  background: transparent;
  border: 1px solid var(--lightgray);
  border-radius: 999px;
  padding: 0.35rem 1rem;
  cursor: pointer;
}
.lang-toggle-btn.is-active {
  background: var(--tertiary);
  color: #fff;
  border-color: var(--tertiary);
}
.lang-hidden-template {
  display: none;
}
</style>
