(function () {
  "use strict";

  const root = document.documentElement;
  root.classList.add("js");

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
    themeColor.setAttribute("content", theme === "dark" ? "#0b1210" : "#f5f5ec");
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
      const desktop = window.matchMedia("(min-width: 1101px)");
      const onChange = (event) => {
        if (event.matches) closeNav(false);
      };
      if (desktop.addEventListener) desktop.addEventListener("change", onChange);
      else if (desktop.addListener) desktop.addListener(onChange);
    }
  }

  // ---------- Scroll controls ----------
  const header = document.querySelector(".header");
  const toTop = document.getElementById("toTop");
  const motionPreference =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");

  if (header || toTop) {
    let ticking = false;
    const syncScrollControls = () => {
      if (header) header.classList.toggle("is-scrolled", window.scrollY > 8);
      if (toTop) {
        const showAfter = Math.max(window.innerHeight * 1.2, 600);
        toTop.classList.toggle("is-visible", window.scrollY > showAfter);
      }
      ticking = false;
    };
    syncScrollControls();
    window.addEventListener(
      "scroll",
      () => {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(syncScrollControls);
      },
      { passive: true }
    );
  }

  if (toTop) {
    toTop.addEventListener("click", () => {
      const behavior = motionPreference && motionPreference.matches ? "auto" : "smooth";
      window.scrollTo({ top: 0, behavior });
      // Keyboard users land back at the top of the document, not mid-page.
      const brand = document.querySelector(".brand");
      if (brand) brand.focus({ preventScroll: true });
    });
  }

  // ---------- Scroll reveal ----------
  const sections = document.querySelectorAll(".section, .metrics");

  if (!(motionPreference && motionPreference.matches) && "IntersectionObserver" in window) {
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

  // ---------- Intro loader ----------
  // CSS lifts the curtain on its own (see .loader in styles.css); this
  // only tidies up: mark the session so it plays once, let a click skip
  // it, and remove the node from the DOM once it is off screen.
  const loader = document.getElementById("loader");
  if (loader) {
    if (root.classList.contains("loader-skip") || (motionPreference && motionPreference.matches)) {
      loader.remove();
    } else {
      try { sessionStorage.setItem("ei_loader_seen", "1"); } catch (e) { /* ignore */ }
      const removeLoader = () => loader.remove();
      loader.addEventListener("click", () => {
        loader.classList.add("is-done");
        window.setTimeout(removeLoader, 600);
      });
      window.setTimeout(removeLoader, 1500);
    }
  }

  // ---------- Print: expand disclosures ----------
  // A printed page cannot be clicked open, so print with every <details>
  // expanded (project workings and the benchmark tables alike), then put
  // each one back exactly as the visitor left it.
  const allDetails = document.querySelectorAll("details");
  if (allDetails.length) {
    let printStates = null;
    window.addEventListener("beforeprint", () => {
      printStates = Array.from(allDetails, (d) => d.open);
      allDetails.forEach((d) => { d.open = true; });
    });
    window.addEventListener("afterprint", () => {
      if (!printStates) return;
      allDetails.forEach((d, i) => { d.open = printStates[i]; });
      printStates = null;
    });
  }

  // ---------- Copy email ----------
  const copyBtn = document.getElementById("copyEmailBtn");
  const emailLink = document.querySelector('.contact__action a[href^="mailto:"]');
  if (copyBtn && emailLink) {
    const textSpan = copyBtn.querySelector(".copy__text");
    let resetTimer;

    function showCopyStatus(copied) {
      if (textSpan) textSpan.textContent = copied ? "Copied!" : "Copy failed";
      copyBtn.classList.toggle("is-copied", copied);
      copyBtn.setAttribute(
        "aria-label",
        copied ? "Email address copied" : "Unable to copy email address"
      );
      window.clearTimeout(resetTimer);
      resetTimer = window.setTimeout(() => {
        if (textSpan) textSpan.textContent = "Copy";
        copyBtn.classList.remove("is-copied");
        copyBtn.setAttribute("aria-label", "Copy email address");
      }, 2000);
    }

    copyBtn.addEventListener("click", async () => {
      const address = emailLink.getAttribute("href").slice("mailto:".length);
      const email = decodeURIComponent(address.split("?")[0]);

      if (navigator.clipboard && window.isSecureContext) {
        try {
          await navigator.clipboard.writeText(email);
          showCopyStatus(true);
          return;
        } catch (e) {
          /* Try the fallback below. */
        }
      }

      const input = document.createElement("input");
      input.value = email;
      input.tabIndex = -1;
      input.style.position = "fixed";
      input.style.opacity = "0";
      let copied = false;
      try {
        document.body.appendChild(input);
        input.focus();
        input.select();
        copied = document.execCommand("copy");
      } catch (e) {
        /* The browser may deny clipboard access. */
      } finally {
        input.remove();
        copyBtn.focus({ preventScroll: true });
      }
      showCopyStatus(copied);
    });
  }
})();
