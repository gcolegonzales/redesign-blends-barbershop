/* Blends Barbershop — interactions */
(function () {
  "use strict";

  // Current year in footer
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Shrinking sticky header
  var header = document.getElementById("siteHeader");
  var lastKnown = 0, ticking = false;
  function onScroll() {
    lastKnown = window.scrollY;
    if (!ticking) {
      window.requestAnimationFrame(function () {
        if (header) header.classList.toggle("shrink", lastKnown > 40);
        ticking = false;
      });
      ticking = true;
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile nav toggle
  var toggle = document.getElementById("navToggle");
  var mobileNav = document.getElementById("mobileNav");
  function closeNav() {
    if (!toggle || !mobileNav) return;
    toggle.setAttribute("aria-expanded", "false");
    mobileNav.hidden = true;
  }
  if (toggle && mobileNav) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      mobileNav.hidden = open;
    });
    mobileNav.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeNav();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });
  }

  // Scroll-reveal via IntersectionObserver
  var reveals = document.querySelectorAll(".reveal");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduce || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  }
})();
