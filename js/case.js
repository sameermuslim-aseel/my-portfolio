/* =========================================================================
   Case-study page: case.html?p=<slug> — content comes from data.js caseStudies
   ========================================================================= */

const $ = (sel, root = document) => root.querySelector(sel);
const pad = (n) => String(n).padStart(2, "0");

function escapeHtml(text) {
  const map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  return String(text).replace(/[&<>"']/g, (c) => map[c]);
}
function richText(text) {
  return escapeHtml(text).replace(
    /\[([^\]]+)\]\(([^)\s]+)\)/g,
    (_, label, url) => `<a href="${url}" target="_blank" rel="noopener noreferrer">${label}</a>`
  );
}

// mobile menu (same behaviour as the home page)
const nav = $("#nav");
const menuBtn = $("#nav-menu");
function setMenu(open) {
  nav.classList.toggle("open", open);
  menuBtn.setAttribute("aria-expanded", open);
  menuBtn.setAttribute("aria-label", open ? t("closeMenu", "Close menu") : t("menu", "Menu"));
}
menuBtn.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
document.addEventListener("keydown", (e) => e.key === "Escape" && setMenu(false));
document.addEventListener("click", (e) => !nav.contains(e.target) && setMenu(false));

const cases = SITE_DATA.caseStudies.filter((c) => c.slug);
const slug = new URLSearchParams(location.search).get("p");
const index = cases.findIndex((c) => c.slug === slug);
const main = $("#case");

if (index === -1) {
  main.innerHTML = `
    <section class="case-missing container">
      <p class="hand">${t("notFoundNote", "hmm, this frame is empty ✎")}</p>
      <h1 class="display">${t("notFound", "Case study not found.")}</h1>
      <a class="btn btn-accent" href="index.html#work">${t("seeAll", "See all work")}</a>
    </section>`;
} else {
  const c = cases[index];
  const next = cases[(index + 1) % cases.length];
  const wire = c.compare && c.compare.kind === "wireframe";
  const caption = c.compare && (c.compare.caption || (wire ? t("wireCaption", "Drag the handle: the first wireframe on the left, the shipped design on the right.") : ""));
  document.title = `${c.title} — ${t("caseStudy", "case study")} | ${t("me", "Sameer Muslim")}`;
  $('meta[name="description"]').setAttribute("content", c.summary);

  main.innerHTML = `
  <article>
    <header class="case-hero container">
      <a class="case-back" href="index.html#work">${t("allWork", "← All work")}</a>
      <p class="frame-label">${t("case", "Case")} ${num(pad(index + 1))} — ${escapeHtml(c.title)}</p>
      <p class="eyebrow">${escapeHtml(c.client)} · ${escapeHtml(c.year)}</p>
      <h1 class="case-title"><span class="sel">${escapeHtml(c.title)}<i class="handle h-tl"></i><i class="handle h-tr"></i><i class="handle h-bl"></i><i class="handle h-br"></i><span class="badge">H1 · ${LANG === "fa" ? "Vazirmatn 800" : "Fraunces 600"}</span></span></h1>
      <p class="case-summary">${richText(c.summary)}</p>
      <dl class="case-facts">
        ${c.facts.map(([k, v]) => `<div><dt>${escapeHtml(k)}</dt><dd>${escapeHtml(v)}</dd></div>`).join("")}
      </dl>
      <a class="case-cover" href="${c.url}" target="_blank" rel="noopener noreferrer">
        <span class="frame-label">cover.webp</span>
        <img src="${c.image}" alt="${escapeHtml(c.title)} preview" />
      </a>
    </header>

    <section class="case-section container" aria-labelledby="brief">
      <h2 class="case-h" id="brief"><span>${num("01")}</span>${t("brief", "The brief")}</h2>
      <div class="case-brief">
        <div class="sticky"><b>${t("problem", "The problem")}</b>${escapeHtml(c.problem)}</div>
        <div class="sticky g"><b>${t("myRole", "My role")}</b>${escapeHtml(c.myRole)}</div>
        <div class="sticky p"><b>${t("shipped", "What shipped")}</b>${escapeHtml(c.shipped)}</div>
      </div>
    </section>

    ${
      c.compare
        ? `
    <section class="case-section container" aria-label="${t("beforeAfter", "Before and after")}">
      <figure class="compare">
        <div class="compare-box" style="--pos: 50%">
          <img src="${c.compare.after}" alt="${t("after", "After")}: ${escapeHtml(c.title)}" />
          <img class="compare-before" src="${c.compare.before}" alt="${wire ? t("wireframe", "Wireframe") : t("before", "Before")}: ${escapeHtml(c.title)}" />
          <span class="compare-tag before">${wire ? t("wireframe", "Wireframe") : t("before", "Before")}</span><span class="compare-tag after">${wire ? t("final", "Final design") : t("after", "After")}</span>
          <span class="compare-handle" aria-hidden="true">⇆</span>
          <input class="compare-range" type="range" min="0" max="100" value="50" aria-label="${t("compareLabel", "Drag to compare before and after")}" />
        </div>
        ${caption ? `<figcaption>${escapeHtml(caption)}</figcaption>` : ""}
      </figure>
    </section>`
        : ""
    }

    <section class="case-section container" aria-labelledby="process">
      <h2 class="case-h" id="process"><span>${num("02")}</span>${t("howItCame", "How it came together")}</h2>
      <ol class="case-steps">
        ${c.process
          .map(
            (s, i) => `
          <li class="case-step">
            <span class="step-n">${num(pad(i + 1))}</span>
            <h3>${escapeHtml(s.title)}</h3>
            <p>${richText(s.text)}</p>
          </li>`
          )
          .join("")}
      </ol>
    </section>

    ${
      c.decisions && c.decisions.length
        ? `
    <section class="case-section container" aria-labelledby="decisions">
      <h2 class="case-h" id="decisions"><span>${num("03")}</span>${t("decisions", "Design decisions")}</h2>
      <div class="case-decisions">
        ${c.decisions
          .map(
            (d) => `
          <figure class="comment">
            <div class="comment-pin"><img src="images/my-avatar.webp" alt="" /></div>
            <div class="comment-body">
              <figcaption class="comment-who"><b>${escapeHtml(d.title)}</b></figcaption>
              <p class="comment-text">${richText(d.text)}</p>
              <div class="comment-foot"><span>${t("meShort", "Sameer")}</span><span class="resolved">${t("resolved", "✓ Resolved")}</span></div>
            </div>
          </figure>`
          )
          .join("")}
      </div>
    </section>`
        : ""
    }

    <section class="case-section container" aria-labelledby="outcome">
      <h2 class="case-h" id="outcome"><span>${num(c.decisions && c.decisions.length ? "04" : "03")}</span>${t("outcome", "What came out of it")}</h2>
      <ul class="case-outcome">
        ${c.outcome.map((o) => `<li>${richText(o)}</li>`).join("")}
      </ul>
      <a class="btn btn-line" href="${c.url}" target="_blank" rel="noopener noreferrer">${t("openProject", "Open the project ↗")}</a>
    </section>

    <a class="case-next" href="case.html?p=${next.slug}">
      <span class="eyebrow">${t("nextCase", "Next case")}</span>
      <span class="case-next-title">${escapeHtml(next.title)} →</span>
      <img src="${next.image}" alt="" loading="lazy" />
    </a>
  </article>`;
}

// Before/after slider: the range input moves the divider (keyboard friendly too)
document.querySelectorAll(".compare-box").forEach((box) => {
  const range = box.querySelector(".compare-range");
  range.addEventListener("input", () => box.style.setProperty("--pos", range.value + "%"));
});
