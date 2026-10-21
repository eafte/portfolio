(function () {
  "use strict";

  var root = document.documentElement;

  // ---------- Footer year ----------
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // ---------- Theme ----------
  // The inline <head> script already resolved the theme before first paint.
  // This block only takes over interaction, persistence and OS changes.
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
      const value = storage.getItem(STORAGE_KEY);
      return value === "light" || value === "dark" ? value : null;
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

  const systemDark =
    window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)");

  function currentTheme() {
    return root.getAttribute("data-theme") === "dark" ? "dark" : "light";
  }

  function updateToggleUi(theme) {
    if (!toggle) return;
    const label = toggle.querySelector(".theme__label");
    const isLight = theme === "light";
    if (label) label.textContent = isLight ? "Dark mode" : "Light mode";
    toggle.setAttribute(
      "aria-label",
      isLight ? "Switch to dark mode" : "Switch to light mode"
    );
  }

  function updateThemeColor(theme) {
    if (!themeColor) return;
    themeColor.setAttribute("content", theme === "dark" ? "#0b1210" : "#f9f3e7");
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

  applyTheme(currentTheme());

  if (toggle) {
    toggle.addEventListener("click", () => {
      const next = currentTheme() === "dark" ? "light" : "dark";
      saveTheme(next);
      applyTheme(next);
    });
  }

  // Follow the OS only while the visitor has not made an explicit choice.
  if (systemDark) {
    const onSystemChange = (event) => {
      if (getSavedTheme()) return;
      applyTheme(event.matches ? "dark" : "light");
    };
    if (systemDark.addEventListener) {
      systemDark.addEventListener("change", onSystemChange);
    } else if (systemDark.addListener) {
      systemDark.addListener(onSystemChange);
    }
  }

  // ---------- Mobile navigation ----------
  const navToggle = document.getElementById("navToggle");
  const nav = document.getElementById("nav");

  function setNavState(open) {
    if (!nav || !navToggle) return;
    nav.classList.toggle("is-open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  function closeNav(returnFocus) {
    if (!nav || !navToggle || !nav.classList.contains("is-open")) return;
    setNavState(false);
    if (returnFocus) navToggle.focus();
  }

  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      setNavState(!nav.classList.contains("is-open"));
    });

    nav.addEventListener("click", (ev) => {
      if (ev.target.closest("a")) closeNav(false);
    });

    document.addEventListener("click", (ev) => {
      if (!nav.contains(ev.target) && !navToggle.contains(ev.target)) {
        closeNav(false);
      }
    });

    // Keyboard: Escape closes and returns focus to the trigger.
    document.addEventListener("keydown", (ev) => {
      if (ev.key === "Escape" || ev.key === "Esc") closeNav(true);
    });

    // Leaving mobile layout with the menu open would strand a hidden panel.
    if (window.matchMedia) {
      const desktop = window.matchMedia("(min-width: 981px)");
      const onChange = (event) => {
        if (event.matches) closeNav(false);
      };
      if (desktop.addEventListener) desktop.addEventListener("change", onChange);
      else if (desktop.addListener) desktop.addListener(onChange);
    }
  }

  // ---------- Header elevation on scroll ----------
  const header = document.querySelector(".header");
  if (header) {
    let ticking = false;
    const syncHeader = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
      ticking = false;
    };
    syncHeader();
    window.addEventListener(
      "scroll",
      () => {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(syncHeader);
      },
      { passive: true }
    );
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

  // ---------- Navigation Scrollspy ----------
  const navLinks = document.querySelectorAll(".nav a[href^='#']");
  const observedSections = document.querySelectorAll("section[id]");

  if ("IntersectionObserver" in window && navLinks.length && observedSections.length) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            const isCurrent = link.getAttribute("href") === `#${id}`;
            link.classList.toggle("is-active", isCurrent);
            // Announce the current section to assistive tech too, not just visually.
            if (isCurrent) link.setAttribute("aria-current", "true");
            else link.removeAttribute("aria-current");
          });
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    observedSections.forEach((sec) => navObserver.observe(sec));
  }

  // ---------- Expandable result tables ----------
  // The summary label used to be hidden when open, leaving an empty slot.
  // Keep it visible and flip the wording instead.
  document.querySelectorAll("details.results").forEach((details) => {
    const hint = details.querySelector(".results__hint");
    if (!hint) return;
    const sync = () => {
      hint.textContent = details.open ? "Hide tables" : "Show tables";
    };
    sync();
    details.addEventListener("toggle", sync);
  });

  // ---------- Copy Email ----------
  const copyBtn = document.getElementById("copyEmailBtn");
  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      const email = "eafte1@outlook.com";
      const textSpan = copyBtn.querySelector(".copy__text");
      const onSuccess = () => {
        if (textSpan) textSpan.textContent = "Copied!";
        copyBtn.classList.add("is-copied");
        // Keep the label in sync with the icon swap for screen readers.
        copyBtn.setAttribute("aria-label", "Email address copied");
        setTimeout(() => {
          if (textSpan) textSpan.textContent = "Copy";
          copyBtn.classList.remove("is-copied");
          copyBtn.setAttribute("aria-label", "Copy email address");
        }, 2000);
      };

      if (navigator.clipboard && window.isSecureContext) {
        try {
          await navigator.clipboard.writeText(email);
          onSuccess();
          return;
        } catch (e) {
          /* fallback */
        }
      }

      try {
        const input = document.createElement("input");
        input.value = email;
        input.style.position = "fixed";
        input.style.opacity = "0";
        document.body.appendChild(input);
        input.focus();
        input.select();
        document.execCommand("copy");
        document.body.removeChild(input);
        onSuccess();
      } catch (err) {
        /* ignore */
      }
    });
  }
})();
