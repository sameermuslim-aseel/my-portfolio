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
  <a class="hero-card" href="#work">
    <img src="${c.image}" alt="" loading="lazy" />
    <span>${escapeHtml(c.title)}</span>
  </a>`
).join("");

// Work: each case study is a frame in the design file
$("#world").innerHTML = CASES.map(
  (c, i) => `
  <article class="frame" data-frame="${i}" aria-labelledby="case-${i}">
    <p class="frame-label">Case ${pad(i + 1)} — ${escapeHtml(c.title)}</p>
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
        <div class="sticky"><b>The problem</b>${escapeHtml(c.problem)}</div>
        <div class="sticky g"><b>My role</b>${escapeHtml(c.myRole)}</div>
        <div class="sticky p"><b>What shipped</b>${escapeHtml(c.shipped)}</div>
        <p class="frame-note">${escapeHtml(c.note)}</p>
        <div class="frame-meta"><span>${escapeHtml(c.type)}</span>${link(c.url, "Open project ↗", "frame-link")}</div>
      </div>
    </div>
  </article>`
).join("");

$("#layers").innerHTML = CASES.map(
  (c, i) =>
    `<div class="layer" data-go="${i}"><i>#</i>Case ${pad(i + 1)} — ${escapeHtml(c.title)}</div>` +
    ["Title", "Preview", "Problem", "My role", "What shipped"]
      .map((n) => `<div class="layer child" data-go="${i}">${n}</div>`)
      .join("")
).join("");

// Archive: every other project
const featured = CASES.map((c) => c.title.toLowerCase());
const archive = DATA.projects.filter((p) => !featured.some((t) => p.title.toLowerCase().startsWith(t)));
$("#archive").innerHTML = archive
  .map(
    (p) => `
  <li class="arch" data-reveal>
    <a href="${p.url}" target="_blank" rel="noopener noreferrer">
      <span class="arch-label">${escapeHtml(p.category)}</span>
      <div class="arch-img"><img src="${p.image}" alt="${escapeHtml(p.alt)}" loading="lazy" /></div>
      <h4>${escapeHtml(p.title)}</h4>
      <p>${escapeHtml(p.description)}</p>
    </a>
  </li>`
  )
  .join("");

// Experience
const resume = Object.fromEntries(DATA.resume.map((s) => [s.title, s.items]));
const orgs = (item) =>
  (item.at || [])
    .map((o) => (o.url ? link(o.url, escapeHtml(o.name)) : escapeHtml(o.name)))
    .join(" &amp; ");

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
$("#learn").innerHTML = learnList("Education", resume.Education) + learnList("Certifications", resume.Certification);

const CHIP_COLORS = ["#2b4eff", "#ffcf4a", "#0acf83", "#e5484d", "#9747ff", "#0d99ff"];
const chips = DATA.skills.map((s, i) => `<span class="chip" style="--chip:${CHIP_COLORS[i % CHIP_COLORS.length]}">${escapeHtml(s)}</span>`).join("");
$("#skills").innerHTML = chips + chips.replace(/class="chip"/g, 'class="chip" aria-hidden="true"'); // twice for a seamless loop

// Writing: magazine issues pinned to a board
$("#board-track").innerHTML =
  DATA.publications
    .map(
      (b, i) => `
  <article class="pub">
    <span class="pub-label">Issue ${pad(i)} — ${escapeHtml(b.date)}</span>
    <a class="pub-card" href="${b.url}" target="_blank" rel="noopener noreferrer">
      <img src="${b.image}" alt="${escapeHtml(b.alt)}" loading="lazy" />
      <h4>${escapeHtml(b.title)}</h4>
      <p>${escapeHtml(b.text)}</p>
    </a>
  </article>`
    )
    .join("") + `<p class="pub-end" aria-hidden="true">six issues,<br />zero sleep ✎</p>`;

