/* =========================================================================
   Sameer Muslim — portfolio
   1. Render content from data.js (SITE_DATA)
   2. Motion with GSAP + ScrollTrigger + Lenis (desktop, motion allowed)
   3. Contact form + toast notifications
   ========================================================================= */

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

function escapeHtml(text) {
  const map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  return String(text).replace(/[&<>"']/g, (c) => map[c]);
}

function link(url, html, cls = "") {
  return `<a${cls ? ` class="${cls}"` : ""} href="${url}" target="_blank" rel="noopener noreferrer">${html}</a>`;
}

// Plain text where [link text](https://...) becomes a link
function richText(text) {
  return escapeHtml(text).replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label, url) => link(url, label));
}

const pad = (n) => String(n).padStart(2, "0");

/* =========================================================================
   1 · RENDER
   ========================================================================= */

const DATA = SITE_DATA;
const CASES = DATA.caseStudies;
const STICKY = ["", "g", "p"];

// Hero: the three featured projects
$("#hero-cards").innerHTML = CASES.map(
  (c) => `
  <a class="hero-card" href="case.html?p=${c.slug}">
    <img src="${c.image}" alt="" loading="lazy" />
    <span>${escapeHtml(c.title)}</span>
  </a>`
).join("");

// Work: each case study is a frame in the design file
$("#world").innerHTML = CASES.map(
  (c, i) => `
  <article class="frame" data-frame="${i}" aria-labelledby="case-${i}">
    <p class="frame-label">${t("case", "Case")} ${num(pad(i + 1))} — ${escapeHtml(c.title)}</p>
    <div class="frame-body">
      <div class="frame-main">
        <p class="kicker">${escapeHtml(c.client)} · ${escapeHtml(c.year)}</p>
        <h3 class="frame-title${i === 0 ? " sel" : ""}" id="case-${i}">${escapeHtml(c.title)}${
    i === 0
      ? '<i class="handle h-tl"></i><i class="handle h-tr"></i><i class="handle h-bl"></i><i class="handle h-br"></i><span class="badge">Title · Hug × Hug</span>'
      : ""
  }</h3>
        ${link(c.url, `<img src="${c.image}" alt="${escapeHtml(c.title)} preview" loading="lazy" />`, "shot")}
      </div>
      <div class="frame-notes">
        <div class="stickies">
          <div class="sticky"><b>${t("problem", "The problem")}</b>${escapeHtml(c.problem)}</div>
          <div class="sticky g"><b>${t("myRole", "My role")}</b>${escapeHtml(c.myRole)}</div>
          <div class="sticky p"><b>${t("shipped", "What shipped")}</b>${escapeHtml(c.shipped)}</div>
        </div>
        <p class="frame-note">${escapeHtml(c.note)}</p>
        <div class="frame-meta"><span>${escapeHtml(c.type)}</span><span class="frame-links">${link(c.url, t("live", "Live ↗"), "frame-link muted")}<a class="frame-link" href="case.html?p=${c.slug}">${t("readCase", "Read the case study →")}</a></span></div>
      </div>
    </div>
  </article>`
).join("");

$("#layers").innerHTML = CASES.map(
  (c, i) =>
    `<div class="layer" data-go="${i}"><i>#</i>${t("case", "Case")} ${num(pad(i + 1))} — ${escapeHtml(c.title)}</div>` +
    [t("layerTitle", "Title"), t("layerPreview", "Preview"), t("problem", "Problem"), t("myRole", "My role"), t("shipped", "What shipped")]
      .map((n) => `<div class="layer child" data-go="${i}">${n}</div>`)
      .join("")
).join("");

