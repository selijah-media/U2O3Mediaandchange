/**
 * APP
 * ---
 * Tiny hash-based router so the entire hub — home, topic pages, and every
 * embedded resource — lives on a single HTML page and never opens a new
 * browser tab. Only the URL hash changes; the header never unmounts.
 *
 * Routes:
 *   #/                                   -> home (topic grid)
 *   #/topic/:topicId                     -> topic resource list
 *   #/topic/:topicId/resource/:index     -> embedded resource viewer
 */

const appEl = document.getElementById("app");

function findTopic(topicId) {
  return SITE.topics.find((t) => t.id === topicId);
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/* ----------------------------------------------------------
   HEADER (persists across every route)
   ---------------------------------------------------------- */
function renderHeader(activeTopicId) {
  const menuItems = SITE.topics
    .map((t) => {
      const locked = t.status !== "active";
      const isCurrent = t.id === activeTopicId;
      if (locked) {
        return `
          <span class="topics-menu__item is-locked" aria-disabled="true">
            <span class="topics-menu__num">${t.number}</span>
            <span class="topics-menu__label">
              <span class="topics-menu__title">${escapeHtml(t.title)}</span>
              <span class="topics-menu__tag">Coming soon</span>
            </span>
          </span>`;
      }
      return `
        <a class="topics-menu__item${isCurrent ? " is-current" : ""}" href="#/topic/${t.id}">
          <span class="topics-menu__num">${t.number}</span>
          <span class="topics-menu__label">
            <span class="topics-menu__title">${escapeHtml(t.title)}</span>
          </span>
        </a>`;
    })
    .join("");

  return `
    <header class="hub-header">
      <div class="hub-header__bar">
        <button class="hub-header__home" id="homeBtn" aria-label="Go to hub home">
          <span class="hub-header__unit">${escapeHtml(SITE.unitLabel)}</span>
          <span class="hub-header__title">${escapeHtml(SITE.title)}</span>
        </button>
        <div class="hub-header__topics">
          <button class="topics-toggle" id="topicsToggle" aria-haspopup="true" aria-expanded="false">
            Topics
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <div class="topics-menu" id="topicsMenu" hidden role="menu">
            ${menuItems}
          </div>
        </div>
      </div>
      <div class="hub-header__edge"></div>
    </header>`;
}

function wireHeader() {
  const homeBtn = document.getElementById("homeBtn");
  const toggle = document.getElementById("topicsToggle");
  const menu = document.getElementById("topicsMenu");

  homeBtn.addEventListener("click", () => {
    location.hash = "#/";
  });

  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!expanded));
    menu.hidden = expanded;
  });

  document.addEventListener("click", (e) => {
    if (!menu.hidden && !menu.contains(e.target) && !toggle.contains(e.target)) {
      menu.hidden = true;
      toggle.setAttribute("aria-expanded", "false");
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !menu.hidden) {
      menu.hidden = true;
      toggle.setAttribute("aria-expanded", "false");
      toggle.focus();
    }
  });
}

/* ----------------------------------------------------------
   HOME
   ---------------------------------------------------------- */
