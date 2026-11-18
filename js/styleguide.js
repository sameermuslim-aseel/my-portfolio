// Design-system page: live color swatches, toast demo, mobile menu.

// mobile menu
const nav = document.getElementById("nav");
const menuBtn = document.getElementById("nav-menu");
function setMenu(open) {
  nav.classList.toggle("open", open);
  menuBtn.setAttribute("aria-expanded", open);
  menuBtn.setAttribute("aria-label", open ? "Close menu" : "Menu");
}
menuBtn.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
document.addEventListener("keydown", (e) => e.key === "Escape" && setMenu(false));
document.addEventListener("click", (e) => !nav.contains(e.target) && setMenu(false));

// Swatches read the real CSS variables, so they always match the current theme
const TOKENS = [
  ["--paper", "Paper", "page background"],
  ["--surface", "Surface", "cards, frames, panels"],
  ["--ink", "Ink", "headings, text"],
  ["--text", "Text", "body copy"],
  ["--muted", "Muted", "labels, meta"],
  ["--line", "Line", "borders, dividers"],
  ["--accent", "Ultramarine", "the one accent"],
  ["--select", "Selection", "Figma-style selection"],
  ["--sun", "Sun", "portrait, warmth"],
  ["--red", "Pencil red", "annotations"],
  ["--green", "Done green", "success, status"],
  ["--violet", "Comment violet", "comments, cursors"],
  ["--sticky-y", "Sticky yellow", "notes"],
  ["--sticky-g", "Sticky green", "notes"],
  ["--sticky-p", "Sticky pink", "notes"],
  ["--night", "Night", "always-dark sections"],
];

const swatches = document.getElementById("sg-swatches");
function toHex(color) {
  const c = document.createElement("canvas").getContext("2d");
  c.fillStyle = color;
  return c.fillStyle.toUpperCase();
}
function renderSwatches() {
  const style = getComputedStyle(document.documentElement);
  swatches.innerHTML = TOKENS.map(([token, name, use]) => {
    const value = style.getPropertyValue(token).trim();
    return `
      <figure class="sg-swatch">
        <span class="sg-chip" style="background: var(${token})"></span>
        <figcaption><b>${name}</b><code>${token}</code><span>${toHex(value)} · ${use}</span></figcaption>
      </figure>`;
  }).join("");
}
renderSwatches();
new MutationObserver(renderSwatches).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

// Toast demo: loading, then success
document.getElementById("sg-toast").addEventListener("click", () => {
  const t = showToast({ type: "loading", title: "Saving your frame…", message: "This is the loading state.", duration: 0 });
  setTimeout(() => t.update({ type: "success", title: "Saved!", message: "And this is the success state." }), 1400);
});