// Archive: every other project
// matched by image, so it also works when titles are translated
const featured = CASES.map((c) => c.image);
// shown as a "version history" list: older work, newest first, preview on hover
const archive = DATA.projects.filter((p) => !featured.includes(p.image));
const SHOWN = 5;
// where each link goes, so nobody clicks blind: GitHub for code, the domain for live sites
const ICON_GITHUB = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 0a8 8 0 0 0-2.53 15.59c.4.07.55-.17.55-.38v-1.33c-2.23.48-2.7-1.07-2.7-1.07-.36-.92-.89-1.17-.89-1.17-.73-.5.05-.49.05-.49.8.06 1.23.83 1.23.83.72 1.22 1.87.87 2.33.66.07-.52.28-.87.5-1.07-1.78-.2-3.65-.89-3.65-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48v2.2c0 .21.15.46.55.38A8 8 0 0 0 8 0z"/></svg>';
const ICON_WEB = '<svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M1.5 8h13M8 1.5c2 2 2.6 4.2 2.6 6.5S10 12.5 8 14.5M8 1.5C6 3.5 5.4 5.7 5.4 8S6 12.5 8 14.5" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>';
const destination = (url) => {
  const host = new URL(url).hostname.replace(/^www\./, "");
  return host === "github.com" ? { icon: ICON_GITHUB, label: "GitHub" } : { icon: ICON_WEB, label: host };
};
$("#archive").innerHTML = archive
  .map((p, i) => {
    const to = destination(p.url);
    return `
  <li class="version${i >= SHOWN ? " extra" : ""}">
    <a href="${p.url}" target="_blank" rel="noopener noreferrer" data-preview="${p.image}" title="${t("opensOn", "Opens on")} ${to.label}">
      <span class="version-n"><i></i>v0.${archive.length - i}</span>
      <span class="version-name"><b>${escapeHtml(p.title)}</b> <span>${escapeHtml(p.short || p.category)}</span></span>
      <span class="version-kind">${escapeHtml(p.kind || p.category)}</span>
      <span class="version-go">${to.icon}<span>${to.label}</span><i aria-hidden="true">↗</i></span>
    </a>
  </li>`;
  })
  .join("");
$("#versions-count").innerHTML = `<b>${num(archive.length)}</b> ${t("earlierVersions", "earlier versions")}`;

const versions = $("#versions");
const moreBtn = $("#versions-more");
const extra = archive.slice(SHOWN);
const setMore = (open) => {
  versions.classList.toggle("open", open);
  moreBtn.setAttribute("aria-expanded", open);
  moreBtn.textContent = open
    ? t("showLess", "Show less")
    : `+ ${num(extra.length)} ${t("more", "more")} · ${extra.map((p) => p.title).join(", ")}`;
};
if (extra.length) {
  setMore(false);
  moreBtn.addEventListener("click", () => {
    setMore(!versions.classList.contains("open"));
    if (window.ScrollTrigger) ScrollTrigger.refresh();
  });
} else moreBtn.remove();

// hover preview: a small print of the project that follows the cursor (mouse only)
if (matchMedia("(hover: hover) and (pointer: fine)").matches) {
  const preview = $("#version-preview");
  const img = $("img", preview);
  let x = 0;
  let y = 0;
  let raf = 0;
  const place = () => {
    raf = 0;
    const box = versions.getBoundingClientRect();
    const left = Math.min(Math.max(x - box.left + 28, 0), box.width - preview.offsetWidth);
    preview.style.transform = `translate(${left}px, ${y - box.top - preview.offsetHeight - 18}px) rotate(2.5deg)`;
  };
  $$(".version a", versions).forEach((a) => {
    a.addEventListener("mouseenter", () => {
      img.src = a.dataset.preview;
      preview.classList.add("on");
    });
    a.addEventListener("mouseleave", () => preview.classList.remove("on"));
  });
  versions.addEventListener("mousemove", (e) => {
    x = e.clientX;
    y = e.clientY;
    if (!raf) raf = requestAnimationFrame(place);
  });
}

// Experience
const resume = Object.fromEntries(DATA.resume.map((s) => [s.title, s.items]));
const orgs = (item) =>
  (item.at || [])
    .map((o) => (o.url ? link(o.url, escapeHtml(o.name)) : escapeHtml(o.name)))
    .join(" &amp; ");