function renderHome() {
  // All 8 home-page buttons (6 topics + 2 classroom resources) share one
  // card look and one grid, sized to fit on screen without scrolling.
  const topicCards = SITE.topics
    .map((t) => {
      const locked = t.status !== "active";
      const count = t.resources.length;
      if (locked) {
        return `
          <div class="topic-card is-locked" aria-disabled="true">
            <span class="topic-card__num">${t.number}</span>
            <div>
              <p class="topic-card__title">${escapeHtml(t.title)}</p>
              <p class="topic-card__meta">Coming soon</p>
            </div>
          </div>`;
      }
      return `
        <a class="topic-card" href="#/topic/${t.id}">
          <span class="topic-card__num">${t.number}</span>
          <div>
            <p class="topic-card__title">${escapeHtml(t.title)}</p>
            <p class="topic-card__meta">${count} resource${count === 1 ? "" : "s"}</p>
          </div>
        </a>`;
    })
    .join("");

  const classroomCards = (SITE.classroomResources || [])
    .filter((r) => r.type === "slides" || r.type === "report-guide")
    .map((r) => {
      const icon = r.type === "slides" ? "\u25B6" : "\u2263";
      const kind = r.type === "slides" ? "Slides" : "Guide";
      return `
        <a class="topic-card topic-card--resource" href="#/classroom/${r.id}">
          <span class="topic-card__num topic-card__num--resource">${icon}</span>
          <div>
            <p class="topic-card__title">${escapeHtml(r.title)}</p>
            <p class="topic-card__meta">${kind}</p>
          </div>
        </a>`;
    })
    .join("");

  return `
    ${renderHeader(null)}
    <main>
      <div class="page-wrap">
        <div class="home-hero">
          <p class="home-hero__eyebrow">${escapeHtml(SITE.unitLabel)}</p>
          <h1>${escapeHtml(SITE.title)}</h1>
          <p>Choose a topic to see the websites and articles approved for this SAC.</p>
        </div>
        <div class="topic-grid">${topicCards}${classroomCards}</div>
      </div>
    </main>`;
}

/* ----------------------------------------------------------
   TOPIC PAGE
   ---------------------------------------------------------- */
function renderTopic(topicId) {
  const topic = findTopic(topicId);

  if (!topic || topic.status !== "active") {
    return renderMissing();
  }

  const resourceCards = topic.resources
    .map((r, i) => {
      const badgeClass = r.type === "pdf" ? "type-pdf" : "type-link";
      const badgeLabel = r.type === "pdf" ? "PDF excerpt" : "Website";
      const source = r.sourceLabel
        ? `<span class="resource-card__source">${escapeHtml(r.sourceLabel)}</span>`
        : "";
      return `
        <a class="resource-card" href="#/topic/${topic.id}/resource/${i}">
          <span class="resource-card__badge ${badgeClass}">${badgeLabel}</span>
          <span class="resource-card__body">
            <span class="resource-card__title">${escapeHtml(r.title)}</span>
            <p class="resource-card__desc">${escapeHtml(r.description)}</p>
            ${source}
          </span>
          <span class="resource-card__arrow" aria-hidden="true">&rarr;</span>
        </a>`;
    })
    .join("");

  return `
    ${renderHeader(topic.id)}
    <main>
      <div class="page-wrap">
        <a class="topic-crumb" href="#/">&larr; All topics</a>
        <div class="topic-hero">
          <h1>Topic ${topic.number}: ${escapeHtml(topic.title)}</h1>
          <p>${escapeHtml(topic.summary)}</p>
        </div>
        <div class="resource-list">${resourceCards}</div>
      </div>
    </main>`;
}

/* ----------------------------------------------------------
   RESOURCE VIEWER
   ---------------------------------------------------------- */
function renderResource(topicId, index) {
  const topic = findTopic(topicId);
  if (!topic || topic.status !== "active") return renderMissing();

  const resource = topic.resources[index];
  if (!resource) return renderMissing();

  const isPdf = resource.type === "pdf";

  // PDFs: our own PDF.js canvas renderer (see initPdfViewer) — behaves
  // identically in Safari, Chrome, etc. and scrolls like a normal page.
  // Links: a plain iframe, with a fallback for sites that refuse to embed.
  // That fallback opens in a NEW WINDOW rather than navigating the hub
  // away — a deliberate trade-off against the "one tab only" exam setup,
  // at the teacher's request. Depending on the lockdown browser used for
  // the SAC, opening a second window may or may not even be permitted.
  const body = isPdf
    ? `<div class="pdf-scroll" id="pdfScroll" data-pdf-url="${escapeHtml(resource.url)}"></div>`
    : `
        <div class="viewer__frame-wrap">
          <iframe class="viewer__frame" src="${escapeHtml(resource.url)}" title="${escapeHtml(resource.title)}"></iframe>
        </div>
        <div class="viewer__fallback">
          <span>Page not appearing? Some sites don't allow themselves to be shown inside another page.</span>
          <a href="${escapeHtml(resource.url)}" target="_blank" rel="noopener noreferrer">Open in a new window</a>
        </div>`;

  return `
    ${renderHeader(topic.id)}
    <main>
      <div class="viewer">
        <div class="viewer__toolbar">
          <a class="viewer__back" href="#/topic/${topic.id}">&larr; Topic ${topic.number}</a>
          <span class="viewer__divider"></span>
          <span class="viewer__title">${escapeHtml(resource.title)}</span>
        </div>
        ${body}
      </div>
    </main>`;
}

