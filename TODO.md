# Portfolio Improvement TODO

Source: audit of https://eafte.github.io/portfolio/ (Sep 2026).
Work through P0 → P1 → P2. Check boxes as you go.

## 🔴 P0 — High impact, low effort (~1 evening, ~2 hrs)

- [x] **1. Social / SEO tags** — add `og:image`, `twitter:card`, `twitter:image`, hero portrait
      to JSON-LD (`url`, `image`); create 1200×630 social card image
- [x] **2. Add `robots.txt` + `sitemap.xml`** at site root
- [x] **3. Favicon fallbacks** — add PNG favicon + `apple-touch-icon`
- [x] **4. Real headshot** — `assets/photo.jpg` live (512px square crop, 27 KB)
- [x] **5. CV as PDF** — `Md-Eaftekhirul-Islam-CV.pdf` live (3 pages, Europass, 109 KB).
      Hero and Contact both point at the PDF; `.docx` kept as the secondary ATS download.

      ⚠️ The PDF and the site disagree in places — see "CV vs site" below.
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

- [x] **9. Project visuals** — add 1 screenshot/mockup each: B2B site (browser frame),
      IODEX (desktop window), HarmonyCare (phone frame)
- [x] **10. Trim hero copy** — cut lede to ~50 words, 2 short paragraphs; remove
      repeated "reproducible / measure / carefully" (appears 4–5×)
- [x] **11. Collapsible result tables** — wrap "The numbers behind the figure" in
      `<details>` so scanners see chart + result first
- [ ] **12. Prove or reframe JRSphere** — add 1 concrete line (what it is, what shipped)
      + link; or downgrade "Founder & Lead" framing
- [ ] **13. Strengthen family-business entry** — add 1 measurable line (what analysis or
      web improvement actually changed)
- [ ] **14. Simplify contact CTA** — one clear path ("Email is best — I reply within
      2 days") instead of conditional LinkedIn/email instructions
- [ ] **15. Add analytics** — privacy-friendly counter (GoatCounter / Umami / Plausible)
- [x] **16. Print stylesheet** — `@media print`: hide nav/toggle, force light theme
- [ ] **17. Footer** — add "Last updated: <month year>", tech credit
      ("Built with HTML/CSS/JS · Hosted on GitHub Pages"), back-to-top link
      — back-to-top already exists. The rest was reverted Oct 2026 at the site
      owner's request: footer copy is the owner's to write, not the audit's.

## 🟢 P2 — Polish / technical (when convenient)

- [ ] **18. WebP/AVIF images** — convert PNGs, keep PNG fallback via `<picture>`/`srcset`
- [ ] **19. Fonts** — `preload` key fonts or self-host instead of render-blocking Google Fonts
- [x] **20. Metrics semantics** — replace `<dt>`-for-numbers with `<div>`/`<span>`
      (screen-reader fix)
- [x] **21. Skills → add Tools row** — Git, Linux, pytest, CI (already used daily)
- [ ] **22. Custom domain** (optional) — e.g. `eaftekhirul.com` (~$12/yr)
- [ ] **23. Live demo for B2B project** (optional) — replace/augment "Run locally" CTA

## ♿ UI/UX polish pass — Oct 2026

Targeted polish only: same type pairing, palette and section structure.
Verified numerically against WCAG AA rather than by eye.

- [x] **Contrast** — light `--faint` was 2.45:1 (metadata, card labels) and dark
      `--faint` 3.58:1; both now clear 4.5:1. Light `--muted` 4.55 → 5.75:1.
- [x] **Dark-mode primary buttons** — white on `#60a5fa` was 2.54:1; button and
      brand mark now use a dark `--accent-ink` (7.4:1).
- [x] **"Copied" state** — emerald text was ~2.3:1; added `--green-ink`.
- [x] **Micro-type floor** — raised 0.64–0.72rem metadata to 0.72–0.75rem.
- [x] **OS theme** — first visit follows `prefers-color-scheme`; resolved in an
      inline head script so there is no flash of the wrong theme; live OS changes
      respected until the visitor picks a theme explicitly.
- [x] **Hero CTA hierarchy** — 4 identical buttons → 1 primary, 1 secondary,
      2 quiet links behind a divider.
- [x] **False affordance** — non-interactive cards no longer lift on hover
      (buttons and links still do).
- [x] **Mobile nav** — Escape closes and returns focus, scrollable on short
      screens, resets when crossing to desktop, `aria-current` on the active link.
- [x] **Focus rings** — real 2px outline with offset, not shadow only.
- [x] **Details tables** — 44px touch target; the "Show tables" label now flips to
      "Hide tables" instead of vanishing.
- [x] **Sticky header** — gains elevation once the page scrolls.
- [x] **Misc** — `color-scheme` (native controls/scrollbars), `text-wrap:
      balance/pretty`, `::selection`, `overflow-x: clip` (safer for sticky),
      print forces the light token set even in dark mode.

## CV vs site — synced Oct 2026 (CV is the source of truth)

The PDF CV (`10/2026`) is treated as the source of truth; the site now matches it.

- [x] **ML Host Hardening added** as project 02 (`github.com/eafte/ml-host-hardening`),
      with the port surface (22/8000 → 22/80), Lynis 61 → 71 and systemd
      exposure 9.2 → 1.4.
- [x] **Academic Research section added** — the 4 course-based pieces, with a
      nav entry between Work and Skills.
- [x] **Competition upgraded** — "Competitor" → **Certificate of Honor**
      (School of International Education, ZZU, Oct 2025).
- [x] **LLM Guard Bench** — CV engineering facts folded in (717 pytest cases,
      ~50.2 MiB peak RSS, O(1) growth to 1M+ records, strict MyPy), keeping the
      adversarial results already on the page.
- [x] **Dates corrected** — HSC `Jun 2019 - Dec 2021`; degree marked
      `Jun 2027 (expected)`.
- [x] **"Deployed" corrected** — the B2B result no longer claims deployment;
      it matches the CV's "deploy-ready, in end-to-end testing".
- [x] ~~WeChat `khirul_2004` in Contact~~ — **reverted Oct 2026**, the handle is
      to stay private. Languages extended with Hindi + Urdu.
- [x] **Certifications block** — HSK 4 (CTI, May 2026), Udemy Cyber Security &
      Ethical Hacking (Jan 2026), competition Certificate of Honor.
- [x] **Scored coursework** — the CV's per-course marks replace the generic
      "core curriculum" line.
- [x] **Skills** — added FastAPI, C, scikit-learn, MyPy and a fifth
      "Security & Host Hardening" card (nmap, nginx, UFW, fail2ban, Lynis,
      systemd).

Deliberately **not** carried over:

- "Codebase available upon request" — the repos are public and linked, so the
  line would be false on the site.
- SSC (Dakhin Banasree) — Europass needs it; a portfolio does not.
- The 163.com address — one contact route is clearer than three.

## Done

- [x] Audit completed (Sep 2026)
- [x] CV PDF published (Oct 2026)
- [x] UI/UX polish pass (Oct 2026)
