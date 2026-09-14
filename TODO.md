# Portfolio Improvement TODO

Source: audit of https://eafte.github.io/portfolio/ (Sep 2026).
Work through P0 → P1 → P2. Check boxes as you go.

## 🔴 P0 — High impact, low effort (~1 evening, ~2 hrs)

- [x] **1. Social / SEO tags** — add `og:image`, `twitter:card`, `twitter:image`, hero portrait
      to JSON-LD (`url`, `image`); create 1200×630 social card image
- [x] **2. Add `robots.txt` + `sitemap.xml`** at site root
- [x] **3. Favicon fallbacks** — add PNG favicon + `apple-touch-icon`
- [x] **4. Real headshot** — `assets/photo.jpg` live (512px square crop, 27 KB)
- [ ] **5. CV as PDF** — export `Md-Eaftekhirul-Islam-CV.pdf`, make it the primary button;
      keep `.docx` as secondary ATS download
- [x] **6. Fix metrics row** — hero shows `HSK 4 · Certified` (move `194/300` to Education
      only); replace `450+ timezones` metric with an earned one
      (e.g. `5.00/5.00 HSC GPA`, `Full-tuition scholarship`, or `13k+ lines`)
- [x] **7. Fix Result wording** (LLM Guard Bench) — clarify "0/8 runs vulnerable across
      all 4 local models" → "0 vulnerable out of 8 runs per category — holding across
      all 4 models"
- [x] **8. Reframe research-interests line** — replace "rather than by claiming training
      experience I do not have yet" with a positive framing
      (e.g. "Currently building applied-ML foundations through evaluation work…")

## 🟡 P1 — Medium impact (~1 weekend)

- [ ] **9. Project visuals** — add 1 screenshot/mockup each: B2B site (browser frame),
      IODEX (desktop window), HarmonyCare (phone frame)
- [x] **10. Trim hero copy** — cut lede to ~50 words, 2 short paragraphs; remove
      repeated "reproducible / measure / carefully" (appears 4–5×)
- [ ] **11. Collapsible result tables** — wrap "The numbers behind the figure" in
      `<details>` so scanners see chart + result first
- [ ] **12. Prove or reframe JRSphere** — add 1 concrete line (what it is, what shipped)
      + link; or downgrade "Founder & Lead" framing
- [ ] **13. Strengthen family-business entry** — add 1 measurable line (what analysis or
      web improvement actually changed)
- [ ] **14. Simplify contact CTA** — one clear path ("Email is best — I reply within
      2 days") instead of conditional LinkedIn/email instructions
- [ ] **15. Add analytics** — privacy-friendly counter (GoatCounter / Umami / Plausible)
- [ ] **16. Print stylesheet** — `@media print`: hide nav/toggle, force light theme
- [ ] **17. Footer** — add "Last updated: <month year>", tech credit
      ("Built with HTML/CSS/JS · Hosted on GitHub Pages"), back-to-top link

## 🟢 P2 — Polish / technical (when convenient)

- [ ] **18. WebP/AVIF images** — convert PNGs, keep PNG fallback via `<picture>`/`srcset`
- [ ] **19. Fonts** — `preload` key fonts or self-host instead of render-blocking Google Fonts
- [ ] **20. Metrics semantics** — replace `<dt>`-for-numbers with `<div>`/`<span>`
      (screen-reader fix)
- [ ] **21. Skills → add Tools row** — Git, Linux, pytest, CI (already used daily)
- [ ] **22. Custom domain** (optional) — e.g. `eaftekhirul.com` (~$12/yr)
- [ ] **23. Live demo for B2B project** (optional) — replace/augment "Run locally" CTA

## Done

- [x] Audit completed (Sep 2026)