/* ----------------------------------------------------------
   PDF VIEWER (PDF.js, rendered as scrollable canvases)
   ---------------------------------------------------------- */
if (window.pdfjsLib) {
  pdfjsLib.GlobalWorkerOptions.workerSrc = "vendor/pdfjs/pdf.worker.min.js";
}

let pdfResizeTimer = null;
let currentPdfUrl = null;

// Prefer the base64 copy embedded in pdf-data.js (generated by
// build-pdf-data.py) so nothing needs to be fetched at runtime — this is
// what makes PDFs work even when the site is opened straight from disk
// (file://), which blocks JS from fetching local files in some browsers.
// Falls back to a normal URL fetch for anything not yet in that file
// (e.g. a PDF just added before re-running the build script), which is
// fine as long as the site is being served over http(s) at that point.
function base64ToUint8Array(base64) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function loadPdfDocument(url) {
  if (window.PDF_DATA && window.PDF_DATA[url]) {
    return pdfjsLib.getDocument({ data: base64ToUint8Array(window.PDF_DATA[url]) }).promise;
  }
  return pdfjsLib.getDocument(url).promise;
}

async function renderPdfInto(container, url) {
  container.innerHTML = '<p class="pdf-status">Loading document\u2026</p>';

  if (!window.pdfjsLib) {
    container.innerHTML =
      '<div class="pdf-status pdf-status--error">The PDF viewer failed to load.<br><a href="' +
      escapeHtml(url) +
      '" target="_self">Open the PDF directly</a></div>';
    return;
  }

  try {
    const pdf = await loadPdfDocument(url);
    container.innerHTML = "";

    const outputScale = window.devicePixelRatio || 1;

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const available = container.clientWidth - 48; // page padding
      const unscaled = page.getViewport({ scale: 1 });
      const scale = Math.max(available / unscaled.width, 0.1);
      const viewport = page.getViewport({ scale });

      const canvas = document.createElement("canvas");
      canvas.className = "pdf-page";
      canvas.width = Math.floor(viewport.width * outputScale);
      canvas.height = Math.floor(viewport.height * outputScale);
      canvas.style.width = Math.floor(viewport.width) + "px";
      canvas.style.height = Math.floor(viewport.height) + "px";

      const ctx = canvas.getContext("2d");
      const transform = outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : undefined;

      container.appendChild(canvas);
      await page.render({ canvasContext: ctx, viewport, transform }).promise;
    }
  } catch (err) {
    container.innerHTML =
      '<div class="pdf-status pdf-status--error">This document couldn\u2019t be displayed.<br><a href="' +
      escapeHtml(url) +
      '" target="_self">Open the PDF directly</a></div>';
  }
}

function initPdfViewerIfPresent() {
  const container = document.getElementById("pdfScroll");
  if (!container) {
    currentPdfUrl = null;
    return;
  }
  currentPdfUrl = container.dataset.pdfUrl;
  renderPdfInto(container, currentPdfUrl);
}

// Re-render at the new width on resize/rotate so pages stay full-width
// instead of staying locked to whatever size they first loaded at.
window.addEventListener("resize", () => {
  if (!currentPdfUrl) return;
  clearTimeout(pdfResizeTimer);
  pdfResizeTimer = setTimeout(() => {
    const container = document.getElementById("pdfScroll");
    if (container) renderPdfInto(container, currentPdfUrl);
  }, 250);
});

