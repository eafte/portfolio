# Portfolio - Md Eaftekhirul Islam

Live site: https://eafte.github.io/portfolio/

A single-page portfolio for master's and scholarship applications. Static site: no build step, no backend, deploys straight to GitHub Pages.

## Design

A warm, print-editorial look aimed at professors and scholarship committees:
paper background, ink and vermilion accents, serif display type (Spectral) with
a modern grotesque for body text (Instrument Sans). No heavy frameworks, no
background animation, no gradient text - the page loads fast and reads like a
well-set document.

## What's on the page

- Hero: name, focus areas, short narrative, and a metrics strip (attack categories, evaluation runs, tests passing, timezones, HSK-4)
- The featured card carries the benchmark's generated report figure (a two-panel latency and vulnerability chart). It is a committed, web-optimised copy in `assets/`, not a link to an external host, so it loads from the same origin everywhere
- Work: featured LLM Guard Bench (adversarial LLM security benchmark) plus three more projects - a full-stack B2B platform, a desktop expense tracker, and HarmonyCare (team Android app) - each with a plain-language "Result"
- Skills: only items actually used in the projects above
- Experience: work, student venture, 2025 China International College Students' Innovation Competition
- Education: ZZU Software Engineering (BSc, 2027), HSK-4 certified, HSC
- Contact: master's programs, internships, research opportunities

## Stack

- HTML, CSS, vanilla JavaScript - no build tooling required
- Light/dark theme toggle persisted in localStorage
- Spectral + Instrument Sans (Google Fonts), JSON-LD person metadata, secure external links (rel="noopener noreferrer")

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
script.js     # theme toggle, scroll reveals
favicon.svg   # site icon
cv-ats.docx   # ATS-safe CV (Word) - linked from the hero and contact section
assets/       # project figures (LLM Guard Bench report, 1800px and 900px)
```

## Content rules (keep the portfolio professor-safe)

- Every claim must trace to real work: LLM Guard Bench is a hands-on project, not formal research. Research language stays aspirational (interested in, working toward).
- Machine learning is framed as a direction, never as a skill. The research line leads with software engineering and security, then says "working toward applied machine learning through that evaluation work". ML frameworks and algorithms stay out of Skills until an ML project exists with a real train and evaluate loop. Never restore a flat "applied machine learning" claim.
- Do not tag projects with chips like "solo project" or "team project" and do not add role lines to solo work; the Work cards stay clean. Where a project was built by a team, say so plainly inside the card (tagline or one role line) so nothing reads as the owner's own implementation.
- HarmonyCare was a team course project: the role is a small part of the architecture work, and the application was built by the team. Never claim implementation, technical design, or testing.
- UrbanAI was a team competition prototype and appears in Experience only, never as a Work card. The role is feature scoping and documentation guidelines - never implementation, concept ownership, or presenting the entry.
- Skills must trace to work the owner actually built. Next.js, Three.js, and DeepSeek are UrbanAI technologies and never go in the Skills section, because that implementation was a teammate's.
- Both team repositories credit the teammate who led implementation. Keep that credit intact; it is what makes the role lines on the cards credible.
- Skills list only what the projects use. If a skill has no project behind it, it does not go in.
- Plain punctuation in copy: hyphens, colons, commas. No em/en dashes or fancy unicode.
- Links use `https://github.com/eafte/...` only (the previous username is dead - never link to it). After editing, curl-check every github.com link returns 200.
- One soft funding line lives in Contact only. The hero sells merit, not need.

## Accessibility

- Honors `prefers-reduced-motion: reduce`
- Visible `:focus-visible` keyboard styles, high-contrast text

## License

Personal portfolio. If you fork it, replace the content and attribution with your own.
