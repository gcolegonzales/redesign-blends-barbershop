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

  // Mobile nav toggle (side drawer)
  var toggle = document.getElementById("navToggle");
  var mobileNav = document.getElementById("mobileNav");
  var scrim = document.getElementById("navScrim");
  var navClose = document.getElementById("navClose");

  // Relocate drawer + scrim out of the header (whose backdrop-filter would
  // otherwise become the containing block for these position:fixed elements
  // and collapse them to the header's box). Make them direct children of body.
  if (mobileNav) { mobileNav.hidden = false; document.body.appendChild(mobileNav); }
  if (scrim) { scrim.hidden = false; document.body.appendChild(scrim); }

  function openNav() {
    if (!toggle || !mobileNav) return;
    toggle.setAttribute("aria-expanded", "true");
    mobileNav.classList.add("open");
    if (scrim) scrim.classList.add("open");
  }
  function closeNav() {
    if (!toggle || !mobileNav) return;
    toggle.setAttribute("aria-expanded", "false");
    mobileNav.classList.remove("open");
    if (scrim) scrim.classList.remove("open");
  }
  if (toggle && mobileNav) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      if (open) closeNav(); else openNav();
    });
    mobileNav.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeNav();
    });
    if (navClose) navClose.addEventListener("click", closeNav);
    if (scrim) scrim.addEventListener("click", closeNav);
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