/* ----------------------------------------------------------
   CLASSROOM RESOURCES (home page — not tied to a topic)
   ---------------------------------------------------------- */
function findClassroomResource(id) {
  return (SITE.classroomResources || []).find((r) => r.id === id);
}

function renderClassroomResource(id) {
  const resource = findClassroomResource(id);
  if (!resource) return renderMissing();

  if (resource.type === "slides") return renderSlideshow(resource);
  if (resource.type === "report-guide") return renderReportGuide(resource);
  return renderMissing();
}

/* ---- Generic classroom PDF viewer: same PDF.js canvas renderer used for
   topic resources, just reached via #/classroom/:id instead of a topic. ---- */
/* ---- Slideshow: click-through slide viewer, images pre-rendered from
   the source .pptx so it looks identical to the real deck in any
   browser, with no PowerPoint/viewer dependency. ---- */
function slidePath(resource, n) {
  const num = String(n).padStart(resource.slideDigits || 2, "0");
  return `${resource.slideFolder}/${resource.slidePrefix}${num}.${resource.slideExt}`;
}

function renderSlideshow(resource) {
  return `
    ${renderHeader(null)}
    <main>
      <div class="slideshow" id="slideshow" data-count="${resource.count || resource.slideCount}">
        <div class="slideshow__toolbar">
          <a class="viewer__back" href="#/">&larr; Home</a>
          <span class="viewer__divider"></span>
          <span class="viewer__title">${escapeHtml(resource.title)}</span>
          <span class="slideshow__counter" id="slideCounter"></span>
        </div>
        <div class="slideshow__stage" id="slideStage">
          <button class="slideshow__zone slideshow__zone--prev" id="slidePrevZone" aria-label="Previous slide"></button>
          <img class="slideshow__image" id="slideImage" alt="" />
          <button class="slideshow__zone slideshow__zone--next" id="slideNextZone" aria-label="Next slide"></button>
        </div>
        <div class="slideshow__controls">
          <button class="slideshow__btn" id="slidePrevBtn">&larr; Prev</button>
          <span class="slideshow__hint">Click the sides of the slide, use the arrow keys, or the buttons</span>
          <button class="slideshow__btn" id="slideNextBtn">Next &rarr;</button>
        </div>
      </div>
    </main>`;
}

let slideshowState = null;

function initSlideshowIfPresent() {
  const el = document.getElementById("slideshow");
  slideshowState = null;
  if (!el) return;

  const resource = findClassroomResource(location.hash.split("/")[2]);
  if (!resource) return;

  const total = resource.slideCount;
  let current = 1;

  const img = document.getElementById("slideImage");
  const counter = document.getElementById("slideCounter");

  function show(n) {
    current = Math.min(Math.max(n, 1), total);
    img.src = slidePath(resource, current);
    img.alt = `Slide ${current} of ${total}`;
    counter.textContent = `${current} / ${total}`;
  }

  document.getElementById("slidePrevZone").addEventListener("click", () => show(current - 1));
  document.getElementById("slideNextZone").addEventListener("click", () => show(current + 1));
  document.getElementById("slidePrevBtn").addEventListener("click", () => show(current - 1));
  document.getElementById("slideNextBtn").addEventListener("click", () => show(current + 1));

  slideshowState = {
    onKeydown(e) {
      if (e.key === "ArrowRight" || e.key === " ") show(current + 1);
      else if (e.key === "ArrowLeft") show(current - 1);
    },
  };
  document.addEventListener("keydown", slideshowState.onKeydown);

  show(1);
}

function teardownSlideshow() {
  if (slideshowState) {
    document.removeEventListener("keydown", slideshowState.onKeydown);
    slideshowState = null;
  }
}

/* ---- Report Writing Guide: accordion of headings, each opening to an
   intro line, a bullet list, and (optionally) a short terminology note. ---- */
