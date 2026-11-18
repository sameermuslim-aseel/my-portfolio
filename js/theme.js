// Light / dark theme toggle (shared by every page).
// The <head> of each page already applied the saved or system theme before paint.
(function () {
  const root = document.documentElement;
  const btn = document.getElementById("theme-btn");
  if (!btn) return;

  const sync = () => {
    const dark = root.dataset.theme === "dark";
    btn.setAttribute("aria-pressed", dark);
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", dark ? "#0d1015" : "#fbfaf6");
  };

  btn.addEventListener("click", () => {
    const dark = root.dataset.theme !== "dark";
    root.dataset.theme = dark ? "dark" : "light";
    try {
      localStorage.setItem("theme", root.dataset.theme);
    } catch (e) {
      // storage blocked (private mode): the toggle still works for this visit
    }
    sync();
  });

  // follow the system setting live, unless the visitor picked a theme
  matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    let saved = null;
    try {
      saved = localStorage.getItem("theme");
    } catch (err) {}
    if (!saved) {
      root.dataset.theme = e.matches ? "dark" : "light";
      sync();
    }
  });

  sync();
})();
