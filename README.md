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

<a href="https://sameermuslim.github.io/my-portfolio/">https://sameermuslim.github.io/my-portfolio/</a>

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
index.html            All page content and sections
index.js              Tabs, theme toggle, testimonial popup, portfolio filter, contact form
css/style.css         Styles and responsive breakpoints
images/               Avatars, icons and the link-preview image (og-image.png)
images/banners/       Project and publication cover images (WebP)
assets/               Resume PDF
```

**Adding a project:** copy one `<li class="port-list-li">` block in the Portfolio section of `index.html`, then change the link, banner image, category and description. Banners display at roughly 4:3; WebP keeps them small.

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
- [ ] Move projects and resume data into a JSON file

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