function renderReportGuide(resource) {
  const sections = resource.sections
    .map((s, i) => {
      const introHtml = s.intro ? `<p class="accordion-panel__intro">${escapeHtml(s.intro)}</p>` : "";
      const bulletsHtml = `
        <ul class="accordion-panel__list">
          ${s.bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join("")}
        </ul>`;
      const noteHtml = s.note
        ? `
          <div class="accordion-panel__note">
            <p class="accordion-panel__note-label">${escapeHtml(s.note.label)}</p>
            ${s.note.items
              .map(
                (it) =>
                  `<p><strong>${escapeHtml(it.term)}:</strong> ${escapeHtml(it.def)}</p>`
              )
              .join("")}
          </div>`
        : "";

      return `
        <div class="accordion-item">
          <button class="accordion-trigger" data-index="${i}" aria-expanded="${i === 0 ? "true" : "false"}">
            <span>${escapeHtml(s.heading)}</span>
            <span class="accordion-trigger__chevron" aria-hidden="true">&darr;</span>
          </button>
          <div class="accordion-panel" ${i === 0 ? "" : "hidden"}>
            ${introHtml}
            ${bulletsHtml}
            ${noteHtml}
          </div>
        </div>`;
    })
    .join("");

  return `
    ${renderHeader(null)}
    <main>
      <div class="page-wrap page-wrap--narrow">
        <a class="topic-crumb" href="#/">&larr; Home</a>
        <div class="topic-hero">
          <h1>${escapeHtml(resource.title)}</h1>
          <p>${escapeHtml(resource.description)}</p>
        </div>
        <div class="accordion" id="reportAccordion">${sections}</div>
      </div>
    </main>`;
}

function initReportGuideIfPresent() {
  const accordion = document.getElementById("reportAccordion");
  if (!accordion) return;

  accordion.querySelectorAll(".accordion-trigger").forEach((btn) => {
    btn.addEventListener("click", () => {
      const panel = btn.nextElementSibling;
      const expanded = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!expanded));
      panel.hidden = expanded;
    });
  });
}

/* ----------------------------------------------------------
   MISSING / LOCKED
   ---------------------------------------------------------- */
function renderMissing() {
  return `
    ${renderHeader(null)}
    <main>
      <div class="page-wrap">
        <div class="empty-state">
          <h1>That page isn't available yet</h1>
          <p>This topic hasn't been set up, or the resource you're looking for doesn't exist.</p>
          <a class="btn-home" href="#/">Back to all topics</a>
        </div>
      </div>
    </main>`;
}

/* ----------------------------------------------------------
   ROUTER
   ---------------------------------------------------------- */
function parseHash() {
  const hash = location.hash.replace(/^#\/?/, "");
  const parts = hash.split("/").filter(Boolean);

  if (parts.length === 0) return { name: "home" };

  if (parts[0] === "topic" && parts[1]) {
    if (parts[2] === "resource" && parts[3] !== undefined) {
      return { name: "resource", topicId: parts[1], index: Number(parts[3]) };
    }
    return { name: "topic", topicId: parts[1] };
  }

  if (parts[0] === "classroom" && parts[1]) {
    return { name: "classroom", resourceId: parts[1] };
  }

  return { name: "home" };
}

function render() {
  const route = parseHash();
  let html;

  teardownSlideshow();

  if (route.name === "home") html = renderHome();
  else if (route.name === "topic") html = renderTopic(route.topicId);
  else if (route.name === "resource") html = renderResource(route.topicId, route.index);
  else if (route.name === "classroom") html = renderClassroomResource(route.resourceId);
  else html = renderHome();

  appEl.innerHTML = html;
  wireHeader();
  initPdfViewerIfPresent();
  initSlideshowIfPresent();
  initReportGuideIfPresent();
  window.scrollTo(0, 0);
}

window.addEventListener("hashchange", render);
window.addEventListener("DOMContentLoaded", render);