// How I work
$("#process-steps").innerHTML = DATA.process
  .map(
    (s, i) => `
  <li class="process-step" data-reveal>
    <span class="step-n">${num(pad(i + 1))}</span>
    <h3>${escapeHtml(s.title)}</h3>
    <p>${richText(s.text)}</p>
    <ul class="step-tools">${s.tools.map((t) => `<li>${escapeHtml(t)}</li>`).join("")}</ul>
    <p class="step-example">${t("eg", "e.g.")} ${escapeHtml(s.example)}</p>
  </li>`
  )
  .join("");

// Now card
$("#now").innerHTML = `
  <p class="now-head"><i></i>${t("nowLabel", "Now")} <span>· ${t("updated", "updated")} ${escapeHtml(DATA.now.updated)}</span></p>
  <ul>${DATA.now.items.map((n) => `<li><b>${escapeHtml(n.label)}</b> ${richText(n.text)}</li>`).join("")}</ul>`;

$("#exp-list").innerHTML = resume.Experience.map(
  (item) => `
  <li class="exp-item" data-reveal>
    <div class="exp-when"><b>${escapeHtml(item.date || "")}</b>${escapeHtml(item.place || "")}</div>
    <div>
      <h4>${richText(item.role)}${item.at ? ` <span class="at">@</span> ${orgs(item)}` : ""}</h4>
      ${item.about ? `<p class="exp-about">${richText(item.about)}</p>` : ""}
      ${item.points ? `<ul class="exp-points">${item.points.map((p) => `<li>${richText(p)}</li>`).join("")}</ul>` : ""}
    </div>
  </li>`
).join("");

const learnList = (title, items) => `
  <div data-reveal>
    <h3>${title}</h3>
    <ul>${items
      .filter((i) => !i.group)
      .map((i) => `<li><div>${richText(i.role)}<small>${(i.at || []).map((o) => escapeHtml(o.name)).join(" & ")}</small></div><span>${escapeHtml(i.date || "")}</span></li>`)
      .join("")}</ul>
  </div>`;
$("#learn").innerHTML = learnList(t("education", "Education"), resume.Education) + learnList(t("certifications", "Certifications"), resume.Certification);

const CHIP_COLORS = ["#2b4eff", "#ffcf4a", "#0acf83", "#e5484d", "#9747ff", "#0d99ff"];
const chips = DATA.skills.map((s, i) => `<span class="chip" style="--chip:${CHIP_COLORS[i % CHIP_COLORS.length]}">${escapeHtml(s)}</span>`).join("");
$("#skills").innerHTML = chips + chips.replace(/class="chip"/g, 'class="chip" aria-hidden="true"'); // twice for a seamless loop

// Writing: magazine issues pinned to a board
$("#board-track").innerHTML =
  DATA.publications
    .map(
      (b, i) => `
  <article class="pub">
    <span class="pub-label">${t("issue", "Issue")} ${num(pad(i))} — ${escapeHtml(b.date)}</span>
    <a class="pub-card" href="${b.url}" target="_blank" rel="noopener noreferrer">
      <img src="${b.image}" alt="${escapeHtml(b.alt)}" loading="lazy" />
      <h4>${escapeHtml(b.title)}</h4>
      <p>${escapeHtml(b.text)}</p>
    </a>
  </article>`
    )
    .join("") + `<p class="pub-end" aria-hidden="true">${t("pubEnd", "six issues,<br />zero sleep ✎")}</p>`;

// Kind words: testimonials as resolved comments
$("#kind-board").innerHTML = DATA.testimonials
  .map(
    (tm) => `
  <figure class="comment" data-reveal>
    <div class="comment-pin"><img src="${tm.avatar}" alt="" loading="lazy" /></div>
    <div class="comment-body">
      <figcaption class="comment-who"><b>${escapeHtml(tm.name)}</b><span>${escapeHtml(tm.position)}</span></figcaption>
      <blockquote class="comment-text">${escapeHtml(tm.text)}</blockquote>
      <div class="comment-foot"><span>${escapeHtml(tm.date)}</span><span class="resolved">${t("resolved", "✓ Resolved")}</span></div>
    </div>
  </figure>`
  )
  .join("");

// reveal section heads too
$$(".section-head > *, .archive-head > *, .kind-head > *, .exp-side > *, .contact-copy > *").forEach((el) => el.setAttribute("data-reveal", ""));

