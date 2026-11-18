// ---------------------------------------------------------------------------
// Build the repeated sections (projects, resume, testimonials...) from data.js
// ---------------------------------------------------------------------------

function escapeHtml(text) {
  const map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  return String(text).replace(/[&<>"']/g, (c) => map[c]);
}

function externalLink(url, html, className = "companeis-link") {
  return `<a class="${className}" href="${url}" target="_blank" rel="noopener noreferrer">${html}</a>`;
}

// Plain text where [link text](https://...) becomes a link
function richText(text) {
  return escapeHtml(text).replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label, url) =>
    externalLink(url, label)
  );
}

// An icon from the sprite at the top of index.html
function icon(name, className = "") {
  const symbol = document.getElementById("icon-" + name);
  const viewBox = symbol ? symbol.getAttribute("viewBox") : "0 0 50 50";
  const cls = className ? ` class="${className}"` : "";
  return `<svg${cls} viewBox="${viewBox}" fill="var(--icon-color)" aria-hidden="true"><use href="#icon-${name}" /></svg>`;
}

const render = {
  services: (items) =>
    items
      .map(
        (s) => `
        <li>
          <div class="card-item services">
            ${icon(s.icon, "card-item-icon")}
            <div class="card-data">
              <h3 class="card-item-title">${escapeHtml(s.title)}</h3>
              <p class="item-text">${richText(s.text)}</p>
            </div>
          </div>
        </li>`
      )
      .join(""),

  testimonials: (items) =>
    items
      .map(
        (t, i) => `
        <li class="testimonial-list-itme">
          <div class="card-item team" tabindex="0" role="button" aria-haspopup="dialog" data-index="${i}">
            <div class="team-info min-test">
              <div class="photo">
                <img loading="lazy" decoding="async" src="${t.avatar}" alt="${escapeHtml(t.name)}'s avatar" />
              </div>
              <h3 class="card-item-title">${escapeHtml(t.name)}</h3>
            </div>
            <p class="item-text">${escapeHtml(t.text)}</p>
          </div>
        </li>`
      )
      .join(""),

  resume: (sections) =>
    sections
      .map(
        (section) => `
        <div class="resume-section-name">
          <div class="resume-section-icon item-icon">${icon(section.icon)}</div>
          <h3 class="resume-section-title">${escapeHtml(section.title)}</h3>
        </div>
        <ol class="resume-section-list">
          ${section.items.map(resumeItem).join("")}
        </ol>`
      )
      .join("") +
    `
        <h2 class="section-title">My Skills</h2>
        <div class="skills-box">
          <ul class="skills-list">
            ${SITE_DATA.skills
              .map((s) => `<li class="skills-item defult-panel"><span class="hash-tag">#</span> ${escapeHtml(s)}</li>`)
              .join("")}
          </ul>
        </div>`,

  categories: (names) =>
    ["All", ...names]
      .map(
        (name, i) =>
          `<li><button type="button" class="category-li-btn${i === 0 ? " active" : ""}" data-category="${escapeHtml(name)}">${escapeHtml(name)}</button></li>`
      )
      .join(""),

  projects: (items) =>
    items
      .map(
        (p) => `
        <li class="port-list-li" data-category="${escapeHtml(p.category)}" data-tags="${escapeHtml((p.tags || []).join("|"))}">
          <a target="_blank" rel="noopener noreferrer" href="${p.url}">
            <div class="card-item-portfolio active">
              <div class="card-port-f-bunner">
                <div class="bunner-preview">${icon("eye", "eye-icon")}</div>
                <img loading="lazy" decoding="async" class="bunner-img" src="${p.image}" alt="${escapeHtml(p.alt)}" />
              </div>
              <p class="card-item-port-text">${escapeHtml(p.category)}</p>
              <h3 class="card-item-port-title">${escapeHtml(p.title)}</h3>
              <p class="card-item-port-description">${escapeHtml(p.description)}</p>
            </div>
          </a>
        </li>`
      )
      .join(""),

  publications: (items) =>
    items
      .map(
        (b) => `
        <li>
          <a target="_blank" rel="noopener noreferrer" href="${b.url}">
            <div class="card-item-blog">
              <div class="blog-banner">
                <img loading="lazy" decoding="async" src="${b.image}" alt="${escapeHtml(b.alt)}" class="blog-img" />
              </div>
              <div class="card-blog-details">
                <span class="card-blog-category-and-date">
                  <p class="card-blog-category">${escapeHtml(b.category)}</p>
                  <span class="dot">.</span>
                  <p class="blog date">${escapeHtml(b.date)}</p>
                </span>
                <h3 class="card-blog-big-title">${escapeHtml(b.title)}</h3>
                <p class="card-blog-text">${escapeHtml(b.text)}</p>
              </div>
            </div>
          </a>
        </li>`
      )
      .join(""),
};

function resumeItem(item) {
  // A year range that groups the entries below it (Volunteer Work)
  if (item.group) {
    return `<li class="resume-list-item no-dot"><span class="volunteer-date">${escapeHtml(item.group)}</span></li>`;
  }

  const orgs = (item.at || [])
    .map((org) =>
      org.url
        ? externalLink(org.url, escapeHtml(org.name))
        : `<a class="companeis-link no-link">${escapeHtml(org.name)}</a>`
    )
    .join(' <span class="add-sign">&amp;</span> ');
  const title = richText(item.role) + (orgs ? ` <span class="add-sign">@</span> ${orgs}` : "");
  const when = item.date
    ? `${escapeHtml(item.date)} <span class="forward-selash">//</span> ${escapeHtml(item.place || "")}`
    : escapeHtml(item.place || "");

  return `
    <li class="resume-list-item">
      <h4 class="resume-list-item-title">${title}</h4>
      <p class="resume-section-date">${when}</p>
      ${item.about ? `<p class="resume-about-organization">${richText(item.about)}</p>` : ""}
      ${
        item.points
          ? `<ul class="resume-responsibilities-list">${item.points
              .map((p) => `<li class="responsibility-list-item">${richText(p)}</li>`)
              .join("")}</ul>`
          : ""
      }
    </li>`;
}

