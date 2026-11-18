// Toast notifications, shared by every page that has <div id="toast-region">.
// showToast({ type: 'loading' | 'success' | 'error', title, message, duration }) → { update, close }

const toastRegion = document.getElementById("toast-region");
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
