<a name="readme-top"></a>

<div align="center">

  <h1><b>Sameer Muslim · Portfolio</b></h1>

  <p>Product Designer & Frontend Developer</p>

</div>

<!-- TABLE OF CONTENTS -->

# 📗 Table of Contents

- [📖 About Project](#about-project)
  - [🛠 Built With](#built-with)
  - [✨ Features](#features)
  - [🚀 Live Demo](#live-demo)
- [💻 Getting Started](#getting-started)
- [🗂 Project Structure](#project-structure)
- [👥 Authors](#authors)
- [🔭 Future Features](#future-features)
- [🤝 Contributing](#contributing)
- [⭐️ Show your support](#support)
- [📝 License](#license)

<!-- PROJECT DESCRIPTION -->

# 📖 Portfolio <a name="about-project"></a>

My personal portfolio: who I am, my resume, selected projects, publications and a contact form. I'm a Product Designer and Frontend Developer with 4+ years of experience in UI/UX design, design systems, user research and web development, currently Product Manager at [Aseel](https://aseelapp.com).

## 🛠 Built With <a name="built-with"></a>

Plain **HTML5, CSS and JavaScript**: no framework and no build step. Libraries load from a CDN:

- [GSAP](https://gsap.com) + ScrollTrigger for scroll-driven animation
- [Lenis](https://lenis.darkroom.engineering) for smooth scrolling
- [Web3Forms](https://web3forms.com) for the contact form and visitor comments
- [GoatCounter](https://www.goatcounter.com) for privacy-friendly analytics (optional, off by default)
- Google Fonts: Fraunces, Inter Tight, JetBrains Mono, Gaegu, and Vazirmatn for Persian

## ✨ Features <a name="features"></a>

- **Sketch → Ship hero**: the page starts as a hand-drawn wireframe; scrolling "designs" it into the final layout
- **Work as a design file**: case studies are frames on a canvas, with a layers panel, inspector, sticky notes and a camera that flies between them
- **Case-study pages**: every featured project opens a full write-up (`case.html?p=slug`) with the brief, process, design decisions, outcome and an optional before/after slider
- **How I work**: five process steps that "ink in" from a dashed sketch as you scroll, plus a **Now** card
- **Writing board and kind words**: magazine issues pinned to a board, testimonials as design comments, and visitors can leave their own comment (sent to my inbox for review)
- **Dark mode**: follows the system setting, with a toggle that remembers your choice
- **فارسی**: a full Persian version, right to left, from the فا button or `?lang=fa`
- **Wireframe mode**: press <kbd>W</kbd> (or the footer link) to see the whole site as a sketch
- **Design system page** (`styleguide.html`) built from the live tokens and components
- **Printable résumé** (`resume.html`): one A4 page generated from the same data
- **Installable and offline**: a web app manifest and a service worker
- **Works without motion**: on phones, with reduced motion, or if the CDN fails, the same content shows as a clean static page
- **SEO-ready**: meta description, Open Graph / Twitter preview card, `Person` structured data
- **Accessible**: semantic sections, keyboard focus styles, decorative layers hidden from screen readers

<!-- LIVE DEMO -->

## 🚀 Live Demo <a name="live-demo"></a>

<a href="https://sameermuslim-aseel.github.io/my-portfolio/">https://sameermuslim-aseel.github.io/my-portfolio/</a>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## 💻 Getting Started <a name="getting-started"></a>

### Setup

Clone this repository:

```bash
git clone https://github.com/sameermuslim-aseel/my-portfolio.git
cd my-portfolio
```

### Run locally

Open `index.html` in a browser, or serve the folder so everything behaves like the live site:

```bash
npx serve .
```

### Deploy

Push to `main` and enable **GitHub Pages** (Settings → Pages → deploy from branch). If the site URL changes, update the `canonical`, `og:url`, `og:image` and structured-data URLs at the top of `index.html`.

<!-- PROJECT STRUCTURE -->

## 🗂 Project Structure <a name="project-structure"></a>

```
data.js               ★ All the content: case studies, projects, resume, skills, publications, testimonials
data.fa.js            Persian text: interface strings plus translated case studies, process and Now card
index.html            Home page structure (hero wireframe, sections, contact form)
case.html             Case-study page, filled from caseStudies by js/case.js
styleguide.html       Design-system page (js/styleguide.js)
resume.html           One-page printable résumé (js/resume.js)
js/main.js            Renders data.js, runs the scroll animations, contact + comment forms
js/i18n.js            English / Persian switch: t("key", "fallback") and Persian digits
js/theme.js           Dark mode toggle
js/toast.js           Animated toast notifications
js/site.js            Service worker registration and optional analytics
sw.js                 Offline cache (bump VERSION when you change cached files)
manifest.webmanifest  Install-as-app settings and icons
css/main.css          Design tokens, layout, static + motion styles, dark and RTL rules
prototypes/           The interactive concept prototypes the redesign came from
images/               Avatars and the link-preview image (og-image.png)
images/banners/       Project and publication cover images (WebP)
assets/               Resume PDF
```

### ✏️ Updating content

Everything you'd normally change lives in **`data.js`**, so you don't need to touch the HTML. Copy an existing entry, edit it, save.

**Feature a project** in the Work canvas by adding it to `caseStudies` (the first three work best):

```js
{
  title: "My New App",
  client: "Company",
  year: "2027",
  type: "Mobile app",
  role: "Product Designer",
  image: "images/banners/my-new-app.webp",
  url: "https://...",
  problem: "What wasn't working for people.",
  myRole: "What I did.",
  shipped: "What came out of it.",
  note: "a short handwritten note ✎",

  // the case-study page: case.html?p=my-new-app
  slug: "my-new-app",
  summary: "One paragraph about the product and your part in it.",
  facts: [["Role", "Product Designer"], ["Timeline", "2027"]],
  process: [{ title: "Research", text: "What you did in this step." }],
  decisions: [{ title: "Why X over Y", text: "The trade-off you made." }],
  outcome: ["What changed because of the work."],
  compare: { before: "images/before.webp", after: "images/after.webp" },  // optional slider
},
```

The **How I work** steps live in `process` and the **Now** card in `now`. Update `now.updated` when you change it.

**Add a project** to the archive in `projects` (newest first). Older work shows as a compact "version history" list with a preview on hover; the first five rows show, the rest sit behind "+ more":

```js
{
  title: "My New App",
  short: "One line for the version-history row",
  kind: "Android",                  // the Type column
  category: "Application",
  tags: ["Open Source Project"],
  url: "https://github.com/...",
  image: "images/banners/my-new-app.webp",
  alt: "My New App banner",
  description: "One or two sentences about the project."
},
```

**Add a job** to the `Experience` section of `resume`:

```js
{
  role: "Senior Product Designer",
  at: [{ name: "Company", url: "https://company.com" }],   // leave out url if there's no link
  date: "Jan 2027 – present",
  place: "Remote",
  about: "What the company does.",
  points: ["What you did.", "Another achievement with a [link](https://example.com)."]
},
```

Any text can contain a link written as `[link text](https://...)`. Banners display at roughly 4:3; WebP keeps them small.

### 🌐 Persian version

`data.fa.js` holds the Persian text. `ui` has the interface strings, matched by the `data-i18n` keys in the HTML and the `t()` calls in the scripts. `caseStudies`, `process` and `now` override the English items **by position**, so when you add a case study to `data.js`, add its translation at the same position. Anything without a translation falls back to English. Experience, the archive and publications stay in English on purpose.

### 📊 Analytics (optional)

Create a free site at [goatcounter.com](https://www.goatcounter.com) and put its code in `data.js`:

```js
analytics: { goatcounter: "your-code" },
```

It sets no cookies and loads nothing while the code is empty.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- AUTHORS -->

## 👥 Authors <a name="authors"></a>

👤 **Sameer Muslim**

- GitHub: [@sameermuslim](https://github.com/sameermuslim)
- LinkedIn: [M. Sameer Muslim](https://www.linkedin.com/in/m-sameer-muslim-55a5a4166/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- FUTURE FEATURES -->

## 🔭 Future Features <a name="future-features"></a>

- [x] Case-study pages for selected projects
- [x] Wireframe → final sliders on the case-study pages
- [ ] Persian translations for experience and publications

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## 🤝 Contributing <a name="contributing"></a>

Feel free to report issues or suggest new features! Check the [issues page](../../issues/).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- SUPPORT -->

## ⭐️ Show your support <a name="support"></a>

If you like this portfolio, give it a ⭐️ and share your feedback.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## 📝 License <a name="license"></a>

This project is [MIT](./LiCENCE) licensed.

<p align="right">(<a href="#readme-top">back to top</a>)</p>