document.querySelectorAll("[data-render]").forEach((el) => {
  const key = el.dataset.render;
  el.innerHTML = render[key](SITE_DATA[key]);
});

// ---------------------------------------------------------------------------
// Page behavior
// ---------------------------------------------------------------------------

// Get references to elements
const showContactsBtn = document.getElementById("show-contacts");
const leftSide = document.getElementById("left-side");
const overlayPanel = document.getElementById("overlay");
const dialogPanel = document.getElementById("full-screen-dialog");
const dialogCloseBtn = document.getElementById("dialog-close-btn");
const mapIfrem = document.getElementById("map-container");
const mapSrc =
  "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d18301.937956932157!2d67.11375233052213!3d36.71107776030838!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1704266137782!5m2!1sen!2s";

// Element that opened the dialog, so focus can return to it on close
let lastFocusedItem = null;

function openDialog(item) {
  updateDialog(item);
  lastFocusedItem = item;
  dialogPanel.classList.add("active");
  overlayPanel.classList.add("active");
  // The dialog box fades in, and can't take focus until it is visible
  setTimeout(() => dialogCloseBtn.focus(), 300);
}

function closeDialog() {
  dialogPanel.classList.remove("active");
  overlayPanel.classList.remove("active");
  if (lastFocusedItem) {
    lastFocusedItem.focus();
  }
}

// Close dialog on "Escape" key press, keep Tab inside it while open
document.addEventListener("keydown", function (event) {
  if (!dialogPanel.classList.contains("active")) return;

  if (event.key === "Escape") {
    closeDialog();
  } else if (event.key === "Tab") {
    // The close button is the only focusable element in the dialog
    event.preventDefault();
    dialogCloseBtn.focus();
  }
});

// Add click listeners for dialog close
dialogCloseBtn.addEventListener("click", closeDialog);
overlayPanel.addEventListener("click", closeDialog);

// Toggle left side on button click
showContactsBtn.addEventListener("click", function () {
  const isOpen = leftSide.classList.toggle("active");
  showContactsBtn.setAttribute("aria-expanded", isOpen);
});

// Open a testimonial with a click, or with Enter / Space from the keyboard
const testimonialsItem = document.querySelectorAll(".card-item.team");
testimonialsItem.forEach(function (item) {
  item.addEventListener("click", function () {
    openDialog(item);
  });
  item.addEventListener("keydown", function (event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openDialog(item);
    }
  });
});