/* =========================================================================
   2 · MOTION
   ========================================================================= */

const root = document.documentElement;

// Pinned scroll scenes measure the page on load, so a reload starts at the top
// (or at the #section in the URL) instead of restoring a half-scrolled position.
if ("scrollRestoration" in history) history.scrollRestoration = "manual";
if (!location.hash) window.scrollTo(0, 0);

const hasMotionLibs = window.gsap && window.ScrollTrigger && window.Lenis;
let lenis = null;

function scrollToTarget(target) {
  if (lenis) lenis.scrollTo(target, { duration: 1.4 });
  else (typeof target === "number" ? window.scrollTo({ top: target, behavior: "smooth" }) : target.scrollIntoView({ behavior: "smooth" }));
}

// mobile menu
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

// Wireframe mode: press W (or click the footer note) to see the site as a sketch again
let wireToast = null;
function toggleWireframe() {
  const on = root.classList.toggle("wireframe");
  if (wireToast) wireToast.close();
  wireToast = showToast({
    type: "success",
    title: on ? t("wireOn", "Wireframe mode ✎") : t("wireOff", "Back to hi-fi"),
    message: on ? t("wireOnMsg", "This is how every page starts. Press W again to switch back.") : t("wireOffMsg", "Press W any time to see the sketch."),
    duration: 3500,
  });
}
$("#wire-toggle").addEventListener("click", toggleWireframe);
document.addEventListener("keydown", (e) => {
  const typing = /input|textarea|select/i.test(e.target.tagName) || e.target.isContentEditable;
  if (!typing && !e.ctrlKey && !e.metaKey && !e.altKey && e.key.toLowerCase() === "w") toggleWireframe();
});

// in-page links
$$('a[href^="#"]').forEach((a) =>
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href");
    const target = id === "#top" ? 0 : $(id);
    if (target === null) return;
    e.preventDefault();
    setMenu(false);
    scrollToTarget(target);
  })
);

if (hasMotionLibs) {
  gsap.registerPlugin(ScrollTrigger);
  const mm = gsap.matchMedia();

  mm.add("(min-width: 901px) and (prefers-reduced-motion: no-preference)", () => {
    root.classList.add("motion");

    lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const cleanups = [setupHero(), setupCanvas(), setupBoard(), setupReveals(), setupProcess()];
    ScrollTrigger.refresh();

    return () => {
      cleanups.forEach((fn) => fn && fn());
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenis = null;
      root.classList.remove("motion");
    };
  });

  // Phones and tablets: no pinning, but the sketch still turns into the design once
  mm.add("(max-width: 900px) and (prefers-reduced-motion: no-preference)", () => setupHeroLite());

  setupNav();
}

/* ---------- Hero on small screens: sketch draws in, then wipes away once ---------- */
function setupHeroLite() {
  // only worth it if the visitor is at the top of the page
  if (scrollY > 200) return;
  root.classList.add("motion-lite");
  const wire = $(".wire");
  const scanner = $("#scanner");

  const tl = gsap.timeline({ delay: 0.15, onComplete: () => root.classList.remove("motion-lite") });
  tl.from(".wire .bar", { scaleX: 0, transformOrigin: "left", duration: 0.6, stagger: 0.05, ease: "power3.out" })
    .from(".wire .sk", { opacity: 0, scale: 0.96, duration: 0.5, stagger: 0.04 }, 0.1)
    .from(".wire .note", { opacity: 0, y: 10, rotate: -6, duration: 0.45, stagger: 0.1, ease: "back.out(2)" }, 0.4)
    .set(scanner, { opacity: 1 }, "+=0.5")
    .fromTo(wire, { clipPath: "inset(0 0 0 0%)" }, { clipPath: "inset(0 0 0 100%)", duration: 1.5, ease: "power2.inOut" })
    .fromTo(scanner, { x: 0 }, { x: () => innerWidth, duration: 1.5, ease: "power2.inOut" }, "<")
    .set(scanner, { opacity: 0 });

  return () => {
    tl.kill();
    root.classList.remove("motion-lite");
    gsap.set([wire, scanner], { clearProps: "all" });
  };
}

