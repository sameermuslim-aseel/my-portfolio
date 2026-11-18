// Language support (English / فارسی), shared by every page.
// The <head> script already set <html lang dir> from ?lang=fa or the saved choice.
// Load order: data.js → data.fa.js → i18n.js → page script.

const LANG = document.documentElement.lang === "fa" ? "fa" : "en";
const FA = LANG === "fa" && typeof SITE_DATA_FA !== "undefined" ? SITE_DATA_FA : null;

// interface text: t("key", "English fallback")
function t(key, fallback) {
  return (FA && FA.ui[key]) || fallback;
}

// Persian digits in labels like "Case 01"
function num(value) {
  return LANG === "fa" ? String(value).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]) : String(value);
}

if (FA) {
  // content overrides: arrays are matched item by item, so data.js stays the source of truth
  ["caseStudies", "process"].forEach((key) => {
    (FA[key] || []).forEach((item, i) => SITE_DATA[key][i] && Object.assign(SITE_DATA[key][i], item));
  });
  if (FA.now) SITE_DATA.now = FA.now;

  if (FA.meta && document.body.dataset.page === "home") {
    document.title = FA.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", FA.meta.description);
  }

  // static text tagged in the HTML
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const v = FA.ui[el.dataset.i18n];
    if (v) el.innerHTML = v;
  });
  document.querySelectorAll("[data-i18n-ph]").forEach((el) => {
    const v = FA.ui[el.dataset.i18nPh];
    if (v) el.setAttribute("placeholder", v);
  });
  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    const v = FA.ui[el.dataset.i18nAria];
    if (v) el.setAttribute("aria-label", v);
  });
}

// language switch in the nav
document.getElementById("lang-btn")?.addEventListener("click", () => {
  const next = LANG === "fa" ? "en" : "fa";
  try {
    localStorage.setItem("lang", next);
  } catch (e) {}
  const url = new URL(location.href);
  url.searchParams.delete("lang");
  if (next === "fa") url.searchParams.set("lang", "fa");
  location.href = url.toString();
});
