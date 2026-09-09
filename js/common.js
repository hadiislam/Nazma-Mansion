/* =========================================================
   NAZMA MANSION — কমন স্ক্রিপ্ট
   সব পেজে ব্যবহৃত হয়: থিম টগল, স্লাইড-মেনু (ফিচার তালিকা থেকে
   স্বয়ংক্রিয়ভাবে তৈরি), হোমপেজ ফিচার গ্রিড, অ্যাকটিভ লিংক
   ========================================================= */
(function () {
  "use strict";

  var SVG_WRAP_OPEN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">';
  var SVG_WRAP_CLOSE = '</svg>';

  /* ---------- থিম (লাইট/ডার্ক) ---------- */
  var THEME_KEY = "nazma-mansion-theme";
  var root = document.documentElement;

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    var btn = document.querySelector("[data-theme-toggle]");
    if (btn) {
      btn.setAttribute("aria-label", theme === "dark" ? "লাইট মোডে যান" : "ডার্ক মোডে যান");
      var sun = btn.querySelector(".icon-sun");
      var moon = btn.querySelector(".icon-moon");
      if (sun && moon) {
        sun.style.display = theme === "dark" ? "block" : "none";
        moon.style.display = theme === "dark" ? "none" : "block";
      }
    }
  }

  function initTheme() {
    var saved = localStorage.getItem(THEME_KEY);
    var preferred = saved || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    applyTheme(preferred);
  }

  function toggleTheme() {
    var current = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
    var next = current === "dark" ? "light" : "dark";
    localStorage.setItem(THEME_KEY, next);
    applyTheme(next);
  }

  initTheme();

  /* ---------- ফিচার তালিকা থেকে মেনু + হোম-গ্রিড তৈরি ---------- */
  function renderMenu() {
    var nav = document.querySelector("[data-menu-nav]");
    if (!nav || !window.NAZMA_FEATURES) return;
    var here = location.pathname.split("/").pop() || "index.html";
    var html = "";
    window.NAZMA_FEATURES.forEach(function (f) {
      var isActive = f.href.split("/").pop() === here;
      html +=
        '<a href="' + f.href + '"' + (isActive ? ' class="is-active"' : '') + '>' +
        SVG_WRAP_OPEN + f.icon + SVG_WRAP_CLOSE +
        ' ' + f.label +
        '</a>';
    });
    nav.innerHTML = html;
  }

  function renderFeatureGrid() {
    var grid = document.querySelector("[data-feature-grid]");
    if (!grid || !window.NAZMA_FEATURES) return;
    var html = "";
    var tileIndex = 0;
    window.NAZMA_FEATURES.forEach(function (f) {
      if (f.menuOnly) return; // যেমন "হোম" — শুধু মেনুতে থাকবে, গ্রিডে না
      tileIndex++;
      var tile = "tile-" + (((tileIndex - 1) % 8) + 1);
      html +=
        '<a class="feature-item ' + tile + '" href="' + f.href + '">' +
          '<span class="feature-item__icon">' + SVG_WRAP_OPEN + f.icon + SVG_WRAP_CLOSE + '</span>' +
          '<span>' + f.label + '</span>' +
        '</a>';
    });
    grid.innerHTML = html;
  }

  /* ---------- স্লাইড-আউট মেনু (তিন-ডট) ---------- */
  function initMenu() {
    var menuBtn = document.querySelector("[data-menu-open]");
    var closeBtn = document.querySelector("[data-menu-close]");
    var overlay = document.querySelector("[data-menu-overlay]");
    var panel = document.querySelector("[data-menu-panel]");
    if (!menuBtn || !panel || !overlay) return;

    function openMenu() {
      panel.classList.add("is-open");
      overlay.classList.add("is-open");
      panel.setAttribute("aria-hidden", "false");
      menuBtn.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
    }
    function closeMenu() {
      panel.classList.remove("is-open");
      overlay.classList.remove("is-open");
      panel.setAttribute("aria-hidden", "true");
      menuBtn.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }

    menuBtn.addEventListener("click", openMenu);
    if (closeBtn) closeBtn.addEventListener("click", closeMenu);
    overlay.addEventListener("click", closeMenu);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderMenu();
    renderFeatureGrid();
    initMenu();
    var themeBtn = document.querySelector("[data-theme-toggle]");
    if (themeBtn) themeBtn.addEventListener("click", toggleTheme);
  });
})();
