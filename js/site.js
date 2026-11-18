// Small things every page shares: visitor stats (opt-in) and the offline/installable app.

(function () {
  // GoatCounter: cookie-free page counts, only when a code is set in data.js
  const code = window.SITE_DATA && SITE_DATA.analytics && SITE_DATA.analytics.goatcounter;
  if (code && !/^(localhost|127\.0\.0\.1)$/.test(location.hostname)) {
    const s = document.createElement("script");
    s.async = true;
    s.src = "https://gc.zgo.at/count.js";
    s.dataset.goatcounter = `https://${code}.goatcounter.com/count`;
    document.head.appendChild(s);
  }

  // Service worker: makes the site installable and readable offline
  // (live https site only, so local development never serves stale files)
  if ("serviceWorker" in navigator && location.protocol === "https:") {
    window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));
  }
})();
