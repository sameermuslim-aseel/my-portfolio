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

// Function to update dialog content
function updateDialog(item) {
  const imageSrc = item.querySelector(".photo img").src;
  const cardItemTitle = item.querySelector(".card-item-title").textContent;
  const cardItemPosition = item.querySelector(
    ".card-item-position"
  ).textContent;
  const itemText = item.querySelector(".item-text").textContent;
  const itemDate = item.querySelector(".item-test-mo-date").textContent;

  // Set values in the dialog
  const dialogPersonImg = document.querySelector(".dialog-person-img");
  const dialogPersonName = document.querySelector(".dialog-person-name");
  const dialogPersonPosition = document.querySelector(
    ".dialog-person-position"
  );
  const dialogText = document.querySelector(".dialog-text");
  const dialogDate = document.querySelector(".dialog-date");

  dialogPersonImg.src = imageSrc;
  dialogPersonName.textContent = cardItemTitle;
  dialogPersonPosition.textContent = cardItemPosition;
  dialogText.textContent = itemText;
  dialogDate.textContent = itemDate;
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
      const categoryName = button.textContent.trim();

      // Show/hide project items based on the category
      projectItems.forEach((item) => {
        const subCategory = item
          .querySelector(".sub-category")
          .textContent.trim();
        const itemCategory = item
          .querySelector(".card-item-port-text")
          .textContent.trim();
        const isAllCategory = categoryName === "All";

        if (
          isAllCategory ||
          itemCategory === categoryName ||
          (categoryName === "Open Source Project" &&
            subCategory === "Open Source Project")
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