// Fill the dialog with the testimonial behind the clicked card
function updateDialog(item) {
  const t = SITE_DATA.testimonials[item.dataset.index];

  document.querySelector(".dialog-person-img").src = t.avatar;
  document.querySelector(".dialog-person-name").textContent = t.name;
  document.querySelector(".dialog-person-position").textContent = t.position;
  document.querySelector(".dialog-text").textContent = t.text;
  document.querySelector(".dialog-date").textContent = t.date;
}

// Sections are linked by hash (#about, #resume, ...) so each tab has its own URL
const menuItems = document.querySelectorAll(".menu-bar-link");
const sections = document.querySelectorAll(".the-section");

function showSection(sectionName) {
  const clickedSection = document.getElementById(sectionName + "-section");
  if (!clickedSection) return;

  menuItems.forEach((item) => {
    const isActive = item.dataset.section === sectionName;
    item.classList.toggle("active", isActive);
    if (isActive) {
      item.setAttribute("aria-current", "page");
    } else {
      item.removeAttribute("aria-current");
    }
  });

  sections.forEach((section) => section.classList.remove("active"));
  clickedSection.classList.add("active");

  // Load the map only when the Contact tab is opened
  if (sectionName === "contact" && !mapIfrem.getAttribute("src")) {
    mapIfrem.src = mapSrc;
  }
}

function showSectionFromHash() {
  showSection(location.hash.slice(1) || "about");
}

window.addEventListener("hashchange", showSectionFromHash);
showSectionFromHash();

document.addEventListener("DOMContentLoaded", function () {
  // Get all category buttons
  const categoryButtons = document.querySelectorAll(".category-li-btn");

  // Get all project items
  const projectItems = document.querySelectorAll(
    ".section-list.projects .port-list-li"
  );

  // Add click event listener to each category button
  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove "active" class from all category buttons
      categoryButtons.forEach((btn) => btn.classList.remove("active"));

      // Add "active" class to the clicked category button
      button.classList.add("active");

      // Get the category name of the clicked button
      const categoryName = button.dataset.category;

      // Show a project if its category or one of its tags matches
      projectItems.forEach((item) => {
        const tags = item.dataset.tags.split("|");

        if (
          categoryName === "All" ||
          item.dataset.category === categoryName ||
          tags.includes(categoryName)
        ) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });
});

const form = document.getElementById("form");
const result = document.getElementById("result");

form.addEventListener("submit", function (e) {
  const formData = new FormData(form);
  e.preventDefault();

  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);

  // Show the status text again (it is hidden after each attempt)
  clearTimeout(result.hideTimer);
  result.style.display = "block";
  result.textContent = "Please wait...";

  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: json,
  })
    .then(async (response) => {
      const json = await response.json();
      result.textContent = json.message;
      // Only clear the form when the message was actually sent
      if (response.ok) {
        form.reset();
      }
    })
    .catch(() => {
      result.textContent = "Something went wrong! Please try again.";
    })
    .then(function () {
      result.hideTimer = setTimeout(() => {
        result.style.display = "none";
      }, 5000);
    });
});

// Light / dark mode. The <head> script already applied the saved theme,
// or the visitor's system theme on a first visit.
const mode_toggle_btn = document.getElementById("mode-toggle-btn");
const mode_btn = document.getElementById("mood-btn");
const mode_icon = document.getElementById("mood-icon");
const root = document.documentElement;

function saveTheme(value) {
  try {
    localStorage.setItem("light-mode", value);
  } catch (e) {
    // Storage can be blocked (private mode); the toggle still works
  }
}

function applyTheme(isLight) {
  root.classList.toggle("light-mode", isLight);
  mode_btn.classList.toggle("light-mode", isLight);
  mode_icon.src = isLight ? "images/moon.svg" : "images/sun.svg";
  mode_toggle_btn.setAttribute("aria-pressed", isLight);
}

applyTheme(root.classList.contains("light-mode"));

// When someone clicks the button
mode_toggle_btn.addEventListener("click", () => {
  const isLight = !root.classList.contains("light-mode");
  applyTheme(isLight);
  saveTheme(isLight ? "enabled" : "disabled");
});