/* ---------- Hero: the wireframe gets designed as you scroll ---------- */
function setupHero() {
  const final = $("#hero-final");
  const scanner = $("#scanner");
  const rails = $$("#rail li");
  const hint = $("#hero-hint");
  const ease = gsap.parseEase("power2.inOut");

  // the sketch draws itself in on load
  const intro = gsap.timeline({ delay: 0.2 });
  intro
    .from(".wire .bar", { scaleX: 0, transformOrigin: "left", duration: 0.7, stagger: 0.06, ease: "power3.out" })
    .from(".wire .sk", { opacity: 0, scale: 0.96, duration: 0.6, stagger: 0.05 }, 0.1)
    .from(".wire .note, .wire .scribble", { opacity: 0, y: 12, rotate: -6, duration: 0.5, stagger: 0.12, ease: "back.out(2)" }, 0.5)
    .from("#hero-hint", { opacity: 0, duration: 0.4 }, 1.2);

  const render = (p) => {
    const sweep = ease(clamp((p - 0.12) / 0.78, 0, 1));
    const w = innerWidth;
    const x = sweep * w;
    final.style.clipPath = `inset(0 ${w - x}px 0 0)`;
    scanner.style.transform = `translateX(${x}px)`;
    scanner.style.opacity = sweep > 0 && sweep < 1 ? 1 : 0;
    rails.forEach((r, i) => {
      const local = clamp(p * 4 - i, 0, 1);
      r.querySelector("b").style.transform = `scaleX(${local})`;
      r.classList.toggle("on", local > 0);
    });
    hint.style.visibility = p > 0.02 ? "hidden" : "visible";
  };

  const st = ScrollTrigger.create({
    trigger: "#hero",
    start: "top top",
    end: "+=220%",
    pin: true,
    scrub: true,
    onUpdate: (self) => render(self.progress),
    onRefresh: (self) => render(self.progress),
  });
  render(0);

  return () => {
    st.kill();
    intro.kill();
    final.style.clipPath = "";
    scanner.style.cssText = "";
  };
}

