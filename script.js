(function () {
  "use strict";

  // ---------- Footer year ----------
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // ---------- Theme ----------
  const root = document.documentElement;
  const toggle = document.getElementById("themeToggle");
  const themeColor = document.querySelector('meta[name="theme-color"]');
  const STORAGE_KEY = "ei_portfolio_theme";

  // localStorage can throw in sandboxed frames - never let that break the page.
  const storage = (function () {
    try {
      const s = window.localStorage;
      s.getItem(STORAGE_KEY);
      return s;
    } catch (e) {
      return null;
    }
  })();

  function getSavedTheme() {
    if (!storage) return null;
    try {
      return storage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function saveTheme(theme) {
    if (!storage) return;
    try {
      storage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      /* ignore */
    }
  }

  function updateToggleUi(theme) {
    if (!toggle) return;
    const label = toggle.querySelector(".theme__label");
    const isLight = theme === "light";
    if (label) label.textContent = isLight ? "Dark mode" : "Light mode";
    toggle.setAttribute("aria-label", isLight ? "Switch to dark mode" : "Switch to light mode");
    toggle.setAttribute("aria-pressed", String(theme === "dark"));
  }

  function updateThemeColor(theme) {
    if (!themeColor) return;
    themeColor.setAttribute("content", theme === "dark" ? "#151210" : "#f7f4ec");
  }

  function applyTheme(theme) {
    if (theme === "dark") {
      root.setAttribute("data-theme", "dark");
    } else {
      root.removeAttribute("data-theme");
    }
    updateToggleUi(theme);
    updateThemeColor(theme);
  }

  const saved = getSavedTheme();
  if (saved === "light" || saved === "dark") {
    applyTheme(saved);
  } else {
    applyTheme("light");
  }

  if (toggle) {
    toggle.addEventListener("click", () => {
      const current = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
      const next = current === "dark" ? "light" : "dark";
      saveTheme(next);
      applyTheme(next);
    });
  }

  // ---------- Mobile navigation ----------
  const navToggle = document.getElementById("navToggle");
  const nav = document.getElementById("nav");

  function closeNav() {
    if (!nav || !navToggle) return;
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open menu");
  }

  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(open));
      navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    nav.addEventListener("click", (ev) => {
      if (ev.target.closest("a")) closeNav();
    });

    document.addEventListener("click", (ev) => {
      if (!nav.contains(ev.target) && !navToggle.contains(ev.target)) closeNav();
    });
  }

  // ---------- Scroll reveal ----------
  const reduceMotion =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const sections = document.querySelectorAll(".section, .metrics");

  if (!reduceMotion && "IntersectionObserver" in window) {
    sections.forEach((s) => s.classList.add("reveal"));

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { root: null, threshold: 0.1, rootMargin: "0px 0px -8% 0px" }
    );

    sections.forEach((s) => io.observe(s));
  } else {
    sections.forEach((s) => s.classList.add("is-visible"));
  }
})();
