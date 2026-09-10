# Portfolio - Md Eaftekhirul Islam

Live site: https://eafte.github.io/portfolio/

A single-page portfolio for master's and scholarship applications. Static site: no build step, no backend, deploys straight to GitHub Pages.

## What's on the page

- Hero: headline, focus areas (Software, AI/ML, LLM, Cybersecurity), quick facts
- Projects: featured LLM Guard Bench (adversarial LLM security benchmark) plus two web/Python projects
- Skills: only items actually used in the projects above
- Experience: work, student venture, 2025 China International College Students' Innovation Competition
- Education: ZZU Software Engineering (BSc, 2027), HSK-4 certified, HSC
- Contact: master's programs (Fall 2027), internships, research opportunities

## Stack

- HTML, CSS, vanilla JavaScript - no build tooling required
- Three.js full-page canvas background (calm, distant animation)
- Dark/light theme toggle persisted in localStorage
- Inter font, JSON-LD person metadata, secure external links (rel="noopener noreferrer")

## Run locally

Open `index.html` directly in a browser, or serve the folder:

```sh
python -m http.server 8000
```

Then visit http://localhost:8000.

## Deploy

GitHub Pages serves the `main` branch (root). Push to `main` and the live site updates. No build step.

## Files

```text
index.html    # all page content and metadata
styles.css    # theme, layout, animations
script.js     # theme toggle, background, scroll reveals
favicon.svg   # site icon
```

## Content rules (keep the portfolio professor-safe)

- Every claim must trace to real work: LLM Guard Bench is a hands-on project, not formal research. Research language stays aspirational (interested in, working toward).
- Skills list only what the projects use. If a skill has no project behind it, it does not go in.
- Plain punctuation in copy: hyphens, colons, commas. No em/en dashes or fancy unicode.
- Links use `https://github.com/eafte/...` only (the previous username is dead - never link to it). After editing, curl-check every github.com link returns 200.
- One soft funding line lives in Contact only. The hero sells merit, not need.

## Accessibility

- Honors `prefers-reduced-motion: reduce`
- Visible `:focus-visible` keyboard styles, high-contrast text

## License

Personal portfolio. If you fork it, replace the content and attribution with your own.