/* ---------- Work: a camera flying around a design file ---------- */
function setupCanvas() {
  const canvas = $("#canvas");
  const view = $("#canvas-view");
  const world = $("#world");
  const frames = $$(".frame", world);
  const zoom = $("#zoom");
  const inspector = $("#inspector");
  const layers = $$(".layer", canvas);
  const ease = gsap.parseEase("power3.inOut");

  // frame positions on the canvas (world units)
  const POS = [
    [0, 0],
    [1480, -160],
    [720, 980],
  ];
  frames.forEach((f, i) => {
    f.style.left = POS[i][0] + "px";
    f.style.top = POS[i][1] + "px";
  });

  const camera = (i) => {
    const f = frames[i];
    const vw = view.clientWidth;
    const vh = view.clientHeight;
    const s = Math.min(vw / (f.offsetWidth + 160), vh / (f.offsetHeight + 200));
    return { cx: f.offsetLeft + f.offsetWidth / 2, cy: f.offsetTop + f.offsetHeight / 2, s };
  };

  const SWATCH = ["#0e1116", "#2b4eff", "#ffcf4a", "#fff1a1", "#c7f0d8", "#ffd6e8"];
  let active = -1;
  const setActive = (i) => {
    if (i === active) return;
    active = i;
    frames.forEach((f, k) => f.classList.toggle("active", k === i));
    layers.forEach((l) => l.classList.toggle("on", +l.dataset.go === i && !l.classList.contains("child")));
    const c = CASES[i];
    inspector.style.opacity = 0;
    setTimeout(() => {
      inspector.innerHTML =
        `<p class="insp-title">${t("case", "Case")} ${num(pad(i + 1))} — ${escapeHtml(c.title)}</p>` +
        [[t("client", "Client"), c.client], [t("role", "Role"), c.role], [t("timeline", "Timeline"), c.year], [t("type", "Type"), c.type]]
          .map(([k, v]) => `<div class="prop"><span>${k}</span><span>${escapeHtml(v)}</span></div>`)
          .join("") +
        `<div class="prop"><span>${t("fill", "Fill")}</span><span class="swatches">${SWATCH.map((s) => `<b style="background:${s}"></b>`).join("")}</span></div>`;
      inspector.style.opacity = 1;
    }, 160);
  };

  const render = (progress) => {
    const p = progress * (frames.length - 1);
    const seg = Math.min(Math.floor(p), frames.length - 2);
    // hold on each frame, then fly to the next
    const t = ease(clamp((p - seg - 0.28) / 0.72, 0, 1));
    const a = camera(seg);
    const b = camera(seg + 1);
    const dip = 1 - 0.38 * Math.sin(Math.PI * t); // zoom out mid-flight
    const s = (a.s + (b.s - a.s) * t) * dip;
    const cx = a.cx + (b.cx - a.cx) * t;
    const cy = a.cy + (b.cy - a.cy) * t;
    const tx = view.clientWidth / 2 - cx * s;
    const ty = view.clientHeight / 2 - cy * s;
    world.style.transform = `translate(${tx}px, ${ty}px) scale(${s})`;
    canvas.style.backgroundSize = `${24 * s}px ${24 * s}px`;
    canvas.style.backgroundPosition = `${tx + 220}px ${ty + 44}px`;
    zoom.textContent = Math.round(s * 100) + "%";
    setActive(t > 0.5 ? seg + 1 : seg);
  };

  const st = ScrollTrigger.create({
    trigger: canvas,
    start: "top top",
    end: () => "+=" + (frames.length - 1) * innerHeight * 1.4,
    pin: true,
    scrub: true,
    onUpdate: (self) => render(self.progress),
    onRefresh: (self) => render(self.progress),
    // the design file has its own toolbar, so the site nav steps aside
    onToggle: (self) => root.classList.toggle("in-canvas", self.isActive),
  });
  render(0);

  // layers panel navigates the file
  const onLayer = (e) => {
    const i = +e.currentTarget.dataset.go;
    scrollToTarget(st.start + (i / (frames.length - 1)) * (st.end - st.start) + 2);
  };
  layers.forEach((l) => l.addEventListener("click", onLayer));

  // a multiplayer-style cursor for the visitor
  const you = $("#you-cursor");
  const move = (e) => {
    you.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 2}px)`;
    you.style.opacity = 1;
  };
  const leave = () => (you.style.opacity = 0);
  view.addEventListener("mousemove", move);
  view.addEventListener("mouseleave", leave);
  canvas.classList.add("with-cursor");

  return () => {
    st.kill();
    layers.forEach((l) => l.removeEventListener("click", onLayer));
    view.removeEventListener("mousemove", move);
    view.removeEventListener("mouseleave", leave);
    canvas.classList.remove("with-cursor");
    root.classList.remove("in-canvas");
    world.style.transform = "";
    canvas.style.backgroundSize = canvas.style.backgroundPosition = "";
    frames.forEach((f) => (f.style.left = f.style.top = ""));
  };
}

/* ---------- Writing: the board slides sideways while pinned ---------- */
function setupBoard() {
  const board = $("#board");
  const track = $("#board-track");
  board.style.overflow = "hidden";
  const tween = gsap.to(track, {
    x: () => -(track.scrollWidth - innerWidth),
    ease: "none",
    scrollTrigger: {
      trigger: board,
      start: "center center",
      end: () => "+=" + (track.scrollWidth - innerWidth),
      pin: true,
      scrub: true,
      invalidateOnRefresh: true,
    },
  });
  return () => {
    // gsap.matchMedia may already have reverted these, so guard each step
    tween.scrollTrigger?.kill();
    tween.kill();
    gsap.set(track, { clearProps: "x" });
    board.style.overflow = "";
  };
}

/* ---------- How I work: each step "inks in" from a dashed sketch ---------- */
function setupProcess() {
  const steps = $$(".process-step");
  const triggers = steps.map((el) =>
    ScrollTrigger.create({ trigger: el, start: "top 72%", once: true, onEnter: () => el.classList.add("inked") })
  );
  return () => {
    triggers.forEach((t) => t.kill());
    steps.forEach((el) => el.classList.remove("inked"));
  };
}
/* ---------- Gentle reveals ---------- */
function setupReveals() {
  const triggers = ScrollTrigger.batch("[data-reveal]", {
    start: "top 88%",
    once: true,
    onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 0.9, stagger: 0.08, ease: "power3.out" }),
  });
  return () => {
    triggers.forEach((t) => t.kill());
    gsap.set("[data-reveal]", { clearProps: "opacity,transform" });
  };
}

/* ---------- Nav: hides while reading, darkens over the contact frame ---------- */
function setupNav() {
  let last = 0;
  ScrollTrigger.create({
    start: 0,
    end: "max",
    onUpdate: (self) => {
      const y = self.scroll();
      nav.classList.toggle("hidden", y > 200 && y > last && !nav.classList.contains("open"));
      last = y;
    },
  });
  ScrollTrigger.create({ trigger: "#contact", start: "top 60px", end: "bottom top", toggleClass: { targets: nav, className: "dark" } });
  ["work", "experience", "writing", "contact"].forEach((id) => {
    const a = $(`.nav-links a[href="#${id}"]`);
    ScrollTrigger.create({ trigger: "#" + id, start: "top 50%", end: "bottom 50%", toggleClass: { targets: a, className: "on" } });
  });
}

/* =========================================================================
   3 · CONTACT FORM + TOASTS
   ========================================================================= */

// Web3Forms emails anything posted with this key to Sameer
const WEB3FORMS_KEY = "1522fab6-b445-4eff-aa73-f60a3ecb9379";

// Sends a form to Sameer's inbox with loading / success / error toasts.
// Resolves to true when the message was delivered.
function sendToInbox(form, payload, text) {
  const button = $("[type=submit]", form);
  button.disabled = true;
  const toast = showToast({ type: "loading", title: text.sending, message: t("moment", "This only takes a moment."), duration: 0 });

  return fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ access_key: WEB3FORMS_KEY, ...payload }),
  })
    .then(async (response) => {
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.message);
      form.reset();
      toast.update({ type: "success", title: text.done, message: text.doneMessage });
      return true;
    })
    .catch((error) => {
      toast.update({
        type: "error",
        title: text.failed,
        // A TypeError means the request never reached the server (offline, blocked)
        message:
          error instanceof TypeError || !error.message
            ? t("offline", "Something went wrong. Please check your connection and try again.")
            : error.message,
        duration: 7000,
      });
      return false;
    })
    .finally(() => {
      button.disabled = false;
    });
}

// Contact form
const form = $("#form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  sendToInbox(form, Object.fromEntries(new FormData(form)), {
    sending: t("sending", "Sending your message…"),
    done: t("sent", "Message sent!"),
    doneMessage: t("sentMsg", "Thanks for reaching out. I'll get back to you soon."),
    failed: t("notSent", "Message not sent"),
  });
});

// Visitor comments: emailed for review, then added to data.js by hand
const commentBtn = $("#comment-add");
const commentForm = $("#comment-form");
commentBtn.addEventListener("click", () => {
  const open = commentForm.hidden;
  commentForm.hidden = !open;
  commentBtn.setAttribute("aria-expanded", open);
  if (open) $("textarea", commentForm).focus();
});
commentForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const f = Object.fromEntries(new FormData(commentForm));
  const sent = await sendToInbox(
    commentForm,
    {
      subject: `New portfolio comment from ${f.name}`,
      from_name: "Portfolio comments",
      name: f.name,
      role: f.role || "—",
      message: f.message,
    },
    {
      sending: t("commentSending", "Posting your comment…"),
      done: t("commentSent", "Comment received ✓"),
      doneMessage: t("commentSentMsg", "Thank you! It will appear here once I've read it."),
      failed: t("commentNotSent", "Comment not sent"),
    }
  );
  if (sent) {
    commentForm.hidden = true;
    commentBtn.setAttribute("aria-expanded", false);
  }
});
