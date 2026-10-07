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

Plain **HTML5, CSS and JavaScript**: no framework and no build step.

- [Web3Forms](https://web3forms.com) for the contact form
- Google Fonts (Poppins) and an embedded Google Map

## ✨ Features <a name="features"></a>

- **Tabbed single page** (About, Resume, Portfolio, Publications, Contact), with each tab linkable by URL, e.g. `#portfolio`
- **Light and dark mode** that follows the visitor's system setting and remembers their choice
- **Portfolio filter** by category
- **Testimonial popup**, usable with mouse and keyboard
- **SEO-ready**: meta description, Open Graph / Twitter preview card, `Person` structured data
- **Accessible**: real buttons and links, visible keyboard focus, reduced-motion support
- **Fast**: lazy-loaded images and a trimmed font request

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
data.js               ★ All the content: services, testimonials, resume, skills, projects, publications
index.html            Page layout, sidebar, contact form and the shared icon sprite
index.js              Builds the sections from data.js; tabs, theme toggle, popup, filter, contact form
css/style.css         Styles and responsive breakpoints
images/               Avatars, icons and the link-preview image (og-image.png)
images/banners/       Project and publication cover images (WebP)
assets/               Resume PDF
```

### ✏️ Updating content

Everything you'd normally change lives in **`data.js`**, so you don't need to touch the HTML. Copy an existing entry, edit it, save.

**Add a project** to `projects` (newest first):

```js
{
  title: "My New App",
  category: "Application",          // one of `categories`, used by the filter
  tags: ["Open Source Project"],    // extra filters it should appear under
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

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- AUTHORS -->

## 👥 Authors <a name="authors"></a>

👤 **Sameer Muslim**

- GitHub: [@sameermuslim](https://github.com/sameermuslim)
- LinkedIn: [M. Sameer Muslim](https://www.linkedin.com/in/m-sameer-muslim-55a5a4166/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- FUTURE FEATURES -->

## 🔭 Future Features <a name="future-features"></a>

- [ ] Case-study pages for selected projects

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
