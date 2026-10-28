# Portfolio

Personal portfolio of Md Eaftekhirul Islam, a Software Engineering student at Zhengzhou University. It presents projects, research, skills, experience, education, and contact information.

Live site: https://eafte.github.io/portfolio/

The site is built with HTML, CSS, and JavaScript. It has no framework, package dependencies, or build step. Google Fonts are used when available, with local system-font fallbacks.

## Run locally

Clone the repository and start a local server:

```sh
git clone https://github.com/eafte/portfolio.git
cd portfolio
python3 -m http.server 8000
```

Open http://localhost:8000/ in a browser. You can also open `index.html` directly.

## Repository structure

```text
index.html                       Page content and metadata
styles.css                       Layout, themes, responsive and print styles
script.js                        Navigation and interactive behavior
assets/                          Portrait, social card, and project chart
favicon*.png, favicon.svg        Browser icons
apple-touch-icon.png             Apple touch icon
Md-Eaftekhirul-Islam-CV.pdf      Current CV
key.asc                          Public PGP key
robots.txt, sitemap.xml          Search engine instructions
TODO.md                          Improvement backlog and audit notes
tests/test_site.py               Dependency-free checks
```

## Checks

Run the automated checks with Python 3:

```sh
python3 -m unittest discover -s tests -v
```

The checks cover local links, section IDs, metadata, and the sitemap. They also check JavaScript syntax when Node.js is installed. Test layout and interactions in a browser at desktop and mobile widths; the content and navigation also work with JavaScript disabled.

## Updating and deployment

- Edit page content and metadata in `index.html`, styles in `styles.css`, and interactions in `script.js`.
- Keep the site consistent with the current PDF CV. Review `TODO.md` before changing project illustrations.
- When updating `styles.css` or `script.js`, increment the corresponding `?v=` number in `index.html` to refresh cached files.
- GitHub Pages publishes the repository root from the `main` branch. Changes appear on the live site after they are merged into `main`.

## Contact

- Email: [eafte1@outlook.com](mailto:eafte1@outlook.com)
- GitHub: https://github.com/eafte
- LinkedIn: https://www.linkedin.com/in/eaftekhirul/
- PGP public key: [key.asc](key.asc)
