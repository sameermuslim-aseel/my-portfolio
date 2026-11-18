// Service worker: lets the portfolio open offline and be installed as an app.
// Strategy: always try the network first (so updates show up immediately),
// fall back to the cached copy when offline. Fonts and CDN libraries are
// versioned URLs, so those are served from the cache once fetched.

const VERSION = "v2";
const CACHE = `sameer-${VERSION}`;

const CORE = [
  "./",
  "index.html",
  "case.html",
  "resume.html",
  "styleguide.html",
  "data.js",
  "data.fa.js",
  "js/i18n.js",
  "css/main.css",
  "js/main.js",
  "js/case.js",
  "js/theme.js",
  "js/toast.js",
  "js/site.js",
  "js/resume.js",
  "js/styleguide.js",
  "images/my-avatar.webp",
  "images/my-avatar1.webp",
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  // drop caches from older versions
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;
  const url = new URL(request.url);

  // never cache the form service
  if (url.hostname.includes("web3forms") || url.hostname.includes("goatcounter")) return;

  // fonts + CDN libraries: cache first
  if (url.origin !== location.origin) {
    event.respondWith(
      caches.match(request).then(
        (hit) =>
          hit ||
          fetch(request).then((res) => {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(request, copy));
            return res;
          })
      )
    );
    return;
  }

  // our own files: network first, cache as a fallback
  event.respondWith(
    fetch(request)
      .then((res) => {
        if (res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(request, copy));
        }
        return res;
      })
      .catch(() => caches.match(request, { ignoreSearch: request.mode === "navigate" }).then((hit) => hit || caches.match("index.html")))
  );
});
