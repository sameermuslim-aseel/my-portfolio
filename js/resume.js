// One-page résumé built from data.js, so it never drifts from the website.

function escapeHtml(text) {
  const map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  return String(text).replace(/[&<>"']/g, (c) => map[c]);
}
// links in data.js are written as [text](url); on paper we keep just the text
const plain = (text) => escapeHtml(String(text).replace(/\[([^\]]+)\]\([^)]+\)/g, "$1"));

const D = SITE_DATA;
const resume = Object.fromEntries(D.resume.map((s) => [s.title, s.items.filter((i) => !i.group)]));
const orgName = (item) => (item.at || []).map((o) => o.name).join(" & ");

// keep it to one page: the most recent roles, up to three points each
const EXPERIENCE = resume.Experience.slice(0, 5);

document.getElementById("resume").innerHTML = `
  <header class="r-head">
    <div>
      <h1>Sameer Muslim</h1>
      <p class="r-role">Product Designer &amp; Frontend Developer</p>
    </div>
    <ul class="r-contact">
      <li>iamsameerdev@gmail.com</li>
      <li>linkedin.com/in/m-sameer-muslim-55a5a4166</li>
      <li>sameermuslim-aseel.github.io/my-portfolio</li>
      <li>Afghanistan · remote</li>
    </ul>
  </header>

  <p class="r-summary">
    Product Designer and Frontend Developer with 4+ years of experience in design systems, UI/UX design, user research
    and interactive prototyping. I turn complex ideas into simple, human-centred products, and build many of them myself.
  </p>

  <div class="r-cols">
    <section class="r-main">
      <h2>Experience</h2>
      ${EXPERIENCE.map(
        (i) => `
        <article class="r-item">
          <div class="r-item-head">
            <h3>${plain(i.role)}${orgName(i) ? ` · <span>${escapeHtml(orgName(i))}</span>` : ""}</h3>
            <span class="r-date">${escapeHtml(i.date || "")}</span>
          </div>
          ${i.points ? `<ul>${i.points.slice(0, 3).map((p) => `<li>${plain(p)}</li>`).join("")}</ul>` : ""}
        </article>`
      ).join("")}
    </section>

    <aside class="r-side">
      <h2>Selected work</h2>
      <ul class="r-list">
        ${D.caseStudies.map((c) => `<li><b>${escapeHtml(c.title)}</b><span>${escapeHtml(c.type)}</span></li>`).join("")}
      </ul>

      <h2>Education</h2>
      <ul class="r-list">
        ${resume.Education.map((i) => `<li><b>${plain(i.role)}</b><span>${escapeHtml(orgName(i))} · ${escapeHtml(i.date || "")}</span></li>`).join("")}
      </ul>

      <h2>Certifications</h2>
      <ul class="r-list">
        ${resume.Certification.map((i) => `<li><b>${plain(i.role)}</b><span>${escapeHtml(orgName(i))} · ${escapeHtml(i.date || "")}</span></li>`).join("")}
      </ul>

      <h2>Skills</h2>
      <p class="r-skills">${D.skills.map(escapeHtml).join(" · ")}</p>
    </aside>
  </div>`;

document.getElementById("print-btn").addEventListener("click", () => window.print());