// Kind words: testimonials as resolved comments
$("#kind-board").innerHTML = DATA.testimonials
  .map(
    (t) => `
  <figure class="comment" data-reveal>
    <div class="comment-pin"><img src="${t.avatar}" alt="" loading="lazy" /></div>
    <div class="comment-body">
      <figcaption class="comment-who"><b>${escapeHtml(t.name)}</b><span>${escapeHtml(t.position)}</span></figcaption>
      <blockquote class="comment-text">${escapeHtml(t.text)}</blockquote>
      <div class="comment-foot"><span>${escapeHtml(t.date)}</span><span class="resolved">✓ Resolved</span></div>
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
const hasMotionLibs = window.gsap && window.ScrollTrigger && window.Lenis;
let lenis = null;

function scrollToTarget(target) {
  if (lenis) lenis.scrollTo(target, { duration: 1.4 });
  else (typeof target === "number" ? window.scrollTo({ top: target, behavior: "smooth" }) : target.scrollIntoView({ behavior: "smooth" }));
}

// in-page links
$$('a[href^="#"]').forEach((a) =>
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href");
    const target = id === "#top" ? 0 : $(id);
    if (target === null) return;
    e.preventDefault();
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

    const cleanups = [setupHero(), setupCanvas(), setupBoard(), setupReveals()];
    ScrollTrigger.refresh();

    return () => {
      cleanups.forEach((fn) => fn && fn());
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenis = null;
      root.classList.remove("motion");
    };
  });

  setupNav();
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
        `<p class="insp-title">Case ${pad(i + 1)} — ${escapeHtml(c.title)}</p>` +
        [["Client", c.client], ["Role", c.role], ["Timeline", c.year], ["Type", c.type]]
          .map(([k, v]) => `<div class="prop"><span>${k}</span><span>${escapeHtml(v)}</span></div>`)
          .join("") +
        `<div class="prop"><span>Fill</span><span class="swatches">${SWATCH.map((s) => `<b style="background:${s}"></b>`).join("")}</span></div>`;
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
    tween.scrollTrigger.kill();
    tween.kill();
    gsap.set(track, { clearProps: "x" });
    board.style.overflow = "";
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
  const nav = $("#nav");
  let last = 0;
  ScrollTrigger.create({
    start: 0,
    end: "max",
    onUpdate: (self) => {
      const y = self.scroll();
      nav.classList.toggle("hidden", y > 200 && y > last);
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

const toastRegion = $("#toast-region");
const TOAST_ICONS = {
  loading: '<span class="toast-spinner"></span>',
  success: '<svg viewBox="0 0 24 24" aria-hidden="true"><path class="toast-check" d="M5 12.5l4.5 4.5L19 7.5" /></svg>',
  error: '<svg viewBox="0 0 24 24" aria-hidden="true"><path class="toast-cross" d="M7 7l10 10M17 7L7 17" /></svg>',
};

// Shows a toast and returns a controller to update or close it.
// duration: ms before it hides itself (0 = stay until updated or closed)
function showToast({ type = "success", title, message = "", duration = 5000 }) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `
    <div class="toast-icon"></div>
    <div class="toast-body"><p class="toast-title"></p><p class="toast-message"></p></div>
    <button type="button" class="toast-close" aria-label="Close notification">&times;</button>
    <span class="toast-progress"></span>`;
  toastRegion.appendChild(toast);

  let timer = null;
  let remaining = 0;
  let startedAt = 0;

  function close() {
    clearTimeout(timer);
    if (toast.classList.contains("leaving")) return;
    toast.classList.add("leaving");
    toast.addEventListener("animationend", () => toast.remove(), { once: true });
    setTimeout(() => toast.remove(), 600); // in case animations are off
  }
  function startTimer(ms) {
    clearTimeout(timer);
    remaining = ms;
    startedAt = Date.now();
    timer = setTimeout(close, ms);
  }
  function update(next) {
    const t = next.type || type;
    toast.dataset.type = t;
    toast.setAttribute("role", t === "error" ? "alert" : "status");
    const iconBox = toast.querySelector(".toast-icon");
    iconBox.innerHTML = TOAST_ICONS[t];
    iconBox.style.animation = "none"; // replay the pop-in
    void iconBox.offsetWidth;
    iconBox.style.animation = "";
    toast.querySelector(".toast-title").textContent = next.title || "";
    toast.querySelector(".toast-message").textContent = next.message || "";

    const bar = toast.querySelector(".toast-progress");
    const ms = next.duration ?? 5000;
    bar.style.animation = "none";
    void bar.offsetWidth;
    bar.style.animation = ms ? `toast-progress ${ms}ms linear forwards` : "none";
    bar.hidden = !ms;
    clearTimeout(timer);
    if (ms) startTimer(ms);
  }

  toast.addEventListener("mouseenter", () => {
    if (!remaining) return;
    clearTimeout(timer);
    remaining -= Date.now() - startedAt;
    toast.classList.add("paused");
  });
  toast.addEventListener("mouseleave", () => {
    if (!remaining || toast.classList.contains("leaving")) return;
    toast.classList.remove("paused");
    startTimer(Math.max(remaining, 800));
  });
  toast.querySelector(".toast-close").addEventListener("click", close);

  update({ type, title, message, duration });
  return { update, close };
}

const form = $("#form");
const sendBtn = $(".send-btn", form);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const json = JSON.stringify(Object.fromEntries(new FormData(form)));

  sendBtn.disabled = true;
  const toast = showToast({ type: "loading", title: "Sending your message…", message: "This only takes a moment.", duration: 0 });

  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: json,
  })
    .then(async (response) => {
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.message);
      form.reset();
      toast.update({ type: "success", title: "Message sent!", message: "Thanks for reaching out. I'll get back to you soon." });
    })
    .catch((error) => {
      toast.update({
        type: "error",
        title: "Message not sent",
        // A TypeError means the request never reached the server (offline, blocked)
        message:
          error instanceof TypeError || !error.message
            ? "Something went wrong. Please check your connection and try again."
            : error.message,
        duration: 7000,
      });
    })
    .finally(() => {
      sendBtn.disabled = false;
    });
});
